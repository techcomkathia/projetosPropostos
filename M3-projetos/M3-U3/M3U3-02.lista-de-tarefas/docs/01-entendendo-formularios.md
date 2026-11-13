# Entendendo formulários no React · Lista de Tarefas

Este documento explica tudo o que a Lista de Tarefas usa. Os exemplos são de
**outro** formulário, uma **lista de compras** (produto, setor, quantidade e
"urgente"), de propósito: você entende a ideia aqui e aplica nas tarefas lá.

Leia na ordem. Cada seção usa a anterior.

---

## 1. Quem manda no valor do campo?

Num formulário HTML comum, quem guarda o que a pessoa digitou é o **próprio
campo**. Para saber o valor, o JavaScript vai até ele e pergunta:

```js
const produto = document.querySelector("#produto").value;
```

No React, a ideia se inverte: quem guarda o valor é o **estado**, e o campo
só **mostra** o que está no estado. A cada tecla, o campo avisa o React, o
estado muda e o campo é desenhado de novo com o valor novo.

```
pessoa digita "p"
   └─▶ onChange avisa
         └─▶ setProduto("p")
               └─▶ o componente é desenhado de novo
                     └─▶ <input value="p" />
```

Isso é um **campo controlado**: o estado controla o campo. A vantagem é que o
valor está **sempre** à mão, no estado, para validar, contar letras, ligar e
desligar o botão, sem perguntar nada ao DOM.

---

## 2. Um campo controlado

São sempre duas peças juntas: `value` e `onChange`.

```jsx
import { useState } from "react";

function CampoProduto() {
  const [produto, setProduto] = useState("");

  return (
    <input
      value={produto}
      onChange={(evento) => setProduto(evento.target.value)}
    />
  );
}
```

- `value={produto}`: o campo mostra o que está no estado.
- `onChange`: roda **a cada tecla**. O `evento.target` é o próprio campo, e o
  `evento.target.value` é o texto que ele **teria** depois da tecla.

> **Esqueceu o `onChange`?** O campo fica travado: você digita e nada
> aparece, porque o `value` continua preso ao estado, que nunca muda. O React
> avisa no console.

---

## 3. Vários campos: um estado-objeto e um `onChange` só

Um `useState` para cada campo funciona, mas um formulário com quatro campos
vira quatro estados e quatro funções quase iguais. O jeito mais limpo é **um
objeto** com todos os campos:

```jsx
const CAMPOS_INICIAIS = {
  produto: "",
  setor: "",
  quantidade: "1",
  urgente: false,
};

const [campos, setCampos] = useState(CAMPOS_INICIAIS);
```

E **uma** função que serve para todos. O truque é dar a cada campo um `name`
**igual à chave** no objeto:

```jsx
function atualizarCampo(evento) {
  const { name, value } = evento.target;
  setCampos({ ...campos, [name]: value });
}

<input name="produto" value={campos.produto} onChange={atualizarCampo} />
<input name="quantidade" type="number" value={campos.quantidade} onChange={atualizarCampo} />
```

Lendo a linha do `setCampos`:

- `...campos` copia **todos** os campos como estão;
- `[name]: value` troca **só** o campo que mudou. Os colchetes dizem: "a chave
  é o **valor** da variável `name`", e não a palavra "name". Se o `name` for
  `"produto"`, é o mesmo que escrever `produto: value`.

> **Por que copiar com `...campos`?** Porque o `set` **troca** o objeto
> inteiro. `setCampos({ produto: "pão" })` apagaria todos os outros campos.

### E o checkbox?

O checkbox não usa `value` para dizer se está marcado: usa **`checked`**, que
é `true` ou `false`. Então a função precisa olhar o tipo do campo:

```jsx
function atualizarCampo(evento) {
  const { name, type, value, checked } = evento.target;
  setCampos({
    ...campos,
    [name]: type === "checkbox" ? checked : value,
  });
}

<input type="checkbox" name="urgente" checked={campos.urgente} onChange={atualizarCampo} />
```

---

## 4. Cada tipo de campo

| Campo | Liga com | O que chega no estado |
| --- | --- | --- |
| texto | `value` | texto |
| `select` | `value` **no `<select>`** | o `value` da `<option>` escolhida (texto) |
| data (`type="date"`) | `value` | texto no formato `"2026-11-19"`, ou `""` se vazio |
| número (`type="number"`) | `value` | **texto**! `"3"`, não `3` (use `Number()` se for fazer conta) |
| checkbox | `checked` | `true` ou `false` |

### O `select`

No React, o `value` fica no **`<select>`**, não em um `selected` na opção.
Uma opção com `value=""` faz o papel de "nada escolhido ainda":

```jsx
const SETORES = [
  { valor: "hortifruti", rotulo: "Hortifrúti" },
  { valor: "padaria", rotulo: "Padaria" },
  { valor: "limpeza", rotulo: "Limpeza" },
];

<select name="setor" value={campos.setor} onChange={atualizarCampo}>
  <option value="">Escolha</option>
  {SETORES.map((setor) => (
    <option key={setor.valor} value={setor.valor}>
      {setor.rotulo}
    </option>
  ))}
</select>
```

