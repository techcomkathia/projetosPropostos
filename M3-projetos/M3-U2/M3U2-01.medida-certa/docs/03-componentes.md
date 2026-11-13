# Componentes · Medida Certa

Quase tudo já está no `index.html`. O seu JavaScript **cria** as opções dos
selects e as linhas da tabela, **preenche** textos e **mostra ou esconde**
partes da página.

## 1. Os elementos da página

| id | O que é | Como começa |
| --- | --- | --- |
| `#quantidade` | campo da quantidade | com o valor `2` |
| `#campo-quantidade` | caixa em volta do campo (recebe `com-erro`) | sem a classe |
| `#unidade` | select das medidas | vazio |
| `#ingrediente` | select dos ingredientes | vazio |
| `.chip` | os 6 atalhos (¼ ⅓ ½ 1 2 3) | o valor de cada um está em `data-valor` |
| `#erro` | aviso de quantidade inválida | escondido |
| `#resultado` | bloco com a frase e o número | visível e vazio |
| `#frase` | "**2 xícaras de farinha de trigo** pesam cerca de" | vazio |
| `#gramas` | "240 gramas" | vazio |
| `#secao-tabela` | seção "Equivale a" | visível |
| `#tabela-corpo` | `<tbody>` da tabela | vazio |
| `#conta-ingrediente-nome` | "1 xícara de farinha de trigo" | vazio |
| `#conta-ingrediente-gramas` | "120 g" | vazio |
| `#xicaras` | xícaras desenhadas (desafio extra) | vazio |

## 2. As opções dos selects

```html
<select id="unidade">
  <option value="xicara">xícaras</option>
  <option value="colher-sopa">colheres de sopa</option>
  ...
</select>

<select id="ingrediente">
  <option value="farinha-de-trigo">farinha de trigo</option>
  ...
</select>
```

Sugestão: uma **função-componente** `criarOpcao(valor, texto)` que **devolve**
a `<option>` pronta e serve para os dois selects.

## 3. A frase e o número

A parte em negrito é um `<strong>`. O resto é texto solto:

```html
<p class="resultado__frase" id="frase">
  <strong>2 xícaras de farinha de trigo</strong> pesam cerca de
</p>
<p class="resultado__gramas" id="gramas">240<span> gramas</span></p>
```

Dica: `elemento.replaceChildren(a, b)` troca todo o conteúdo de uma vez e
aceita elementos e textos misturados:

```js
frase.replaceChildren(negrito, ' pesam cerca de');
```

## 4. Uma linha da tabela

```html
<tbody id="tabela-corpo">
  <tr>
    <td>colheres de sopa</td>
    <td class="numero">32</td>
  </tr>
  ...
</tbody>
```

A classe `numero` alinha o valor à direita. Sugestão: `criarLinha(unidade,
valor)`, que **devolve** a `<tr>` pronta.

Antes de colocar as linhas novas, limpe as antigas:
`corpoTabela.replaceChildren()`.

## 5. Atalhos

```html
<button class="chip" type="button" data-valor="0.5">½</button>
```

No JavaScript, `botao.dataset.valor` devolve `"0.5"`. O atalho marcado
recebe `aria-pressed="true"`, e o CSS pinta de azul.

## 6. Estado de erro

```html
<div class="campo com-erro" id="campo-quantidade">
  <label for="quantidade">Quanto</label>
  <input id="quantidade" ... aria-invalid="true">
</div>
<p class="erro" id="erro" role="alert">Digite uma quantidade maior que zero, como 2 ou 0,5.</p>
```

E `#resultado` e `#secao-tabela` ganham `hidden`.

## 7. Desafios extras: frações e xícaras

**Frações de cozinha.** Na tabela, xícaras e colheres quebradas aparecem
como fração: `1,5` vira `1 ½`, `6,67` vira `6 ⅔`. A célula ganha a classe
`fracao`, que deixa o texto azul e em negrito:

```html
<td class="numero fracao">1 ½</td>
```

**Xícaras desenhadas.** Dentro de `#xicaras`, um desenho por xícara inteira e
um para o pedaço que sobra, arredondado para o quarto mais próximo. A classe
`xicara--q1` a `xicara--q4` diz quanto do copo está cheio (¼ a 4/4):

```html
<div class="xicaras" id="xicaras">
  <span class="xicaras__item">
    <span class="xicara xicara--q4"></span><span class="xicara__alca"></span>
  </span>
  <span class="xicaras__item">
    <span class="xicara xicara--q2"></span><span class="xicara__alca"></span>
  </span>
  <p class="xicaras__legenda">Em xícaras, arredondado para o quarto mais próximo</p>
</div>
```

Esse exemplo é 1 ½ xícara. Mostre no máximo 8 xícaras. Acima disso, coloque
`<span class="xicaras__mais">+3</span>` no lugar das que faltam.
