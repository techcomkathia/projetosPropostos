# Estilo base — Módulo 3

Folha de estilo pronta para os projetos de JavaScript e React. Ela traz a
estética das três páginas do Módulo 2 (Artesano, Raiz & Cia e Horizonte) em
forma de **classes** e **variáveis**.

No Módulo 2 você escreveu o CSS. Aqui ele já vem pronto: você monta o HTML (ou
o JSX) com as classes desta página e gasta o seu tempo no JavaScript. O CSS não
entra na avaliação de nenhum projeto deste módulo.

Neste projeto, o arquivo vai para `src/` e é importado no `main.jsx` (veja a
Etapa 0 do README do projeto). O tema usado é o Raiz. A professora tem uma
**vitrine** com todos os componentes funcionando nos três temas: peça o link se
quiser ver.

---

## 1. Como usar

**JavaScript puro:** copie o arquivo para a pasta do projeto e ligue no `<head>`.

```html
<link rel="stylesheet" href="css/estilo-base.css">
```

**React (Vite):** copie para `src/` e importe uma vez só, no `main.jsx`.

```jsx
import './estilo-base.css'
```

No JSX, `class` vira `className`. O resto é igual:

```jsx
<article className="card">...</article>
```

## 2. Escolher um tema

Há três temas prontos. Para escolher, coloque o atributo `data-tema` na tag
`<html>` (no React, ela fica no `index.html` da raiz do projeto):

| Tema | Como ativar | Cara |
| --- | --- | --- |
| Artesano | nada (é o padrão) | cinzas, título serifado leve, rótulos em caixa alta com letras espaçadas, botões em pílula |
| Raiz & Cia | `<html data-tema="raiz">` | branco e verde, títulos sem serifa em negrito, cantos de 2px |
| Horizonte | `<html data-tema="horizonte">` | escuro, fonte Figtree leve, branco com transparências |

## 3. Personalizar

Toda a aparência sai das **variáveis** do começo do arquivo (seção 1). Para
mudar cores, fontes, tamanhos ou cantos, **não edite as classes**: crie um
arquivo seu, ligado **depois** do estilo base, e sobrescreva só as variáveis
que quiser mudar.

```html
<link rel="stylesheet" href="css/estilo-base.css">
<link rel="stylesheet" href="css/meu-tema.css">
```

```css
/* meu-tema.css */
:root {
  --cor-acento: #b5482f;
  --cor-acento-hover: #8f3622;
  --cor-acento-suave: #f6e7e2;
  --fonte-titulo: "Playfair Display", Georgia, serif;
  --raio-botao: 6px;
}
```

> Se você estiver usando um tema com `data-tema`, troque `:root` pelo seletor
> do tema, como `[data-tema="raiz"]`. Senão o tema vence a sua alteração.

### Variáveis principais

| Variável | O que controla |
| --- | --- |
| `--cor-fundo` / `--cor-fundo-alt` / `--cor-fundo-escuro` | fundo da página, das seções alternadas e das seções escuras |
| `--cor-superficie` | fundo de cartões, campos e janelas |
| `--cor-texto` / `--cor-texto-suave` / `--cor-texto-tenue` | três níveis de texto: principal, apoio e rótulos |
| `--cor-borda` / `--cor-borda-campo` / `--cor-borda-forte` | divisórias, campos em repouso e campos em foco |
| `--cor-acento` / `--cor-acento-hover` / `--cor-sobre-acento` | botão principal, chip ativo, opção marcada |
| `--cor-acento-suave` | fundo de chip, etiqueta e linha de tabela em destaque |
| `--cor-erro` / `--cor-sucesso` / `--cor-aviso` (e as versões `-suave`) | mensagens e etiquetas de situação |
| `--fonte-titulo` / `--fonte-texto` / `--fonte-display` | as três famílias de fonte |
| `--peso-titulo` / `--peso-texto` / `--peso-destaque` | pesos da fonte |
| `--tamanho-*` | tamanhos de letra (mudam sozinhos em 1024px, 768px e 480px) |
| `--caixa-rotulo` / `--espacamento-rotulo` | caixa alta e espaço entre letras dos rótulos |
| `--largura-max` / `--respiro-lateral` / `--espaco-secao` | largura do conteúdo, margens laterais e distância entre seções |
| `--grade-coluna-min` | largura mínima de cada cartão: define quantas colunas cabem |
| `--raio` / `--raio-botao` | cantos (use `999px` para pílula) |

As fontes vêm do Google Fonts por um `@import` na primeira linha do arquivo. Se
trocar a família, troque também o endereço do `@import`.

---

## 4. Estados: o que o seu código liga e desliga

A ideia principal deste arquivo: **o JavaScript não mexe em estilo**. Ele só
liga e desliga classes, atributos ou o `hidden`. O CSS cuida da aparência.

