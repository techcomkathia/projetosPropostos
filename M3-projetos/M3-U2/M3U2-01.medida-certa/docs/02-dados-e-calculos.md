# Dados e cálculos · Medida Certa

## 1. Os dados

`dados/medidas.js` tem duas constantes.

### `UNIDADES`

```js
const UNIDADES = [
  { id: "xicara", singular: "xícara", plural: "xícaras", ml: 240 },
  { id: "colher-sopa", singular: "colher de sopa", plural: "colheres de sopa", ml: 15 },
  { id: "colher-cha", singular: "colher de chá", plural: "colheres de chá", ml: 5 },
  { id: "ml", singular: "ml", plural: "ml", ml: 1 },
  { id: "gramas", singular: "grama", plural: "gramas", ml: null }
];
```

| Campo | O que é |
| --- | --- |
| `id` | identificador. Use como `value` da `<option>` |
| `singular` / `plural` | nome para 1 ou menos / para mais de 1 |
| `ml` | quantos ml cabem em 1 unidade. Em gramas é `null`, porque grama não é volume |

### `INGREDIENTES`

```js
const INGREDIENTES = [
  { id: "farinha-de-trigo", nome: "farinha de trigo", gramasPorXicara: 120 },
  ...
];
```

| Campo | O que é |
| --- | --- |
| `id` | identificador. Use como `value` da `<option>` |
| `nome` | nome do ingrediente, em minúsculas |
| `gramasPorXicara` | quantos gramas cabem em 1 xícara (240 ml) |

Antes de programar, explore no console do navegador (F12 › Console):

```js
UNIDADES[1]                         // a colher de sopa
INGREDIENTES.length                 // 14
INGREDIENTES[0].gramasPorXicara     // 120
```

## 2. A ideia da conta

Tudo passa por **ml** e **gramas**. Para ir de qualquer medida para qualquer
outra, faça em dois passos:

```
medida de origem  →  gramas  →  medida de destino
```

**Quantos gramas cabem em 1 ml do ingrediente?**

```
gramasPorMl = gramasPorXicara / 240
```

Farinha: 120 / 240 = 0,5 g por ml.

**De uma medida para gramas:**

```
gramas = quantidade × unidade.ml × gramasPorMl
```

2 xícaras de farinha: 2 × 240 × 0,5 = **240 g**.

**De gramas para uma medida:**

```
quantidade = gramas / gramasPorMl / unidade.ml
```

240 g de farinha em colheres de sopa: 240 / 0,5 / 15 = **32**.

Se a medida de origem já for gramas, o primeiro passo não muda nada: os
gramas são a própria quantidade. Cuidado: `unidade.ml` de gramas é `null`, e
`null` numa conta vira `0` sem avisar.

## 3. Valores esperados

Use esta tabela para conferir o seu código.

| Entrada | Peso | Equivale a |
| --- | --- | --- |
| 2 xícaras de farinha de trigo | 240 g | 32 colheres de sopa · 96 colheres de chá · 480 ml |
| 1 xícara de açúcar refinado | 180 g | 16 colheres de sopa · 48 colheres de chá · 240 ml |
| 0,5 colher de sopa de manteiga | 6 g | 0,03 xícara · 1,5 colher de chá · 7,5 ml |
| 3 colheres de sopa de chocolate em pó | 17 g | 0,19 xícara · 9 colheres de chá · 45 ml |
| 100 ml de mel | 142 g | 0,42 xícara · 6,67 colheres de sopa · 20 colheres de chá |
| 1,5 xícaras de óleo | 330 g | 24 colheres de sopa · 72 colheres de chá · 360 ml |
| 240 gramas de farinha de trigo | — | 2 xícaras · 32 colheres de sopa · 96 colheres de chá · 480 ml |

## 4. Pegadinhas

**O valor do campo é texto.** `input.value` devolve `"2"`, não `2`. Converta
com `Number()` antes de fazer conta.

**Vírgula.** No Brasil a gente escreve `0,5`, mas `Number("0,5")` dá `NaN`.
Troque a vírgula por ponto antes de converter. Teste no console:

```js
Number("0,5")                    // NaN
Number("0,5".replace(",", "."))  // 0.5
```

**Campo vazio.** `Number("")` dá `0`, e não `NaN`. Trate o campo vazio antes.

**Número quebrado.** Faça a conta no console:

```js
0.1 * 3                          // 0.30000000000000004
```

Nunca mostre o número cru. Use `Intl.NumberFormat` (ou `toLocaleString`),
que arredonda e já coloca a vírgula:

```js
const formato = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });
formato.format(0.1 * 3)          // "0,3"
formato.format(6.666666)         // "6,67"
```

**Arredondar para zero.** Com até 2 casas, `0,004` vira `"0"`, o que parece
erro. Valores menores que 0,01 aparecem como `< 0,01`.

## 5. Testar os casos difíceis

Digite no campo e confira a tela:

- `0,5` e `0.5`: os dois funcionam e dão o mesmo resultado.
- campo vazio, `abc`, `0` e `-2`: aparece o aviso de erro, e o resultado e a
  tabela somem.
- volte para `2`: o aviso some e tudo reaparece.
- `1`: a frase fica no singular ("1 xícara ... pesa").
- `1` com a medida **gramas** e o ingrediente **água**: a frase não pode dizer
  "0 xícara".
- troque a medida para **colheres de sopa**: a tabela não pode ter uma linha
  de colheres de sopa.
