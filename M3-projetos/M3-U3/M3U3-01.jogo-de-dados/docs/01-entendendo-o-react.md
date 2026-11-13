# Entendendo o React · Jogo de Dados

Este documento explica tudo o que o Jogo de Dados usa. Os exemplos são de
**outro** jogo, um **cara ou coroa**, de propósito: você entende a ideia aqui
e aplica nos dados lá.

Leia na ordem. Cada seção usa a anterior.

---

## 1. O que muda do JavaScript puro para o React

Na M3U2, para mostrar um dado na tela, você faria mais ou menos isto:

```js
const dado = document.createElement("div");
dado.className = "dado dado--4";
dado.setAttribute("aria-label", "Dado mostrando 4");
document.querySelector(".dados").append(dado);

// e, ao clicar no botão, achar o dado de novo, trocar a classe,
// apagar os pontinhos antigos, criar os novos, atualizar a soma...
```

Você dizia ao navegador **cada passo**: crie, preencha, encontre, troque. E
toda vez que algo mudava, era preciso lembrar de atualizar **todos** os
lugares da tela que dependiam daquilo.

No React, você não dá passos. Você **descreve como a tela deve ser** para um
certo conjunto de dados:

```jsx
<div className="dado dado--4" aria-label="Dado mostrando 4">...</div>
```

Quando os dados mudam, o React descobre sozinho o que mudou na tela e atualiza
só aquilo. O seu trabalho passa a ser:

1. dividir a tela em **componentes**;
2. dizer o que cada um mostra a partir das **props** que recebe;
3. guardar o que muda em um **estado**.

### Biblioteca ou framework?

O React é uma **biblioteca**: ele cuida de uma coisa só, desenhar a interface
a partir dos dados. Quem decide o resto (como organizar as pastas, como trocar
de página, como buscar dados) é você, juntando outras bibliotecas quando
precisar. Na unidade, por exemplo, as rotas vêm do React Router.

Um **framework** inverte essa relação: ele já traz a estrutura pronta e
decide onde cada coisa fica, e você preenche os espaços. O Next.js é um
framework construído em cima do React.

Uma forma de lembrar: **você chama a biblioteca; o framework chama você.**

### E o Vite?

O navegador não entende JSX, e um projeto React tem dezenas de arquivos que
se importam uns aos outros. O **Vite** é a ferramenta que resolve isso:

- no `npm run dev`, ele traduz o JSX na hora e recarrega a página a cada vez
  que você salva um arquivo;
- no `npm run build`, ele junta e otimiza tudo na pasta `dist/`, que é o que
  vai para a internet.

Ele não faz parte do React: é a ferramenta que cria, roda e empacota o
projeto.

---

## 2. Componentes

Um **componente** é uma função que **devolve um pedaço de tela**, escrito em
**JSX** (um jeito de escrever HTML dentro do JavaScript).

```jsx
function Moeda() {
  return <div className="moeda">Cara</div>;
}
```

Depois de criado, ele é usado **como se fosse uma tag**:

```jsx
function App() {
  return (
    <main>
      <h1>Cara ou Coroa</h1>
      <Moeda />
    </main>
  );
}
```

### Regras do JSX

| Regra | Exemplo |
| --- | --- |
| O nome do componente começa com **letra maiúscula** | `Moeda`, não `moeda`. Com minúscula, o React acha que é uma tag do HTML |
| `class` vira **`className`** | `<div className="moeda">` |
| O `return` devolve **um elemento só** por fora | dois irmãos soltos dão erro; envolva em um `<main>`, `<div>` ou `<>...</>` |
| Toda tag fecha, até as vazias | `<span className="dado__ponto" />` ou `<span ...></span>` |
| JavaScript entra **dentro de `{ }`** | `<p>{2 + 3}</p>` mostra 5 |
| `return` com várias linhas vai **entre parênteses** | `return ( ... );` |

### Um componente por arquivo

Cada componente fica no seu arquivo e é **exportado**. Quem usa, **importa**:

```jsx
// src/components/Moeda.jsx
export default function Moeda() {
  return <div className="moeda">Cara</div>;
}
```

```jsx
// src/App.jsx
import Moeda from "./components/Moeda";

export default function App() {
  return <Moeda />;
}
```

