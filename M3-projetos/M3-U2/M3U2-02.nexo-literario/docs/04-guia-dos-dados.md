# Guia dos dados · Nexo Literário

Neste projeto, os dados já estão dentro do repositório, em dois arquivos
JavaScript. Não há servidor nem `fetch`: o foco é transformar listas de
objetos em interface.

## 1. Os arquivos

| Arquivo | Constante | Usada em |
| --- | --- | --- |
| `dados/livros.js` | `LIVROS` | Home (`index.html`) |
| `dados/planos.js` | `PLANOS` | Planos (`planos.html`) |

Cada arquivo tem uma única constante, com uma lista de objetos escrita no
formato JSON: chaves entre aspas, textos entre aspas, números sem aspas,
`true`/`false` e `null`.

```js
const LIVROS = [
  {
    "id": 1,
    "titulo": "A Cabeça do Santo",
    "mes": 1,
    ...
  },
  ...
];
```

O formato de cada campo e as contas dos planos estão em
`02-dados-e-calculos.md`.

## 2. Como os dados chegam ao seu código

Os HTMLs carregam os scripts nesta ordem:

```html
<!-- index.html -->
<script src="dados/livros.js"></script>   <!-- 1. cria a constante LIVROS -->
<script src="js/comum.js"></script>       <!-- 2. funções das duas páginas -->
<script src="js/inicio.js"></script>      <!-- 3. o seu código da Home -->
```

Scripts comuns (sem `type="module"`) compartilham o mesmo espaço de nomes. Por
isso, quando `inicio.js` roda, `LIVROS` e as funções de `comum.js` já existem e
podem ser usadas direto. **A ordem importa**: se `inicio.js` viesse antes de
`dados/livros.js`, o navegador avisaria que `LIVROS` não está definida.

Antes de programar, confira no console do navegador (F12 › Console): digite
`LIVROS` e aperte Enter. A lista com os 12 livros deve aparecer.

## 3. Regras para os dados

- **Leia, não copie.** Use `LIVROS` e `PLANOS` direto. Não cole as listas
  dentro dos seus scripts.
- **Não altere a constante.** Para ordenar, faça uma cópia antes:
  `[...LIVROS].sort(...)`. O `sort` muda o array original.
- **Não edite os dados para fazer funcionar.** Se um livro sem capa quebra a
  página, o problema está no código, não no dado.

## 4. As imagens

As capas e a foto da abertura não ficam no projeto: estão hospedadas no
GitHub, e o campo `capa` já traz o link completo:

```
https://raw.githubusercontent.com/techcomkathia/nexo-literario-imagens/main/img/03_captaes_da_areia.jpg
```

Use esse link direto no `src` da `<img>`. Por isso, as capas só aparecem com
internet.

## 5. Testar os casos difíceis

Faça cada teste, confira a tela e **desfaça a alteração** depois.

- **Lista vazia**: troque o conteúdo de `dados/livros.js` por
  `const LIVROS = [];`. A Home deve mostrar só o aviso de que não há livros.
  Faça o mesmo com `PLANOS`.
- **Capa ausente**: apague o campo `capa` de um livro, ou troque por `""`.
  Deve aparecer o marcador "Capa indisponível".
- **Campos ausentes**: apague a `sinopse` de um livro e troque o `autor` de
  outro por `null`. Nenhum `undefined` ou `null` pode aparecer na tela.
- **Trimestre sem livros**: apague os livros de outubro a dezembro. O
  carrossel deve ficar com três slides.

## 6. E depois?

Em projetos reais, os dados não ficam dentro do site: vêm de uma **API**,
buscados com `fetch`. Você vai fazer isso no próximo projeto da unidade, com a
API de um museu, e o Nexo Literário volta na próxima unidade, em React,
buscando estes mesmos dados de uma API.

Se o seu código estiver organizado em funções que **recebem a lista** (por
exemplo, `montarHome(livros)`), essa troca vai ser simples: em vez de passar
`LIVROS`, você vai passar a lista que chegou da API.
