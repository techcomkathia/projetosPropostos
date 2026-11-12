# Gabarito · Nexo Literário

Solução de referência do projeto `projeto-nexo-literario/`. **Não vai para o
repositório dos alunos.**

## Escopo M3-U2: Home e Planos

`index.html`, `planos.html` e `css/style.css` são idênticos aos do projeto. A
solução está nestes três scripts:

| Arquivo | O que resolve |
| --- | --- |
| `js/comum.js` | `ENDERECO_DA_API`, `buscarColecao()` (fetch + `response.ok` + checagem de array), `criarElemento()` com `textContent`, `criarControleDeEstados()` e menu do celular |
| `js/inicio.js` | `GET /livros`, ordenação por `mes` numa cópia do array, mês por extenso com `Intl`, capa indisponível, autor/categoria/sinopse opcionais, tentar novamente |
| `js/planos.js` | `GET /planos`, contas em centavos, `emReais()`, destaque só com `destaque === true`, benefícios em `<li>`, tentar novamente |

Nenhum dado da API entra por `innerHTML`, e não há arrays locais de livros ou
planos.

### Para rodar

1. Em `api/`: `npx json-server@0.17.4 db.json` (API em `http://localhost:3000`).
2. Abra a raiz do gabarito com o Live Server.

O `api/db.json` é o mesmo do projeto: `livros` (12 itens com todos os campos,
inclusive os que serão usados na M3-U3) e `planos` (3 itens).

### Valores esperados em Planos

| Plano | Parcela | Total | Desconto | À vista |
| --- | ---: | ---: | ---: | ---: |
| Trimestral | R$ 69,90 | R$ 209,70 | R$ 10,48 (5%) | R$ 199,22 |
| Semestral (destaque) | R$ 64,90 | R$ 389,40 | R$ 38,94 (10%) | R$ 350,46 |
| Anual | R$ 59,90 | R$ 718,80 | R$ 107,82 (15%) | R$ 610,98 |

### Como foi verificado

Com o Chrome headless, contra o JSON Server:

- sucesso: 12 cartões na Home (Janeiro → Dezembro) e 3 em Planos, com os
  valores acima;
- API desligada: só o bloco de erro visível nas duas páginas;
- `{ "livros": [], "planos": [] }`: só o bloco de lista vazia;
- livro sem `capa`, sem `sinopse` e com `sinopse: null`: marcador "Capa
  indisponível", parágrafo omitido e nenhum `undefined`/`null` na tela.

O botão "Tentar novamente" chama a mesma função de carga, mas não foi clicado
de forma automatizada. Para conferir manualmente, abra a página com a API
desligada, ligue a API e clique no botão.

## Legado (fora do escopo da M3-U2)

`clube.html`, `assinar.html` e `livro.html` são a solução da versão anterior do
projeto, mantida como referência para a M3-U3. Os scripts dessas páginas
foram movidos para `js/legado/` (as tags `<script>` já apontam para lá). O
`livro.js` legado usa `GET /livros/{id}`, que o `api/db.json` continua
atendendo; rode o JSON Server a partir de `api/`. A Home antiga (carrossel e
linha do tempo) foi substituída; `js/legado/inicio.js` ficou só para consulta.
As notas abaixo descrevem essa solução antiga.

### Uma página só para os livros

Em vez de 12 páginas `livro-*.html` (uma por livro, com o id em
`data-livro`), o gabarito usa **uma única** `livro.html`. O livro vem do
endereço: `livro.html?livro=capitaes-da-areia`.

- `enderecoDoLivro()` (`js/legado/comum.js`) monta esse endereço para todos os links
  "Ver detalhes".
- `livro.js` lê o `?livro=` com `URLSearchParams`, acha o livro na lista
  local para saber o `id` e chama `GET /livros/{id}`. Sem `?livro=` ou com um
  identificador que não existe, mostra "Livro não encontrado" sem chamar a API.
- O título da aba (`document.title`) e os links de anterior e próximo
  (`#livro-navegacao`) também são feitos pelo JS.

### A API

O `livro.js` espera duas rotas, no mesmo formato do `js/livros.js`:

- `GET /livros/{id}`: um livro, ou **404** se o id não existe;
- `GET /livros`: a lista (só usada no desafio extra).

Um `json-server` com `{ "livros": [ …o array do livros.js… ] }` atende
exatamente essas rotas. Precisa ter **CORS liberado** (o json-server já
libera).

O gabarito foi testado com uma API simulada local nesse formato: livro
carregado, 404 e API fora do ar (capturas em `referencias/` do projeto).

### Alinhado ao enunciado

- **Estrelas**: `clube.js` usa o atributo `opacity` do SVG (sem `style`),
  arredondado para duas casas (4.8 − 4 dá 0.7999… em ponto flutuante).
- **Tabela de preços**: `planos.js` monta tudo com `createElement`; o
  `innerHTML` fica só para os ícones SVG fixos. Cabeçalho e abas são criados
  uma vez; cada troca de aba redesenha só a `.precos__grade`.

### Arquivos que vieram do projeto

`index.html`, `clube.html`, `assinar.html` e `js/livros.js` são cópias do
projeto. `livro.html` foi feita a partir de uma das páginas de livro do projeto. O antigo `db.json` (só `livros`) foi substituído por `api/db.json`.
