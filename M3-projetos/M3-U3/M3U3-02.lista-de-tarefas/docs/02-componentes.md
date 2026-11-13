# Componentes · Lista de Tarefas

Os componentes da aplicação, as props de cada um, os dados de apoio e a
marcação que dá o visual das referências. As classes já estão no
`estilo.css`; você só precisa usá-las.

Os exemplos mostram **o resultado** para valores específicos. No seu
componente, esses valores vêm do estado e das props.

---

## 1. A árvore

```
App ................................ estado: tarefas
 ├── Resumo tarefas
 └── main.painel
      ├── FormularioTarefa aoAdicionar ...... estado: campos, erros
      └── ListaTarefas tarefas aoAlternar aoExcluir
            └── ItemTarefa tarefa aoAlternar aoExcluir   (um por tarefa)
```

| Componente | Props | Estado próprio | O que desenha |
| --- | --- | --- | --- |
| `App` | nenhuma | `tarefas` | o topo, o formulário e a lista; tem as funções que mudam a lista |
| `Resumo` | `tarefas` | nenhum | as três pílulas com os números (calculados) |
| `FormularioTarefa` | `aoAdicionar` | `campos`, `erros` | o cartão "Nova tarefa" |
| `ListaTarefas` | `tarefas`, `aoAlternar`, `aoExcluir` | nenhum | o título da lista e os itens, ou o aviso de lista vazia |
| `ItemTarefa` | `tarefa`, `aoAlternar`, `aoExcluir` | nenhum | uma tarefa |

### A tarefa

```js
{
  id: "3b241101-e2bb-4255-8caf-4136c566a962",
  descricao: "Entregar o projeto do Jogo de Dados",
  categoria: "estudos",
  prazo: "2026-11-18",     // ou "" se não tiver prazo
  prioritaria: true,
  concluida: false,
}
```

### As categorias (`src/utils/categorias.js`)

```js
export const CATEGORIAS = [
  { valor: "estudos", rotulo: "Estudos" },
  { valor: "trabalho", rotulo: "Trabalho" },
  { valor: "casa", rotulo: "Casa" },
  { valor: "saude", rotulo: "Saúde" },
  { valor: "pessoal", rotulo: "Pessoal" },
];
```

O `valor` vai para o estado e para a classe da etiqueta
(`etiqueta--saude`). O `rotulo` é o que aparece na tela ("Saúde"). Para achar
o rótulo de uma tarefa: `CATEGORIAS.find((c) => c.valor === tarefa.categoria)`.

---

## 2. `App`

```jsx
<div className="app">
  <header className="topo">
    <p className="topo__sobretitulo">Lista de tarefas</p>
    <h1 className="topo__titulo">O que vamos fazer hoje?</h1>
    {/* <Resumo /> */}
  </header>

  <main className="painel">
    {/* <FormularioTarefa /> e <ListaTarefas />, nesta ordem */}
  </main>
</div>
```

---

## 3. `Resumo`

```jsx
<ul className="resumo" aria-label="Resumo da lista">
  <li className="resumo__item"><strong>6</strong> tarefas</li>
  <li className="resumo__item"><strong>1</strong> concluída</li>
  <li className="resumo__item resumo__item--prioridade"><strong>2</strong> prioritárias</li>
</ul>
```

Singular só com **1**: "1 tarefa", "0 tarefas", "2 tarefas". O mesmo para
"concluída/concluídas" e "prioritária/prioritárias".

---

## 4. `FormularioTarefa`

O formulário em branco:

```jsx
<section className="cartao cartao--fixo" aria-labelledby="titulo-nova">
  <h2 id="titulo-nova" className="cartao__titulo">Nova tarefa</h2>

  <form className="formulario" noValidate>
    <div className="campo">
      <label className="campo__rotulo" htmlFor="descricao">O que precisa ser feito?</label>
      <input
        className="campo__entrada"
        id="descricao"
        name="descricao"
        maxLength={80}
        placeholder="Ex.: Revisar a aula de props"
      />
      <div className="campo__rodape">
        <span className="campo__contador">0/80</span>
      </div>
    </div>

    <div className="formulario__linha">
      <div className="campo">
        <label className="campo__rotulo" htmlFor="categoria">Categoria</label>
        <select className="campo__entrada" id="categoria" name="categoria">
          <option value="">Escolha</option>
          {/* uma <option> para cada item de CATEGORIAS */}
        </select>
        <div className="campo__rodape"></div>
      </div>

      <div className="campo">
        <label className="campo__rotulo" htmlFor="prazo">
          Prazo <span className="campo__opcional">(opcional)</span>
        </label>
        <input className="campo__entrada" type="date" id="prazo" name="prazo" />
        <div className="campo__rodape"></div>
      </div>
    </div>

    <label className="interruptor">
      <input className="interruptor__entrada" type="checkbox" name="prioritaria" />
      <span className="interruptor__trilho" aria-hidden="true"></span>
      <span className="interruptor__texto">
        <span className="interruptor__titulo">Prioritária</span>
        <span className="interruptor__dica">Vai para o topo da lista, em destaque</span>
      </span>
    </label>

    <button className="botao-adicionar" type="submit">
      Adicionar tarefa
    </button>
  </form>
</section>
```

