# Dados e cálculos · Nexo Literário

Os dados das duas telas estão em `dados/livros.js` (constante `LIVROS`) e
`dados/planos.js` (constante `PLANOS`). Use essas constantes como fonte da
interface; não copie as listas para dentro dos seus scripts. Veja
`docs/04-guia-dos-dados.md` para entender como elas chegam à página.

## 1. Livro

Cada item de `LIVROS` traz, entre outros, estes campos usados na Home:

```json
{
  "id": 3,
  "titulo": "Capitães da Areia",
  "autor": "Jorge Amado",
  "mes": 3,
  "categoria": "Romance social",
  "capa": "https://raw.githubusercontent.com/techcomkathia/nexo-literario-imagens/main/img/03_captaes_da_areia.jpg",
  "ano": 1937,
  "sinopse": "Em Salvador, um grupo de meninos vive em um trapiche..."
}
```

`ano` é o ano de publicação e aparece na linha do tempo ("Publicado em 1937").

`mes` é um número de 1 a 12. Ordene a lista por esse campo antes de renderizar.
O trimestre de um livro sai do mês: `Math.floor((mes - 1) / 3)` dá 0 para
janeiro a março, 1 para abril a junho, e assim por diante.
O nome do mês pode ser calculado com `Intl.DateTimeFormat`:

```js
const formatadorDeMes = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  timeZone: "UTC",
});
const nomeDoMes = formatadorDeMes.format(new Date(Date.UTC(2026, mes - 1, 1)));
```

O formatador devolve o mês em minúsculas. Ajuste a inicial para exibição. A
`capa` é um link completo para a imagem, que fica hospedada no GitHub. Use o
link direto no `src` da `<img>`.

Os livros também têm campos como `identificador`, `nota`, `paginas`,
`notaEditorial` e `sobreAutor`. Eles serão usados nas páginas de detalhes,
na próxima unidade; na Home, ignore-os. `capa`, `sinopse` e `ano` podem vir vazios ou
ausentes e devem ser tratados.

## 2. Plano

Cada item de `PLANOS` tem este formato:

```json
{
  "id": "semestral",
  "nome": "Semestral",
  "meses": 6,
  "valorDaParcela": 64.9,
  "descontoAVista": 10,
  "destaque": true,
  "beneficios": [
    "6 livros, um por mês",
    "Nota editorial exclusiva",
    "Encontros mensais de leitura"
  ]
}
```

Os valores são números, não textos formatados. Use `toLocaleString` apenas ao
exibi-los.

## 3. Cálculos

- Total parcelado: `valorDaParcela × meses`.
- Valor do desconto: total do ciclo vezes `descontoAVista / 100`.
- Valor à vista: total do ciclo menos o desconto.

Arredonde valores monetários para centavos. Para evitar imprecisão de ponto
flutuante, faça a operação com centavos inteiros:

```js
const totalEmCentavos = Math.round(plano.valorDaParcela * 100) * plano.meses;
const valorAVistaEmCentavos = Math.round(
  totalEmCentavos * (100 - plano.descontoAVista) / 100,
);
const descontoEmCentavos = totalEmCentavos - valorAVistaEmCentavos;
const valorAVista = valorAVistaEmCentavos / 100;
```

O desconto é a diferença entre o total e o valor à vista já arredondado. Assim,
desconto + à vista sempre fecha com o total. No Trimestral, 5% de R$ 209,70 é
R$ 10,485: o valor à vista arredonda para R$ 199,22 (19921,5 → 19922
centavos), e o desconto exibido é R$ 10,48.

Valores esperados para os dados de exemplo:

| Plano | Total parcelado | Desconto | À vista |
| --- | ---: | ---: | ---: |
| Trimestral | R$ 209,70 | R$ 10,48 (5%) | R$ 199,22 |
| Semestral | R$ 389,40 | R$ 38,94 (10%) | R$ 350,46 |
| Anual | R$ 718,80 | R$ 107,82 (15%) | R$ 610,98 |

Formate com:

```js
valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
```

O formato localiza separadores decimais e acrescenta `R$`. Não concatene o
símbolo manualmente.
