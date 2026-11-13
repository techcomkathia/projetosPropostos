# Dados e cálculos · Nexo Literário

As contas e transformações que o site faz com os dados da API. Nenhuma delas
desenha nada: todas viram **funções em `src/utils/`**, que os componentes
chamam. Várias você já escreveu no M3U2-02.

O formato dos dados está em `02-guia-da-api.md`.

---

## 1. Mês por extenso

`mes` é um número de 1 a 12. O nome sai do `Intl.DateTimeFormat`:

```js
const formatadorDeMes = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  timeZone: "UTC",
});

export function formatarMes(mes) {
  const nome = formatadorDeMes.format(new Date(Date.UTC(2026, mes - 1, 1)));
  return nome.charAt(0).toLocaleUpperCase("pt-BR") + nome.slice(1);
}
```

`formatarMes(3)` devolve `"Março"`. O formatador devolve em minúsculas; a
última linha ajusta a inicial.

## 2. Ordem e trimestres

- A lista de livros é **ordenada por `mes`** uma vez, no contexto. Ordene uma
  **cópia** (`[...livros].sort(...)`): o `sort` altera a lista original, e
  estado não se altera diretamente.
- O trimestre de um livro: `Math.floor((mes - 1) / 3)` dá 0 para janeiro a
  março, 1 para abril a junho, e assim por diante.
- Os rótulos: `["Jan – Mar", "Abr – Jun", "Jul – Set", "Out – Dez"]` (com
  meia-risca `–` e espaços).
- **Trimestre sem livro não vira slide.**

Uma função que agrupa serve para a Início e para o Clube:

```js
agruparPorTrimestre(livros)
// [
//   { rotulo: "Jan – Mar", livros: [ ...3 livros ] },
//   { rotulo: "Abr – Jun", livros: [ ...3 livros ] },
//   ...
// ]
```

Com essa lista, montar os `itens` do `Carrossel` é um `map`.

## 3. Histórico do Clube

Entram só os livros **com nota**:

```js
livros.filter((livro) => livro.nota !== null && livro.nota !== undefined)
```

Depois, agrupe por trimestre com a mesma função da Início. Nos dados de
exemplo, são nove livros em três trimestres (os três últimos ainda não têm
nota).

## 4. Nota e estrelas

A nota aparece sempre com uma casa decimal: `livro.nota.toFixed(1)` dá
`"4.8"`, e o texto fica `"4.8 / 5"`.

Cada uma das cinco estrelas recebe um **preenchimento** de 0 a 1. A estrela de
posição `i` (0 a 4) recebe o quanto da nota "passa" dela:

```
preenchimento = nota - i, limitado entre 0 e 1
```

| Nota 4.8 | 1ª (i = 0) | 2ª | 3ª | 4ª | 5ª (i = 4) |
| --- | --- | --- | --- | --- | --- |
| nota − i | 4.8 | 3.8 | 2.8 | 1.8 | 0.8 |
| preenchimento | 1 | 1 | 1 | 1 | 0.8 |

Use `Math.min` e `Math.max` para limitar. Cuidado: `4.8 - 4` dá
`0.7999999999999998` em JavaScript. Arredonde para duas casas
(`Math.round(valor * 100) / 100`).

## 5. Anterior e próximo

Na lista ordenada do contexto, ache a posição do livro aberto pelo
`identificador` (`findIndex`). O anterior é `livros[posicao - 1]` e o próximo é
`livros[posicao + 1]`. No primeiro e no último, um deles é `undefined`: é aí
que entra o `<span />` vazio.

## 6. Preços dos planos

Os mesmos cálculos do M3U2-02, **em centavos inteiros**, para evitar a
imprecisão dos números com vírgula:

```js
const totalEmCentavos = Math.round(plano.valorDaParcela * 100) * plano.meses;
const aVistaEmCentavos = Math.round((totalEmCentavos * (100 - plano.descontoAVista)) / 100);
const descontoEmCentavos = totalEmCentavos - aVistaEmCentavos;
```

Divida por 100 só na hora de mostrar. O desconto é a **diferença** entre o
total e o valor à vista já arredondado: assim, desconto + à vista sempre fecha
com o total.

Valores esperados para os dados de exemplo:

| Plano | Parcela | Total parcelado | Desconto | À vista |
| --- | ---: | ---: | ---: | ---: |
| Trimestral | 3x R$ 69,90 | R$ 209,70 | R$ 10,48 (5%) | R$ 199,22 |
| Semestral | 6x R$ 64,90 | R$ 389,40 | R$ 38,94 (10%) | R$ 350,46 |
| Anual | 12x R$ 59,90 | R$ 718,80 | R$ 107,82 (15%) | R$ 610,98 |

No Trimestral, 5% de R$ 209,70 é R$ 10,485. O valor à vista arredonda para
R$ 199,22 (19921,5 → 19922 centavos), e o desconto exibido é R$ 10,48.

Para mostrar em reais:

```js
valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
```

Não concatene o `"R$"` à mão. Atenção: o `toLocaleString` coloca um **espaço
especial** entre `R$` e o número. Na tela não faz diferença, mas se você
comparar textos em um teste, compare com o resultado da própria função.

## 7. Plano escolhido na tela Assinar

```
id da URL existe nos planos?  ──sim──▶  esse plano
          │ não (ou não veio)
          ▼
algum plano tem destaque?     ──sim──▶  o plano em destaque
          │ não
          ▼
o primeiro plano da lista
```

Leia o `id` com `useSearchParams` (`parametros.get("plano")`) e procure com
`find`. Ao trocar de plano, grave com `setParametros({ plano: novoId })`.

## 8. Modalidade e forma de pagamento

| Modalidade | Formas aceitas | Valor que vai para a API |
| --- | --- | --- |
| `avista` | `cartao`, `pix`, `boleto` | o valor à vista (com desconto) |
| `parcelado` | só `cartao` | o total parcelado |

Os nomes para a tela:

```js
const NOMES_DAS_FORMAS = { cartao: "Cartão de crédito", pix: "Pix", boleto: "Boleto" };
```

Se a pessoa está com Pix ou boleto e muda para parcelado, a forma de pagamento
volta para `cartao`. Faça essa troca **no mesmo `onChange`** que muda a
modalidade.

## 9. Validação

Antes de validar, tire o que não é número dos campos numéricos:

```js
const somenteNumeros = (texto) => texto.replace(/\D/g, "");
somenteNumeros("123.456.789-01"); // "12345678901"
```

| Campo | Regra |
| --- | --- |
| Nome completo | depois do `trim()`, pelo menos duas palavras |
| E-mail | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| CPF | `somenteNumeros(cpf).length === 11` |
| Número do cartão | `somenteNumeros(numero).length === 16` |
| Nome impresso | depois do `trim()`, não vazio |
| CVV | `/^\d{3,4}$/` |
| Termos | `true` |

**Validade (`MM/AA`):**

1. O formato bate com `/^(\d{2})\/(\d{2})$/`.
2. O mês está entre 1 e 12.
3. Não venceu: o cartão vale até o **último dia** do mês informado. Compare
   ano e mês com a data de hoje. `12/26` ainda vale em dezembro de 2026;
   `10/26` não vale mais em novembro de 2026.

Uma boa forma de organizar: uma função `validarAssinatura(campos, formaDePagamento)`
que devolve um objeto **só com os campos que têm erro**:

```js
{ email: "Informe um e-mail válido, como nome@exemplo.com.", cvv: "O CVV tem 3 ou 4 números." }
```

Se o objeto vier vazio (`Object.keys(erros).length === 0`), pode enviar.