O nome do arquivo e o nome do componente são iguais (`Moeda.jsx` →
`Moeda`). Isso não é obrigatório, mas é a convenção que todo mundo segue.

---

## 3. Props

Um componente que mostra sempre a mesma coisa não serve para muito. As
**props** são os dados que você **entrega** para um componente, do mesmo jeito
que um atributo no HTML:

```jsx
<Moeda lado="coroa" />
```

O componente recebe todas as props em **um objeto**. O jeito mais comum de
ler é já separar cada uma com `{ }` nos parênteses (a "desestruturação" que
você viu na M3U1):

```jsx
export default function Moeda({ lado }) {
  return <div className={`moeda moeda--${lado}`}>{lado}</div>;
}
```

Agora o **mesmo** componente serve para os dois lados:

```jsx
<Moeda lado="cara" />    {/* <div class="moeda moeda--cara">cara</div> */}
<Moeda lado="coroa" />   {/* <div class="moeda moeda--coroa">coroa</div> */}
```

> No Jogo de Dados, é exatamente isso: **um** componente `Dado`, usado **três**
> vezes, cada vez com um `valor` diferente.

### Texto entre aspas, todo o resto entre chaves

```jsx
<Moeda lado="cara" />             // texto
<Placar pontos={3} />             // número: entre chaves
<Placar pontos="3" />             // cuidado: isto é o TEXTO "3", não o número
<Aviso visivel={true} />          // booleano
<Aviso visivel={pontos > 0} />    // qualquer expressão
```

### Props são só para ler

O componente **não altera** as props que recebe. Elas são de quem as enviou.
Se o valor precisa mudar, quem muda é o **dono** do dado (o componente que tem
o estado, na seção 4), e a prop nova chega sozinha.

### Uma prop pode ser uma função

Às vezes o componente de baixo precisa **avisar** o de cima que algo
aconteceu. Por exemplo: o botão foi clicado. Para isso, o de cima passa **uma
função** como prop, e o de baixo a chama:

```jsx
// O botão não sabe o que acontece ao clicar. Ele só avisa.
export default function BotaoJogar({ aoJogar }) {
  return (
    <button type="button" onClick={aoJogar}>
      Jogar a moeda
    </button>
  );
}
```

```jsx
// Quem decide o que acontece é o App.
function jogarMoeda() {
  console.log("jogou!");
}

<BotaoJogar aoJogar={jogarMoeda} />
```

> **Atenção:** `onClick={jogarMoeda}`, **sem** parênteses. Com parênteses,
> `onClick={jogarMoeda()}`, a função roda **na hora de desenhar** a tela, e não
> no clique. É o erro mais comum do começo.

Os nomes das props de função costumam começar com `ao` (`aoJogar`, `aoRolar`,
`aoClicar`). Assim, quem lê o JSX já sabe que aquilo é um aviso de evento.

---

## 4. Estado com `useState`

### Por que uma variável comum não funciona

Tente fazer um contador de jogadas com uma variável comum:

```jsx
export default function App() {
  let jogadas = 0;

  function jogar() {
    jogadas = jogadas + 1;
    console.log(jogadas); // 1, 2, 3... no console
  }

  return (
    <>
      <p>{jogadas} jogadas</p>   {/* fica sempre 0 na tela */}
      <button onClick={jogar}>Jogar</button>
    </>
  );
}
```

O console mostra 1, 2, 3, mas a tela continua em **0**. Dois motivos:

1. Mudar uma variável comum **não avisa o React** que a tela precisa ser
   desenhada de novo.
2. Mesmo que fosse desenhada, a função `App` rodaria do começo, e o
   `let jogadas = 0` zeraria tudo.

### O que o `useState` resolve

O `useState` cria um valor que o React **guarda entre um desenho e outro** e
uma função para **trocar** esse valor **e pedir um novo desenho**:

```jsx
import { useState } from "react";

export default function App() {
  const [jogadas, setJogadas] = useState(0);

  function jogar() {
    setJogadas(jogadas + 1);
  }

  return (
    <>
      <p>{jogadas} jogadas</p>   {/* agora: 1, 2, 3... */}
      <button onClick={jogar}>Jogar</button>
    </>
  );
}
```

Lendo a linha do `useState`:

```
const [jogadas, setJogadas] = useState(0);
       │         │                    │
       │         │                    └── o valor inicial (só vale na primeira vez)
       │         └── a função que troca o valor e redesenha a tela
       └── o valor atual
```