| Para… | Faça isso | Exemplo em JS |
| --- | --- | --- |
| Esconder ou mostrar qualquer coisa | atributo `hidden` | `el.hidden = true` |
| Abrir o menu no celular | `aria-expanded="true"` no `.topo__menu-botao` (ou classe `aberto` no `.topo`) | `botao.setAttribute('aria-expanded', 'true')` |
| Marcar o link da página atual | `aria-current="page"` ou classe `ativo` no `.topo__link` | o `NavLink` do React Router já faz isso sozinho |
| Marcar um chip de filtro | `aria-pressed="true"` no `.chip` | `chip.setAttribute('aria-pressed', 'true')` |
| Favoritar | `aria-pressed="true"` no `.botao-favorito` | idem |
| Marcar um campo com erro | classe `com-erro` na `.campo` **e** `aria-invalid="true"` no input | `campo.classList.add('com-erro')` |
| Mostrar a mensagem de erro do campo | tirar o `hidden` do `.campo__erro` | `erro.hidden = false` |
| Botão esperando a resposta da API | classe `carregando` (ou `aria-busy="true"`) e `disabled` | `botao.classList.add('carregando')` |
| Destacar um cartão escolhido | classe `selecionado` no `.card` | `card.classList.toggle('selecionado')` |
| Cartão indisponível | classe `indisponivel` no `.card` | |
| Abrir a janela modal | tirar o `hidden` do `.modal` e pôr `sem-rolagem` no `<body>` | `modal.hidden = false` |

No React é igual, só que declarado no JSX:

```jsx
<button className="chip" aria-pressed={filtro === 'foto'}>Fotografia</button>
<div className={erros.email ? 'campo com-erro' : 'campo'}>...</div>
<button className={enviando ? 'botao carregando' : 'botao'} disabled={enviando}>Enviar</button>
{aberto && <div className="modal">...</div>}
```

---

## 5. Componentes

Abaixo, a marcação mínima de cada componente. Para ver todos funcionando, use
a `vitrine.html`.

### Layout

| Classe | Uso |
| --- | --- |
| `.container` | centraliza o conteúdo com largura máxima e respiro lateral |
| `.container--leitura` | versão estreita, para texto e formulário |
| `.secao` / `.secao--alt` / `.secao--escura` | bloco com espaço em cima e embaixo; fundo alternado; fundo escuro (o texto clareia sozinho) |
| `.secao__cabecalho` (`--centro`) | título da seção com uma ação ao lado |
| `.grade` (`--2`, `--4`) | grade de cartões que ajusta o número de colunas sozinha |
| `.pilha` | empilha os filhos na vertical com espaço entre eles |
| `.linha` (`--entre`, `--centro`, `--fim`) | filhos lado a lado, quebrando linha |

### Tipografia

`.titulo-display` (nome grande da capa), `.titulo-pagina`, `.titulo-secao`,
`.titulo-secao--tracinho`, `.rotulo`, `.texto-destaque`, `.texto-apoio`,
`.texto-tenue`, `.preco`, `.citacao`.

### Topo

```html
<header class="topo">
  <div class="container topo__conteudo">
    <a class="topo__marca" href="/">Marca</a>
    <button class="topo__menu-botao" aria-expanded="false" aria-controls="menu">Menu</button>
    <nav class="topo__nav" id="menu" aria-label="Principal">
      <ul class="topo__lista">
        <li><a class="topo__link" href="#">Início</a></li>
      </ul>
    </nav>
  </div>
</header>
```

O botão de menu só aparece em telas de até 768px.

### Capa e destaque

```html
<section class="capa">
  <img class="capa__imagem" src="img/capa.jpg" alt="Descrição da foto">
  <div class="capa__conteudo">
    <h1 class="titulo-display">NOME</h1>
    <p class="capa__linha">Uma | Duas | Três</p>
  </div>
</section>
```

`.capa--compacta` deixa a capa mais baixa. Para texto de um lado e imagem do
outro, use `.destaque` com `.destaque__texto` e `.destaque__imagem`.

### Botões e links

```html
<button class="botao">Principal</button>
<button class="botao botao--contorno">Contorno</button>
<button class="botao botao--texto">Texto</button>
<button class="botao botao--perigo">Cancelar</button>
<button class="botao-favorito" aria-pressed="false">Salvar</button>
<button class="botao-icone" aria-label="Fechar">&times;</button>
<a class="link" href="#">Link de texto</a>
<a class="link-voltar" href="#">Voltar</a>
```

Modificadores: `.botao--pequeno` (mais compacto), `.botao--bloco` (largura
toda) e `.botao-favorito--icone` (só o ícone).

### Etiquetas, chips e busca

```html
<span class="tag tag--sucesso">Disponível</span>   <!-- --acento, --aviso, --erro -->

<div class="barra-filtros">
  <form class="busca" role="search">
    <label class="visualmente-oculto" for="busca">Buscar</label>
    <input id="busca" type="search" placeholder="Buscar">
    <button class="botao">Buscar</button>
  </form>
  <div class="chips" role="group" aria-label="Filtrar por tipo">
    <button class="chip" aria-pressed="true">Todas</button>
    <button class="chip" aria-pressed="false">Fotografia</button>
  </div>
</div>
<p class="contador">24 resultados</p>
```