- **O interruptor é um checkbox de verdade.** O CSS esconde a caixinha e
  desenha o trilho no lugar, mas o `<input type="checkbox">` continua lá:
  liga com `checked` e `onChange` como qualquer checkbox, e funciona com
  teclado (Tab + Espaço) e leitor de tela.
- **O `campo__rodape` existe sempre**, mesmo vazio: ele reserva o espaço da
  mensagem de erro, e o formulário não "pula" quando um erro aparece.
- **O contador** fica no rodapé da descrição, sempre. A partir de 70 letras,
  ganha também a classe `campo__contador--alerta` (fica laranja).

### Campo com erro

```jsx
<input
  className="campo__entrada"
  id="descricao"
  name="descricao"
  maxLength={80}
  placeholder="Ex.: Revisar a aula de props"
  aria-invalid="true"
  aria-describedby="erro-descricao"
/>
<div className="campo__rodape">
  <span className="campo__erro" id="erro-descricao">
    A tarefa precisa ter pelo menos 3 letras.
  </span>
  <span className="campo__contador">2/80</span>
</div>
```

Os `id` das mensagens: `erro-descricao`, `erro-categoria` e `erro-prazo`. O
`aria-invalid="true"` é o que pinta a borda de vermelho.

### Botão desativado

```jsx
<button className="botao-adicionar" type="submit" disabled>
  Adicionar tarefa
</button>
```

No JSX: `disabled={...}` com uma expressão que dá `true` enquanto a descrição
estiver vazia.

---

## 5. `ListaTarefas`

```jsx
<section aria-labelledby="titulo-lista">
  <div className="lista__cabecalho">
    <h2 className="lista__titulo" id="titulo-lista">Suas tarefas</h2>
    <p className="lista__legenda">Prioritárias ficam no topo</p>
  </div>

  <ul className="lista__itens">
    {/* um <ItemTarefa key={tarefa.id} ... /> por tarefa */}
  </ul>
</section>
```

Sem tarefas, no lugar do `<ul>`:

```jsx
<div className="lista-vazia">
  <p className="lista-vazia__titulo">Nenhuma tarefa por aqui</p>
  <p className="lista-vazia__texto">
    Use o formulário para criar a primeira. As prioritárias aparecem no topo, em destaque.
  </p>
</div>
```

O desenho do bloquinho de notas, acima do texto, vem do CSS.

---

## 6. `ItemTarefa`

Uma tarefa prioritária, pendente, com prazo:

```jsx
<li className="tarefa tarefa--prioritaria">
  <input className="tarefa__check" type="checkbox" id="tarefa-3b24..." />
  <div className="tarefa__corpo">
    <label className="tarefa__descricao" htmlFor="tarefa-3b24...">
      Entregar o projeto do Jogo de Dados
    </label>
    <div className="tarefa__detalhes">
      <span className="selo-prioridade">Prioritária</span>
      <span className="etiqueta etiqueta--estudos">Estudos</span>
      <span className="tarefa__prazo">até 18/11</span>
    </div>
  </div>
  <button
    className="tarefa__excluir"
    type="button"
    aria-label="Excluir a tarefa: Entregar o projeto do Jogo de Dados"
  >
    ×
  </button>
</li>
```

| Situação | Muda o quê |
| --- | --- |
| prioritária | `tarefa--prioritaria` no `<li>` e o `<span className="selo-prioridade">` |
| concluída | `tarefa--concluida` no `<li>` e o checkbox com `checked` |
| sem prazo | o `<span className="tarefa__prazo">` não existe |
| as duas classes | podem aparecer juntas: `tarefa tarefa--prioritaria tarefa--concluida` |

- **O `id` do checkbox** é `tarefa-` + o `id` da tarefa: assim cada caixinha
  tem um `id` diferente, e clicar no texto (o `<label>`) também marca.
- **A estrela e o reloginho** antes do selo e do prazo vêm do CSS. No JSX,
  só os textos "Prioritária" e "até 18/11".
- **O "×"** tem `aria-label` com a descrição: para quem usa leitor de tela,
  "×" sozinho não diz nada, e "Excluir" sozinho não diz **qual**.

Para montar a classe do `<li>` com as variações, uma forma legível:

```jsx
const classes = ["tarefa"];
if (tarefa.prioritaria) classes.push("tarefa--prioritaria");
if (tarefa.concluida) classes.push("tarefa--concluida");

<li className={classes.join(" ")}>
```