O nome da função é, por convenção, `set` + o nome do estado:
`valores` → `setValores`, `rolagens` → `setRolagens`.

### O que acontece no clique

```
clique no botão
   └─▶ jogar()
         └─▶ setJogadas(1)
               └─▶ o React guarda o 1 e chama App() de novo
                     └─▶ agora useState(0) devolve 1 (o 0 só valia na primeira vez)
                           └─▶ o JSX é montado com jogadas = 1
                                 └─▶ o React compara com a tela e troca só o texto
```

**Toda** vez que um estado muda, o componente roda de novo, do começo, e
todos os componentes de dentro recebem as props novas.

### O `set` não muda a variável na hora

```jsx
function jogar() {
  setJogadas(jogadas + 1);
  console.log(jogadas); // ainda mostra o valor ANTIGO
}
```

O valor novo só existe no **próximo** desenho. Se precisar dele logo em
seguida, guarde em uma constante antes:

```jsx
const novasJogadas = jogadas + 1;
setJogadas(novasJogadas);
console.log(novasJogadas); // o novo
```

> **Para saber mais (opcional).** Como o `jogadas` só muda no próximo
> desenho, dois `setJogadas(jogadas + 1)` seguidos, **antes** de um novo
> desenho, somam 1, e não 2: os dois leram o mesmo valor antigo. Clicando com
> o mouse isso não acontece, porque cada clique ganha o seu desenho. Mas o
> React tem um jeito que nunca falha: passar para o `set` uma **função** que
> recebe o valor mais recente e devolve o novo:
> `setJogadas((anterior) => anterior + 1)`. Se quiser, use essa forma no
> contador de rolagens.

### Estado com lista: sempre uma lista nova

O estado pode ser uma lista. Mas **nunca altere a lista que está no estado**.
Crie uma nova e entregue para o `set`:

```jsx
const [lados, setLados] = useState(["cara", "cara"]);

// ERRADO: altera a lista antiga. O React compara a lista "antes" com a
// "depois", vê que é a MESMA lista e não redesenha nada.
lados[0] = "coroa";
setLados(lados);

// CERTO: uma lista nova, com os valores novos.
setLados(["coroa", "cara"]);
```

> No Jogo de Dados, a cada rolagem você cria uma lista nova com três
> sorteios: `[sorteio, sorteio, sorteio]`.

### Quantos estados?

Um estado para **cada coisa que muda e que não pode ser calculada** a partir de
outra. Na moeda:

- o lado de cada moeda **muda e não dá para calcular**: é estado;
- o número de jogadas **muda e não dá para calcular**: é estado;
- "quantas caras saíram" **dá para calcular** olhando a lista: **não** é
  estado.

---

## 5. Sortear um número com `Math.random`

`Math.random()` devolve um número **quebrado** entre 0 e 1 (pode dar 0, nunca
dá 1): `0.4185...`, `0.9021...`, `0.0377...`.

Para virar uma face de dado (1 a 6), são três passos:

| Passo | Conta | De | Até |
| --- | --- | --- | --- |
| 1. multiplicar por 6 | `Math.random() * 6` | 0 | 5,999... |
| 2. tirar a parte quebrada | `Math.floor(...)` | 0 | 5 |
| 3. somar 1 | `... + 1` | 1 | 6 |

```js
Math.floor(Math.random() * 6) + 1
```

Experimente com o `0.4185`: `0.4185 × 6 = 2.511`, o `Math.floor` dá `2`, e
`2 + 1 = 3`. Saiu a face 3.

Na moeda, com só dois resultados:

```js
function sortearLado() {
  return Math.random() < 0.5 ? "cara" : "coroa";
}
```

Para os dados, escreva a sua `sortearFace()` com a conta de cima.

> **Por que `Math.floor` e não `Math.round`?** O `round` arredonda para o
> mais próximo. Com ele, `Math.round(Math.random() * 6)` daria de 0 a 6 (sete
> resultados!), e o 0 e o 6 sairiam com metade da chance dos outros.

---

## 6. Estado derivado: o que **não** guardar

Na moeda, para mostrar "Caras: 1", você poderia criar mais um estado:

```jsx
const [caras, setCaras] = useState(0);   // NÃO faça isso
```

