# Componentes · Horizonte Acervo

O HTML de cada pedaço de interface que o **seu JavaScript** vai criar. O que
está fixo na página já está no `index.html`. O que muda conforme os dados está
aqui.

Este documento mostra **o resultado**, não o código que o produz. O desafio é
escrever as funções que geram exatamente esta marcação a partir de um objeto
de obra.

> Em todos os exemplos, `{entre chaves}` é um dado que vem da obra ou do
> estado. Dado da API entra na página por `textContent` ou por atributo
> (`setAttribute`, `.src`, `.alt`), nunca por `innerHTML` (veja o guia da API).

---

## 1. Cartão de obra

Usado nas duas grades: `#grade-obras` (acervo) e `#grade-selecao` (seleção).
**Uma função só** desenha os dois.

```html
<article class="card" data-id="{id}">
  <img class="card__imagem" src="{images.web.url}" alt="{title}" loading="lazy">

  <button class="botao-favorito botao-favorito--icone card__favorito"
          type="button"
          data-acao="guardar"
          aria-pressed="false"
          aria-label="Guardar {title} na seleção"></button>

  <div class="card__corpo">
    <p class="rotulo">{tipo traduzido} · {creation_date}</p>
    <h3 class="card__titulo">
      <button type="button" data-acao="abrir">{title}</button>
    </h3>
    <p class="card__texto">{autoria}</p>
  </div>
</article>
```

- `data-id` no `<article>` é o que a delegação de eventos usa para descobrir
  **qual** obra foi clicada.
- `data-acao` nos dois botões é o que ela usa para descobrir **o que** fazer.
- O `::after` do botão do título cobre o cartão inteiro, então clicar na foto
  ou no texto também conta como clique no botão do título. O botão de guardar
  fica por cima dessa camada.
- Obra na seleção: `aria-pressed="true"` e `aria-label="Remover {title} da
  seleção"`.

### Uma função, um elemento

```js
// O formato esperado. O conteúdo é com você.
export function criarCardObra(obra, estaNaSelecao) {
  const card = document.createElement('article')
  // ...
  return card
}
```

A função **não** coloca o cartão na página e **não** busca nada no `document`.
Ela recebe dados e devolve um elemento. Quem decide onde o cartão entra é quem
chamou a função.

## 2. Cartão-esqueleto (carregando)

Doze destes na grade, no lugar dos cartões, enquanto a API não responde:

```html
<article class="card esqueleto" aria-hidden="true"></article>
```

Como a grade fica com conteúdo "vazio" para o leitor de tela, o contador logo
acima (que tem `aria-live="polite"`) avisa com "Buscando…".

## 3. Estado vazio

```html
<div class="estado">
  <p class="estado__titulo">Nada por aqui</p>
  <p>Nenhuma obra encontrada para “{busca}”. Tente outra palavra, em inglês.</p>
</div>
```

Na seleção vazia, o mesmo componente com outro texto e um link de volta para o
acervo:

```html
<div class="estado">
  <p class="estado__titulo">Sua seleção está vazia</p>
  <p>Guarde obras do acervo para vê-las aqui.</p>
  <a class="botao botao--contorno botao--pequeno" href="#acervo">Ir para o acervo</a>
</div>
```

Repare que é **o mesmo componente** com conteúdo diferente: uma função
`criarEstado({ titulo, texto, ... })` resolve os dois casos.

## 4. Estado de erro

```html
<div class="estado estado--erro" role="alert">
  <p class="estado__titulo">Não foi possível carregar o acervo</p>
  <p>Confira sua conexão e tente de novo.</p>
  <button class="botao botao--contorno botao--pequeno" type="button" data-acao="tentar-de-novo">Tentar de novo</button>
</div>
```

## 5. Conteúdo da janela de detalhe

O `index.html` já tem a moldura (`#modal-obra`, a janela e o botão X). O seu
código preenche o `#modal-conteudo` com **um** destes três:

### Carregando

```html
<div class="estado" role="status">
  <div class="spinner" aria-hidden="true"></div>
  <p>Carregando obra…</p>
</div>
```

### Detalhe

```html
<div class="detalhe" data-id="{id}">
  <img class="detalhe__midia" src="{images.web.url}" alt="{title}">

  <div class="detalhe__info">
    <p class="rotulo">{tipo traduzido}</p>
    <h2 class="titulo-pagina" id="modal-titulo">{title}</h2>
    <p class="texto-apoio">{autoria}</p>

    <dl class="lista-dados">
      <div><dt>Data</dt><dd>{creation_date}</dd></div>
      <div><dt>Técnica</dt><dd>{technique}</dd></div>
      <div><dt>Dimensões</dt><dd>{measurements}</dd></div>
      <div><dt>Cultura</dt><dd>{culture, separadas por vírgula}</dd></div>
    </dl>

    <p class="texto-apoio">{description sem tags}</p>

    <div class="linha">
      <button class="botao-favorito" type="button" data-acao="guardar" aria-pressed="false">Guardar</button>
      <a class="link" href="{url}" target="_blank" rel="noopener">Ver no site do museu</a>
    </div>
  </div>
</div>
```

- Cada `<div>` da lista de dados só existe se o dado existir.
- O parágrafo da descrição só existe se houver descrição.
- Com a obra na seleção, o botão fica com `aria-pressed="true"` e o texto
  "Guardada".
- `rel="noopener"` impede que a aba nova tenha acesso à sua página. Use sempre
  junto com `target="_blank"`.

### Erro

```html
<div class="estado estado--erro" role="alert">
  <p class="estado__titulo">Não foi possível carregar esta obra.</p>
  <button class="botao botao--contorno botao--pequeno" type="button" data-acao="tentar-obra-de-novo">Tentar de novo</button>
</div>
```

## 6. Aviso flutuante

O `#toast` já está no `index.html`. Para usar, troque o texto e a classe de
tipo e tire o `hidden`:

```html
<div class="toast toast--sucesso" id="toast" role="status">Obra guardada na sua seleção.</div>
```

## 7. Erro de um campo do formulário

O formulário inteiro está pronto no `index.html`. Em um campo com erro, o
resultado é:

```html
<div class="campo com-erro">
  <label class="campo__rotulo" for="email">E-mail <span class="obrigatorio">*</span></label>
  <input id="email" name="email" type="email" aria-invalid="true" aria-describedby="email-erro">
  <p class="campo__erro" id="email-erro">Digite um e-mail válido, como nome@email.com.</p>
</div>
```

O campo **Paisagem** é um `<fieldset>`: nele, a classe `com-erro` vai no próprio
`fieldset`, e o `aria-invalid` vai em cada um dos três `radio`.

---

## Os dados da seleção

O que vai para o `localStorage` não é a resposta da API inteira, é só o que o
cartão precisa:

```json
[
  {
    "id": 157013,
    "title": "Landscape",
    "type": "Photograph",
    "creation_date": "1856",
    "autoria": "Henry White (British, 1819–1903)",
    "imagem": "https://openaccess-cdn.clevelandart.org/1993.162/1993.162_web.jpg"
  }
]
```

O formato acima é uma sugestão. Se você mudar, mude também o que o
`criarCardObra` espera, ou use uma pequena função que converte a obra da API
para esse formato antes de desenhar e de salvar. As duas grades e a seleção
ficam lendo o mesmo formato.
