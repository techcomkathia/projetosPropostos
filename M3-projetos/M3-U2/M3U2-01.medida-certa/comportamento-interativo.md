# Comportamento esperado · Medida Certa

O projeto tem uma página só, o `index.html`. Os dados já estão no projeto, em
`dados/medidas.js` (constantes `UNIDADES` e `INGREDIENTES`). Esse arquivo é
carregado antes do seu script, então as constantes já existem quando o seu
código roda. **Não há `fetch` neste projeto.**

Todo o seu código fica em `js/conversor.js`.

## 1. Ao abrir a página

- O select `#unidade` tem uma opção para cada item de `UNIDADES`, na ordem da
  lista. O `value` é o `id` e o texto é o `plural` ("xícaras", "colheres de
  sopa"...).
- O select `#ingrediente` tem uma opção para cada item de `INGREDIENTES`. O
  `value` é o `id` e o texto é o `nome`.
- O campo `#quantidade` já vem com `2` no HTML. Ao abrir, a página já mostra
  a conversão de **2 xícaras de farinha de trigo**, sem esperar a pessoa
  digitar.

## 2. A conversão acontece sozinha

Não há botão "Converter". O resultado é refeito sempre que:

- a pessoa **digita** no campo de quantidade (evento `input`);
- a pessoa **troca a medida** ou **troca o ingrediente** (evento `change`);
- a pessoa clica em um **atalho** (¼, ⅓, ½, 1, 2, 3).

## 3. O resultado

Dentro de `#resultado`:

- `#frase`: a quantidade, a medida e o ingrediente em negrito, seguidos de
  "pesam cerca de". Exemplo: **2 xícaras de farinha de trigo** pesam cerca de
- `#gramas`: o peso arredondado, seguido de "gramas". Exemplo: `240 gramas`.

Singular e plural:

- 1 ou menos: singular ("1 xícara", "0,5 colher de sopa", "pesa").
- Mais de 1: plural ("2 xícaras", "1,5 xícaras", "pesam").

Quando a medida escolhida é **gramas**, a pergunta se inverte: a pessoa já
pesou e quer saber quanto é em xícaras. Exemplo: **240 gramas de farinha de
trigo** cabem em cerca de **2 xícaras**. Se der menos de ¼ de xícara, mostre
em colheres de sopa e, se der menos de 1 colher de sopa, em colheres de chá.

## 4. A tabela "Equivale a"

- Uma linha `<tr>` dentro de `#tabela-corpo` para cada medida de `UNIDADES`,
  **menos a que está escolhida no select** (não faz sentido dizer que 2
  xícaras equivalem a 2 xícaras).
- Primeira coluna: o nome da medida no plural. Segunda: o valor.
- Valores em gramas: sem casas decimais e com " g" no fim (`240 g`).
- Os outros: até 2 casas decimais, com vírgula (`1,5`, `0,42`). Valores
  menores que 0,01 aparecem como `< 0,01`.

## 5. A conta

Na seção "Como a conta é feita", as três primeiras caixas são fixas no HTML.
A quarta muda com o ingrediente:

- `#conta-ingrediente-nome`: "1 xícara de farinha de trigo";
- `#conta-ingrediente-gramas`: "120 g".

## 6. Atalhos

- Clicar em um atalho coloca o valor dele no campo, com vírgula (½ vira
  `0,5`), e refaz a conversão.
- O atalho que corresponde ao número no campo fica marcado com
  `aria-pressed="true"`. Os outros ficam com `"false"`. Se a pessoa digitar
  `2`, o atalho "2" fica marcado; se digitar `2,5`, nenhum fica.

## 7. Quantidade inválida

A quantidade é inválida quando o campo está vazio, quando não é um número
(`abc`) ou quando é zero ou negativa.

Nesse caso:

- mostre `#erro` com o texto "Digite uma quantidade maior que zero, como 2 ou
  0,5.";
- coloque a classe `com-erro` em `#campo-quantidade` e `aria-invalid="true"`
  no input;
- esconda `#resultado` e `#secao-tabela`.

Quando a pessoa corrigir o número, tudo volta: o erro some, a classe e o
`aria-invalid` saem, e o resultado e a tabela aparecem de novo.

**Vírgula vale.** `0,5` e `0.5` são a mesma quantidade.

## 8. Regras comuns

- Leia os dados só de `UNIDADES` e `INGREDIENTES`. Não copie as listas para
  dentro do seu script e não escreva os gramas de nenhum ingrediente no
  código.
- Insira texto com `textContent`. Não use `innerHTML`.
- Mostre e esconda com o atributo `hidden`. Nada de `elemento.style`.
- Não use `alert()`: toda mensagem aparece na própria página.
- Nunca mostre `NaN`, `undefined` ou `null` na tela.