### Cartão

```html
<article class="card">
  <img class="card__imagem" src="..." alt="...">
  <button class="botao-favorito botao-favorito--icone card__favorito" aria-pressed="false" aria-label="Salvar"></button>
  <div class="card__corpo">
    <p class="rotulo">Categoria</p>
    <h3 class="card__titulo"><a href="detalhe.html?id=1">Título</a></h3>
    <p class="card__texto">Descrição curta</p>
  </div>
  <footer class="card__rodape">
    <span class="texto-apoio">Informação de apoio</span>
    <strong class="preco">R$ 79</strong>
  </footer>
</article>
```

Todas as partes são opcionais. Se o título tiver um link, o cartão inteiro vira
clicável. Botões dentro de `.card__acoes` continuam clicáveis por cima dele.
Modificadores: `.card--clicavel`, `.card--centro`, `.selecionado`,
`.indisponivel` e `.esqueleto`.

### Formulário

```html
<form class="formulario" novalidate>
  <div class="formulario__grade">
    <div class="campo">
      <label class="campo__rotulo" for="email">E-mail <span class="obrigatorio">*</span></label>
      <input id="email" name="email" type="email" aria-describedby="email-erro">
      <p class="campo__erro" id="email-erro" hidden></p>
    </div>

    <fieldset class="campo campo--inteiro opcoes">
      <legend class="campo__rotulo">Frequência</legend>
      <label class="opcao"><input type="radio" name="frequencia" value="mensal"> Todo mês</label>
      <label class="opcao"><input type="radio" name="frequencia" value="bimestral"> A cada dois meses</label>
    </fieldset>
  </div>
  <div class="formulario__acoes">
    <button class="botao" type="submit">Enviar</button>
  </div>
</form>
```

Inputs, selects e textareas dentro de `.campo` são estilizados sozinhos, sem
classe. A grade tem duas colunas, e `.campo--inteiro` ocupa a linha toda. No
celular tudo vira uma coluna. Também estão disponíveis `.campo__ajuda` (texto de
ajuda), `.com-erro` e `.valido` (estados do campo) e `.opcoes--coluna` (opções
empilhadas).

### Tabela

```html
<div class="tabela-rolagem">
  <table class="tabela tabela--destaque">
    <thead><tr><th>Kit</th><th class="numero">Valor</th></tr></thead>
    <tbody><tr><td>Cozinha</td><td class="numero">R$ 79</td></tr></tbody>
  </table>
</div>
```

### Detalhe

```html
<div class="detalhe">
  <img class="detalhe__midia" src="..." alt="...">
  <div class="detalhe__info">
    <h1 class="titulo-pagina">Título</h1>
    <dl class="lista-dados">
      <div><dt>Ano</dt><dd>1856</dd></div>
    </dl>
  </div>
</div>
```

### Estados de carregamento, vazio e erro

```html
<div class="estado" role="status">
  <div class="spinner" aria-hidden="true"></div>
  <p>Carregando…</p>
</div>

<div class="estado">
  <p class="estado__titulo">Nada por aqui</p>
  <p>Nenhum resultado para essa busca.</p>
</div>

<div class="estado estado--erro" role="alert">
  <p class="estado__titulo">Não foi possível carregar</p>
  <button class="botao botao--contorno botao--pequeno">Tentar de novo</button>
</div>

<article class="card esqueleto" aria-hidden="true"></article>

<div class="alerta alerta--sucesso" role="status">Enviado.</div>   <!-- --erro, --aviso -->
<div class="toast toast--sucesso" role="status">Salvo.</div>        <!-- --erro -->
```

Dentro de uma `.grade`, o `.estado` ocupa a linha toda.

### Janela modal

```html
<div class="modal" hidden>
  <div class="modal__janela" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
    <button class="modal__fechar botao-icone" aria-label="Fechar">&times;</button>
    <h2 id="modal-titulo">Título</h2>
  </div>
</div>
```

Use `.modal__janela--estreita` para confirmações curtas. No celular, a janela
sobe do pé da tela.

### Paginação e rodapé

```html
<nav class="paginacao" aria-label="Paginação">
  <button class="botao botao--contorno botao--pequeno">Anterior</button>
  <span class="paginacao__info">Página 1 de 12</span>
  <button class="botao botao--contorno botao--pequeno">Próxima</button>
</nav>

<footer class="rodape">            <!-- ou "rodape rodape--escuro" -->
  <div class="container rodape__conteudo">...</div>
</footer>
```

### Utilitários

`.texto-centro`, `.largura-leitura`, `.margem-auto`, `.visualmente-oculto`
(some da tela, mas o leitor de tela lê) e `.pular-conteudo` (link de pular para
o conteúdo, visível só com o teclado).