Guardar a lista de opções em um array, fora do JSX, deixa o código mais
curto e permite usar o mesmo array em outro lugar (por exemplo, para achar o
rótulo de um valor).

### O rótulo de cada campo

Todo campo tem um `<label>`, ligado pelo `htmlFor` (no React, `for` vira
`htmlFor`) ao `id` do campo. Clicar no rótulo coloca o cursor no campo, e o
leitor de tela lê o rótulo ao chegar no campo.

```jsx
<label htmlFor="produto">Produto</label>
<input id="produto" name="produto" ... />
```

---

## 5. O que dá para calcular, calcule

Com o estado do formulário em mãos, várias coisas da tela saem **dele**, sem
estado novo:

```jsx
const letras = campos.produto.length;              // contador
const quaseNoLimite = letras >= 50;                 // muda a cor do contador
const podeEnviar = campos.produto.trim() !== "";    // liga e desliga o botão

<span>{letras}/60</span>
<button type="submit" disabled={!podeEnviar}>Adicionar</button>
```

O `trim()` tira os espaços do começo e do fim: com ele, um produto feito só
de espaços conta como vazio.

> Se você criar um `useState` para o contador, vai ter que lembrar de
> atualizar os dois a cada tecla. Calculando, ele **nunca** fica errado.

---

## 6. Enviar

O envio é tratado **no `<form>`**, pelo `onSubmit`, e não no `onClick` do
botão. Assim, apertar **Enter** em qualquer campo também envia.

```jsx
function enviar(evento) {
  evento.preventDefault();
  console.log(campos);
}

<form onSubmit={enviar} noValidate>
  ...
  <button type="submit">Adicionar</button>
</form>
```

- **`preventDefault()`**: sem ele, o navegador faz o que fazia nos anos 90:
  envia o formulário e **recarrega a página**. Com a página recarregada, o
  estado inteiro se perde.
- **`noValidate`**: desliga os balões de erro do próprio navegador. Quem valida
  e mostra as mensagens é o seu código, do jeito do projeto.
- **`type="submit"`** no botão que envia; **`type="button"`** em qualquer outro
  botão dentro do formulário, senão ele também envia.

---

## 7. Validar

### As regras viram uma função

Uma função recebe os campos e devolve um objeto **só com o que está errado**:

```jsx
function validar(campos) {
  const erros = {};

  if (campos.produto.trim().length < 2) {
    erros.produto = "O produto precisa ter pelo menos 2 letras.";
  }
  if (campos.setor === "") {
    erros.setor = "Escolha um setor.";
  }
  if (Number(campos.quantidade) < 1) {
    erros.quantidade = "A quantidade mínima é 1.";
  }

  return erros;
}
```

Objeto vazio = tudo certo. Para conferir: `Object.keys(erros).length === 0`.

### Os erros também são estado

Eles aparecem e somem da tela, então moram em um `useState`:

```jsx
const [erros, setErros] = useState({});

function enviar(evento) {
  evento.preventDefault();
  const novosErros = validar(campos);

  if (Object.keys(novosErros).length > 0) {
    setErros(novosErros);
    return; // para aqui: não envia
  }

  // tudo certo: envia (seção 9) e volta ao começo (seção 8)
}
```

### Mostrar o erro embaixo do campo

```jsx
<input
  id="produto"
  name="produto"
  value={campos.produto}
  onChange={atualizarCampo}
  aria-invalid={erros.produto ? "true" : undefined}
  aria-describedby={erros.produto ? "erro-produto" : undefined}
/>
{erros.produto && <span id="erro-produto">{erros.produto}</span>}
```

- **`aria-invalid="true"`** diz ao leitor de tela que o campo tem problema. No
  projeto, o CSS também usa esse atributo para pintar a borda de vermelho.
- **`aria-describedby`** liga o campo à mensagem: ao chegar no campo, o leitor
  de tela lê o rótulo **e** o erro.
- Passar `undefined` faz o React **não** colocar o atributo.

### O erro some quando a pessoa corrige

Dentro do `atualizarCampo`, se aquele campo tinha erro, tire só o erro dele:

```jsx
if (erros[name]) {
  setErros({ ...erros, [name]: undefined });
}
```

> **Por que validar só no envio?** Mostrar "precisa ter pelo menos 2 letras"
> enquanto a pessoa ainda está digitando a primeira é irritante. Valida-se no
> envio e, depois, cada erro some quando o campo é corrigido.

---

## 8. Voltar o formulário ao começo

Como o estado começou com uma constante, voltar ao começo é entregar a mesma
constante de novo:

```jsx
setCampos(CAMPOS_INICIAIS);
setErros({});
```

Os campos são controlados, então ficam em branco **sozinhos**: eles mostram o
que está no estado.

---

## 9. Listas no estado: incluir, alterar, excluir

A lista de compras é um array de objetos no estado. Cada operação cria um
array **novo**; nenhuma altera o antigo.