Mas aí, a cada jogada, você precisaria lembrar de atualizar **os dois**
estados. Se esquecer um, a tela mostra um número errado.

Como a quantidade de caras **sai da lista de lados**, basta **calcular** no
corpo do componente, a cada desenho:

```jsx
const [lados, setLados] = useState(["cara", "cara"]);

const caras = lados.filter((lado) => lado === "cara").length;
```

Essa conta roda toda vez que o `App` roda, ou seja, toda vez que um estado
muda. Ela nunca fica desatualizada.

> No Jogo de Dados, a **soma** é assim: calculada a partir da lista de
> valores, nunca guardada em um estado. Dá para somar os três com `+` ou com o
> `reduce` que você viu na M3U1.

---

## 7. Listas: `map` e `key`

Para desenhar uma lista no JSX, transforme cada item em um elemento com `map`:

```jsx
const lados = ["cara", "coroa", "cara"];

<div className="moedas">
  {lados.map((lado, indice) => (
    <Moeda key={indice} lado={lado} />
  ))}
</div>
```

A prop **`key`** é obrigatória em listas: ela ajuda o React a saber qual item
é qual entre um desenho e outro. Sem ela, aparece um aviso vermelho no
console. Ela precisa ser **diferente** em cada item da lista.

### Repetir algo N vezes

Às vezes você não tem uma lista, só um **número**: "desenhe 4 pontinhos". O
`Array.from` cria uma lista com o tamanho que você pedir, e o `map` desenha um
item para cada posição:

```jsx
const quantidade = 4;

{Array.from({ length: quantidade }).map((_, indice) => (
  <span key={indice} className="estrela" />
))}
```

O `_` é um nome para "não vou usar este valor". Aqui só importa a posição
(`indice`), que serve de `key`.

> No `Dado`, o número de pontinhos é o próprio `valor`.

---

## 8. Mostrar uma coisa ou outra

Com o **ternário** (`condição ? se sim : se não`), o JSX escolhe o que mostrar:

```jsx
{jogadas === 0 ? (
  <p>Clique para jogar.</p>
) : (
  <p>{caras} caras</p>
)}
```

Para escolher entre **palavras**, o ternário também serve dentro do texto:

```jsx
<p>{jogadas} {jogadas === 1 ? "jogada" : "jogadas"}</p>
```

E para "mostrar só se": `{condicao && <p>...</p>}`.

---

## 9. Juntando tudo: o caminho de um clique

O cara ou coroa inteiro, com duas moedas:

```
App  ── estado: lados = ["cara", "coroa"], jogadas = 3
 │      calculado: caras = 1
 │
 ├── <Moeda lado="cara" />
 ├── <Moeda lado="coroa" />
 ├── <Placar caras={1} jaJogou={true} />
 └── <BotaoJogar aoJogar={jogarMoedas} />
```

1. A pessoa clica. O `BotaoJogar` chama `aoJogar`, que é o `jogarMoedas` do
   `App`.
2. `jogarMoedas` sorteia dois lados, cria uma lista nova e chama `setLados` e
   `setJogadas`.
3. O React roda o `App` de novo, com os estados novos.
4. O `App` recalcula `caras` e entrega props novas para cada filho.
5. Cada `Moeda` e o `Placar` desenham o que receberam.

O Jogo de Dados tem **exatamente** esse formato. Troque "moeda" por "dado",
"lado" por "valor", "caras" por "soma" e duas por três.

---

## 10. Erros comuns

| Sintoma | Causa provável |
| --- | --- |
| O componente não aparece, e nenhum erro | nome com letra minúscula (`<dado />`) |
| "Adjacent JSX elements must be wrapped..." | o `return` tem dois elementos soltos; envolva em um só |
| A função roda sozinha ao abrir a página | `onClick={funcao()}` com parênteses |
| A tela não muda ao clicar | mudou uma variável comum, ou alterou a lista do estado em vez de criar outra |
| A prop chega como `undefined` | o nome na hora de usar é diferente do nome na hora de receber (`valor` × `value`) |
| "Each child in a list should have a unique key" | faltou a `key` no `map` |
| O número aparece colado: "36" em vez de 9 | a prop foi passada como texto (`valor="3"`) em vez de número (`valor={3}`) |
| "X is not defined" | faltou o `import` do componente ou do `useState` |