### Cada item precisa de um `id`

```js
const item = {
  id: crypto.randomUUID(),   // "3b241101-e2bb-4255-8caf-4136c566a962"
  produto: "Pão",
  setor: "padaria",
  urgente: false,
  comprado: false,
};
```

O `crypto.randomUUID()` já vem no navegador e gera um texto que nunca se
repete. O `id` serve para achar o item na hora de alterar ou excluir, e é a
`key` do item na lista.

### Incluir no começo ou no fim

```js
setItens([...itens, novo]);   // no FIM: copia todos e coloca o novo depois
setItens([novo, ...itens]);   // no COMEÇO: o novo primeiro, depois todos
```

Escolher entre os dois é um `if`:

```js
if (novo.urgente) {
  setItens([novo, ...itens]);
} else {
  setItens([...itens, novo]);
}
```

> Repare: um urgente novo fica **acima** dos urgentes que já estavam. Os mais
> recentes primeiro, dentro do grupo de cima.

### Alterar um item: `map`

O `map` passa por todos. O item com o `id` certo vira uma **cópia alterada**;
os outros voltam como estão:

```js
function alternarComprado(id) {
  setItens(
    itens.map((item) =>
      item.id === id ? { ...item, comprado: !item.comprado } : item,
    ),
  );
}
```

### Excluir um item: `filter`

O `filter` fica com todos **menos** o do `id`:

```js
function excluir(id) {
  setItens(itens.filter((item) => item.id !== id));
}
```

### Por que a `key` é o `id`, e não a posição?

```jsx
{itens.map((item) => <ItemCompra key={item.id} item={item} />)}
```

A `key` diz ao React **quem é quem** entre um desenho e outro. Se a `key`
fosse a posição (`indice`), ao incluir um item **no começo** todos os outros
mudariam de posição, e o React acharia que **todos** mudaram. No projeto, você
veria isso: a animação de entrada rodaria em itens que já estavam na lista. Com
o `id`, só o item novo é novo.

---

## 10. Onde fica cada estado

```
App ................................ estado: itens
 ├── FormularioCompra aoAdicionar ... estado: campos, erros
 └── ListaCompras itens, aoAlternar, aoExcluir
       └── ItemCompra item, aoAlternar, aoExcluir
```

- Os **campos** e os **erros** só interessam ao formulário: moram nele.
- A **lista** interessa ao formulário (que inclui), à lista (que mostra) e ao
  resumo (que conta). Por isso mora no `App`, o "pai" de todos.
- O formulário não mexe na lista. Ele **avisa** o `App` pela prop
  `aoAdicionar`, entregando os dados do item novo. Quem decide onde o item
  entra é o `App`.

```jsx
// no App
function adicionarItem(dados) {
  const novo = { ...dados, id: crypto.randomUUID(), comprado: false };
  // ... começo ou fim
}

<FormularioCompra aoAdicionar={adicionarItem} />

// no FormularioCompra, quando está tudo certo
aoAdicionar({
  produto: campos.produto.trim(),
  setor: campos.setor,
  quantidade: Number(campos.quantidade),
  urgente: campos.urgente,
});
```

---

## 11. Datas no formulário

O campo `type="date"` trabalha com texto no formato **ano-mês-dia**:
`"2026-11-19"`. Duas funções resolvem tudo o que o projeto precisa. Elas não
são o foco do projeto, então podem ser copiadas para `src/utils/datas.js`:

```js
// A data de hoje no mesmo formato do campo: "2026-11-13".
// (O toISOString() usaria o fuso de Londres e, à noite, já daria o dia seguinte.)
export function hojeNoFormatoDoCampo() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

// "2026-11-19" → "19/11"
export function formatarPrazo(data) {
  const [, mes, dia] = data.split("-");
  return `${dia}/${mes}`;
}
```

Como o formato é ano-mês-dia, **comparar os textos funciona como comparar as
datas**: `"2026-11-02" < "2026-11-13"` é `true`. Então "o prazo já passou" é:

```js
campos.prazo !== "" && campos.prazo < hojeNoFormatoDoCampo()
```

---

## 12. Erros comuns

| Sintoma | Causa provável |
| --- | --- |
| Digito e nada aparece no campo | falta o `onChange`, ou o `name` não bate com a chave do estado |
| Digito em um campo e outro se apaga | o `set` não copiou os outros campos (`...campos`) |
| A página pisca e tudo some ao enviar | faltou o `preventDefault()` |
| O checkbox não marca | usou `value` em vez de `checked` |
| "A component is changing an uncontrolled input to be controlled" | o valor inicial do campo é `undefined`; comece com `""` (ou `false`, no checkbox) |
| A quantidade soma "1" + "2" = "12" | o valor do campo é texto; use `Number()` |
| O botão "×" envia o formulário | botão dentro de `<form>` sem `type="button"` |
| Excluir apaga o item errado | a `key` ou o `id` usado não é o do item; confira o `filter` |
| O aviso de `key` aparece no console | faltou `key` no `map`, ou duas tarefas com o mesmo `id` |
