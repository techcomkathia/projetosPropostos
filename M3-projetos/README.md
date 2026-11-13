# M3 · Projetos

Material dos projetos do Módulo 3, no mesmo modelo dos projetos do Módulo 2:
briefing, especificação de comportamento, documentos de apoio e imagens de
referência. A diferença é que **o CSS vem pronto**: o aluno usa as classes e
gasta o tempo no JavaScript e no React.

O módulo tem duas unidades com projetos, cada uma na sua pasta:

- **M3U2 · Frontend dinâmico com JavaScript** (`M3-U2/`): DOM, eventos e
  formulários, arrays e funções de arrays, callbacks e arrow functions,
  desestruturação, rest e spread, módulos, Promises, `fetch`, JSON e consumo
  de API.
- **M3U3 · ReactJS** (`M3-U3/`): Vite e JSX, componentes, props, `useState`,
  `useEffect`, `useContext`, estilização, bibliotecas, formulários, eventos,
  React Router, build e deploy.

---

## Como usar este material

- **Os projetos estão ligados aos assuntos da ementa, não às aulas.** Nenhum
  README cita número de aula. Cada etapa do roteiro diz quais assuntos pratica
  (*Assuntos: Props · Eventos*), e as tabelas abaixo mostram onde cada assunto
  aparece. Assim, cada professor encaixa os projetos no próprio ritmo.
- **O professor escolhe** quais projetos desenvolver com a turma, se algum
  deles vira projeto guiado em aula e quais ficam como prática individual.
- **Sem critérios de avaliação**: os READMEs não trazem pesos nem notas. Cada
  professor define os seus.
- **Cada pasta é autossuficiente**: já traz o CSS, o guia das classes e tudo o
  que o aluno precisa (no Horizonte e no Raiz, também a vitrine dos
  componentes do estilo base). Basta subir o conteúdo da pasta como um
  repositório e passar o link para o fork.
- **Gabaritos** ficam fora daqui, na Área de Trabalho, e não vão para os
  repositórios dos alunos.

### Como os READMEs dos projetos estão organizados

Todos seguem a mesma ordem, a partir do modelo usado na U1
([landingpage-raiz-e-cia](https://github.com/dc-fullstack/landingpage-raiz-e-cia)):

1. **Título e apresentação**, com a imagem de referência principal.
2. **Antes de começar**: fork, ferramentas e o que ler primeiro.
3. **O briefing**: o pedido do cliente, em forma de história.
4. **O que o projeto precisa fazer**, apontando para o
   `comportamento-interativo.md`, que é a especificação.
5. **O que você recebe** (árvore de arquivos) e **o que você entrega**.
6. **Regras**.
7. **O que você vai desenvolver**, agrupado pelos assuntos da ementa.
8. **Roteiro sugerido**: etapas com os assuntos de cada uma.
9. **Evolução do projeto (opcional)**: extras para quem quiser continuar.
10. **Lista de entrega**: um checklist para o próprio aluno, sem peso.
11. **Publicação**, **Como fazer o fork** e **Fontes de consulta**, com a
    documentação em português sempre que ela existe.

### Bibliotecas: orientar, não proibir

- **Na U2**, os projetos são em JavaScript puro, porque o objetivo é praticar o
  DOM e o `fetch`. O README explica por que uma biblioteca de interface ou de
  requisição faria esse trabalho pelo aluno.
- **Na U3**, os projetos funcionam só com `react`, `react-dom` e, nos dois
  maiores, `react-router-dom` e `json-server`. O aluno **pode** instalar outras
  bibliotecas, desde que anote no README qual instalou e por quê, e que ela não
  faça o que o projeto quer exercitar. Por isso o README sugere `fetch` em vez
  de axios e evitar bibliotecas de formulário. Os READMEs avisam que nem toda
  biblioteca é vista em aula: quando o aluno escolhe uma, a documentação dela é
  o material de estudo.
- Os assuntos **Estilização de componentes** e **Utilização de bibliotecas**
  aparecem na **Evolução do projeto** de cada projeto da U3, como continuação:
  CSS Modules e tema próprio na estilização; `canvas-confetti`, `react-icons`,
  `react-toastify` e máscara de campo nas bibliotecas.

---

## Estilo base

- **Um arquivo**, `estilo-base.css`, com o tema Artesano como padrão e os temas
  Raiz e Horizonte ativados por `<html data-tema="…">`.
- Toda a aparência sai de **variáveis**. O aluno personaliza em um arquivo
  próprio, sem tocar no estilo base.
- **Estados por classe e atributo**: o JS e o React só ligam `hidden`,
  `aria-pressed`, `aria-expanded`, `aria-invalid`, `.com-erro`, `.carregando`
  etc. Isso reforça a regra "JS não escreve estilo" e já ensina acessibilidade
  de quebra.
- Compatível com o React sem ajuste: `NavLink` marca o link ativo com a classe
  `active`, e o CSS já entende essa classe.
- A vitrine (`vitrine/index.html`) mostra todos os componentes, com um seletor
  de tema. Cada projeto que usa o estilo tem a sua cópia.

Não existe uma pasta central do estilo: as cópias em
`M3-U2/M3U2-03.horizonte-acervo/css/` e `M3-U3/M3U3-04.raiz-e-cia/recursos/`
são idênticas. Se o CSS mudar, altere uma e copie para a outra.

---

## M3U2 · Frontend dinâmico com JavaScript

Projetos em JavaScript puro. O HTML e o CSS vêm prontos, e o aluno escreve só
o JS. Os três publicam no GitHub Pages.

| Pasta | O que é |
| --- | --- |
| `M3U2-01.medida-certa/` | atividade de entrada: conversor de medidas culinárias |
| `M3U2-02.nexo-literario/` | atividade: Home com carrossel por trimestre e linha do tempo, e cartões de planos, a partir de dados locais |
| `M3U2-03.horizonte-acervo/` | projeto desafio: acervo de arte com API pública, seleção salva e formulário |

### Assuntos da ementa em cada projeto

| Assunto | Medida Certa | Nexo Literário | Horizonte |
| --- | :---: | :---: | :---: |
| DOM: introdução e manipulação de elementos | ✔ | ✔ | ✔ |
| DOM: eventos e formulários | ✔ | eventos | ✔ |
| DOM: comunicação assíncrona | | | ✔ |
| Arrays e funções de arrays (`map`, `filter`, `forEach`) | ✔ | ✔ | ✔ |
| Função anônima e callback | ✔ | ✔ | ✔ |
| Arrow functions | ✔ | ✔ | ✔ |
| Desestruturação de objetos e arrays | ✔ | ✔ | ✔ |
| REST: parâmetros rest e spread | | ✔ | |
| REST: APIs RESTful | | | ✔ |
| Como aplicar módulos | | | ✔ |
| Promises e requisições assíncronas | | | ✔ |
| Requisições HTTP e tratamento de erros | | | ✔ |
| Arquivos JSON | | | ✔ |
| O que é uma API e consumo de API JSON | | | ✔ |

A ementa junta, no item "O que é REST", as APIs RESTful e os parâmetros rest
(`...`). Os dois aparecem: o parâmetro rest e o spread no Nexo (função
`criarElemento(tag, classe, ...filhos)` e `[...LIVROS]` para ordenar uma
cópia), e a API REST no Horizonte (recursos, parâmetros de consulta, códigos
de status).

### Atividade · Medida Certa (M3U2-01)

- **Tema**: conversor de medidas culinárias. A pessoa escolhe a medida e o
  ingrediente, digita a quantidade e vê o mesmo tanto em xícaras, colheres,
  ml e gramas, enquanto digita.
- **Escopo pequeno de propósito**: uma página, um script (`js/conversor.js`),
  sem `fetch` e sem botão de enviar. Bom para abrir a unidade.
- **Dados**: `dados/medidas.js`, com `UNIDADES` (5, com `ml`) e
  `INGREDIENTES` (14, com `gramasPorXicara`). Valores aproximados de tabelas
  brasileiras: revisar antes de entregar.
- **CSS próprio** (`css/medida-certa.css`), claro e escuro pelo sistema.
- **Assuntos**: DOM, eventos `input`/`change`/`click`, `find`/`filter`/
  `forEach` com callbacks e arrow functions, desestruturação do ingrediente
  escolhido.
- **Armadilhas de propósito**: `value` como texto, vírgula (`NaN`), campo
  vazio que vira `0`, `ml: null` em gramas, ponto flutuante, singular e
  plural, a medida escolhida aparecendo na tabela.
- **Evolução**: frações de cozinha ("1 ½"), xícaras desenhadas, ingrediente
  lembrado no `localStorage`, porções.
- **Gabarito** fora do repositório, em `Desktop/GABARITO-M3U2-01/`, testado
  no Chrome headless.

### Atividade · Nexo Literário (M3U2-02)

- **Tema**: clube de leitura por assinatura. A programação do ano vira, na
  Home (`index.html`), um carrossel por trimestre e uma linha do tempo; os
  planos viram cartões de preço em `planos.html`.
- **O aluno recebe** os dois HTMLs, o CSS próprio do projeto (`css/style.css`,
  com guia das classes) e os dados em `dados/livros.js` (`LIVROS`, 12 livros)
  e `dados/planos.js` (`PLANOS`). Escreve só o JS: `js/comum.js` (menu e
  funções comuns), `js/inicio.js` e `js/planos.js`.
- **Sem API e sem página de livro**: os dados são constantes globais. A busca
  por API fica para o Horizonte, e o Nexo volta na U3, em React, com os mesmos
  dados vindos do json-server. As capas ficam hospedadas no repositório
  `nexo-literario-imagens`.
- **Scripts comuns, sem módulos**: a ordem das tags `<script>` importa (dados,
  `comum.js`, script da página), o que prepara a conversa sobre módulos no
  Horizonte.
- **Assuntos em destaque**: funções de arrays, arrow functions, desestruturação
  (no corpo e no parâmetro das funções-componente), spread (`[...LIVROS]`) e
  parâmetro rest (`criarElemento(tag, classe, ...filhos)`, escrita na
  Etapa 1 e usada no projeto inteiro).
- **Etapas**: 1 (ponto de partida, menu e `criarElemento`), 2 (linha do
  tempo), 3 (carrossel com índice e resto da divisão), 4 (planos, contas em
  centavos), 5 (casos difíceis e acabamento).
- **Armadilhas de propósito**:
  - ordenar `LIVROS` sem copiar a lista;
  - capa, autor ou sinopse ausentes ou `null`, que não podem virar
    `undefined` na tela;
  - trimestre sem livros, que não vira slide;
  - desconto do Trimestral que dá R$ 199,21 ou R$ 199,22 conforme a conta é
    feita em reais ou em centavos (o certo é R$ 199,22);
  - lista vazia, que mostra o aviso da página.
- **Referências** em `referencias/`: Home e Planos em tela larga e no celular.
- **Sem gabarito** por enquanto.

### Projeto desafio · Horizonte Acervo (M3U2-03)

- **Tema**: a mostra Horizonte (do componente-hero do M2) abre o acervo de
  referência ao público: busca, filtro, paginação, detalhe em janela, seleção
  salva no `localStorage` e formulário de inscrição com validação.
- **API**: Cleveland Museum of Art Open Access, sem chave e com CORS liberado.
  Testada em 14/10/2026: busca, filtro por tipo, paginação, detalhe, 404 e
  imagens carregando no navegador.
  - Descartei a API do Art Institute of Chicago, que é mais conhecida, porque
    as imagens dela voltaram **403** nos testes.
- **O aluno recebe** o `index.html` pronto e escreve só o JS, em módulos.
- **Assíncrono em duas voltas**:
  - na **Etapa 2**, o JSON de exemplo é buscado com `fetch` + `.then`/`.catch`,
    para o aluno ver a `Promise` e a ordem de execução;
  - na **Etapa 4**, o envio simulado do formulário é uma `new Promise`;
  - na **Etapa 6**, a API de verdade entra com `async`/`await` e
    `try`/`catch`/`finally`, e o aluno reescreve a busca da Etapa 2 para
    comparar.
- **Tratamento de erros explícito**: o README tem a tabela "erro de rede
  rejeita / erro HTTP resolve com `response.ok` falso", o `throw new Error`
  para o 404 e o teste com o DevTools em modo offline.
- **REST**: a Etapa 6 apresenta recurso, endereço, parâmetros de consulta e
  códigos de status usando a própria API do museu.
- **Etapas**: 1 (menu e aviso), 2 (grade com JSON de exemplo), 3 (janela de
  detalhe), 4 (formulário), 5 (seleção e módulos), 6 (API de verdade),
  7 (componentes e acabamento).
- **Armadilhas de propósito** (todas reais, vindas da própria API):
  - obra sem autoria (`creators: []`);
  - descrição `null`;
  - descrição com tags HTML, o que justifica a regra de não usar `innerHTML`;
  - datas em texto ("c. 1900");
  - lista vazia que não é erro;
  - 404 que o `fetch` não rejeita.
- **Publicação**: GitHub Pages, que funciona porque é tudo estático.

---

## M3U3 · ReactJS

Projetos em React com Vite. O CSS vem pronto, e o aluno monta os componentes.
Os projetos vão do mais simples (props e `useState`) ao mais completo (rotas,
contexto, API e deploy).

| Pasta | O que é |
| --- | --- |
| `M3U3-01.jogo-de-dados/` | atividade de entrada: três dados e a soma |
| `M3U3-02.lista-de-tarefas/` | atividade de formulários: lista de tarefas com prioritárias no topo, sem `localStorage` |
| `M3U3-03.nexo-literario/` | projeto: o Nexo Literário completo em React, com API simulada |
| `M3U3-04.raiz-e-cia/` | projeto final: área do assinante da Raiz & Cia, com login, API simulada e deploy |

### Assuntos da ementa em cada projeto

| Assunto | Jogo de Dados | Lista de Tarefas | Nexo Literário | Raiz & Cia |
| --- | :---: | :---: | :---: | :---: |
| Apresentação do React · Bibliotecas e frameworks | ✔ | | | |
| Projeto inicial com JSX · Utilização do Vite | ✔ | ✔ | ✔ | ✔ |
| Componentes funcionais · Componentização e reutilização | ✔ | ✔ | ✔ | ✔ |
| Props | ✔ | ✔ | ✔ | ✔ |
| Hooks: `useState` | ✔ | ✔ | ✔ | ✔ |
| Hooks: `useEffect` | | | ✔ | ✔ |
| Hooks: `useContext` | | | ✔ | ✔ |
| Estilização de componentes | evolução | evolução | evolução | evolução |
| Utilização de bibliotecas | evolução | evolução | ✔ + evolução | ✔ + evolução |
| Formulários | | ✔ | ✔ | ✔ |
| Eventos (`onClick`, `onChange`…) | ✔ | ✔ | ✔ | ✔ |
| React Router DOM | | | ✔ | ✔ |
| Build | ✔ | ✔ | ✔ | ✔ |
| Deploy | ✔ | ✔ | evolução | ✔ |

"Apresentação do React" e "Bibliotecas e frameworks" estão no
`docs/01-entendendo-o-react.md` do Jogo de Dados (seção 1): o que muda do JS
puro para o React, biblioteca × framework e o papel do Vite. No Nexo e no Raiz,
"Utilização de bibliotecas" já acontece na Etapa 0, com a instalação do React
Router e do json-server.

### Atividade · Jogo de Dados (M3U3-01)

- **Tema**: três dados na tela e a soma deles. A cada clique em "Rolar os
  dados", cada dado sorteia uma face de 1 a 6; um contador mostra quantas
  rolagens já foram feitas.
- **Objetivo**: primeiro contato com React. Só componentes, props e
  `useState`, com `Math.random` para o sorteio. Sem rotas, sem efeitos, sem
  API.
- **Explicação dentro do projeto**: `docs/01-entendendo-o-react.md` explica o
  que muda do JS puro para o React, biblioteca × framework, o Vite,
  componentes, JSX, props (inclusive de função), `useState`, `Math.random`,
  estado derivado, `map` com `key` e ternário. Os exemplos são de um cara ou
  coroa, para o aluno aplicar a ideia nos dados em vez de copiar.
- **Componentes**: `App` (único com estado: `valores` e `rolagens`), `Dado`
  (`valor`), `Soma` (`total`, `jaRolou`), `BotaoRolar` (`aoRolar`) e
  `Rolagens` (`quantidade`). A soma é calculada, não é estado.
- **CSS pronto** (`recursos/estilo.css`): visual de videogame 8 bits dos anos
  80 (sem copiar nenhum jogo nem marca): fundo de TV de tubo com linhas de
  varredura, título em faixas de cor, painel preto quadriculado, dados com
  contorno e sombra dura, pontos quadrados (o do 1 vermelho), soma em pixel e
  animações em degraus. Fontes Press Start 2P e VT323 via `@import`. O desenho
  de cada face sai da classe `dado--1` a `dado--6` mais o número certo de
  `<span className="dado__ponto">`; o aluno não posiciona pontos.
- **Etapas**: 0 (Vite), 1 (`Dado` com prop), 2 (as outras peças com valores
  fixos), 3 (estado e sorteio), 4 (conferir, build e publicação).
- **Evolução**: trinca, animação a cada rolagem com `key`, recorde, quantidade
  de dados, recomeçar, `Dado.module.css` (estilização) e `canvas-confetti` na
  trinca (biblioteca).
- **Referências**: geradas no Chrome headless com o mesmo CSS. Uma solução
  de teste montada pelo roteiro (Vite 8, React 19) rendeu a mesma tela, e 200
  cliques conferidos deram soma e pontos certos, com as seis faces aparecendo.
- **Sem gabarito** por enquanto.

### Atividade · Lista de Tarefas (M3U3-02)

- **Tema**: lista de tarefas com formulário (descrição, categoria, prazo e o
  interruptor "Prioritária"). **Prioritárias entram no topo e aparecem em
  coral; as outras entram no fim.** Concluir risca a tarefa; o "×" exclui.
- **Assuntos em destaque**: formulários e eventos.
- **Só `useState`**: sem `useEffect` e sem `localStorage`, de propósito. O
  README explica que a lista some ao recarregar e que guardar dados é assunto
  da API, mais adiante.
- **Explicação dentro do projeto**: `docs/01-entendendo-formularios.md` cobre
  campo controlado, estado-objeto com `onChange` único pelo `name`, checkbox
  com `checked`, `select`, data, número como texto, valores calculados,
  `onSubmit` + `preventDefault` + `noValidate`, objeto de erros com
  `aria-invalid`/`aria-describedby`, voltar ao estado inicial, incluir no
  começo ou no fim, `map`, `filter`, `crypto.randomUUID()` e por que a `key` é
  o `id`. Os exemplos são de uma lista de compras.
- **Componentes**: `App` (`tarefas`), `Resumo`, `FormularioTarefa` (`campos`,
  `erros`, avisa o `App` por `aoAdicionar`), `ListaTarefas` e `ItemTarefa`.
- **CSS pronto**: papel pontilhado, cartões, etiquetas por categoria,
  interruptor feito sobre um checkbox real, caixinha de concluir em círculo,
  lista vazia com bloquinho desenhado em CSS, entrada animada da tarefa nova
  (só a nova anima quando a `key` é o `id`). Inclui `tarefa__prazo--atrasado`
  para a evolução.
- **Evolução**: filtro, limpar concluídas, prazo atrasado, concluídas descem,
  editar, cor por categoria com CSS Modules (estilização) e `react-icons`
  (biblioteca).
- **Testado**: uma solução montada só pelos documentos (Vite 8, React 19)
  passou em 29 verificações automáticas no Chrome headless (botão desativado,
  três mensagens de erro, `aria-*`, correção que limpa só o próprio erro,
  ordem prioritária/normal, formulário voltando ao começo, concluir, excluir,
  resumo com singular e plural, contador em alerta, console limpo). A tela ao
  abrir ficou igual à referência.
- **Gabarito** fora do repositório, em `Desktop/GABARITO-M3U3-02/`, pronto
  para publicar (README com Vercel, Netlify e GitHub Pages).

### Projeto · Nexo Literário em React (M3U3-03)

- **Tema**: o site completo do Nexo Literário: Início (carrossel por trimestre
  e linha do tempo), O Clube (pilares, encontros, histórico com notas e os
  planos com o cartão do M3U2-02 mais um botão "Assinar"), página de cada
  livro (`/livros/:identificador`, com anterior e próximo), Assinar
  (formulário controlado, `POST /assinaturas`) e 404.
- **Ponte com a U2**: o README tem uma tabela que mostra cada função-componente
  do M3U2-02 virando um componente React. As funções de formatação e de
  cálculo podem ser copiadas para `src/utils/`.
- **API**: json-server 0.17.4 na porta 3001, com `VITE_API_URL`. O README e o
  guia da API deixam claro que a API de verdade será construída no M4, com as
  mesmas rotas. Os dados do cartão nunca vão para a API.
- **Hooks com uso real**: `useState` (carrossel, menu, formulário),
  `useEffect` (busca no contexto e na página do livro, que depende do
  identificador), `useContext` (`ClubeContext` com livros e planos, usados por
  quatro telas), `useParams` e `useSearchParams` (plano escolhido na URL).
- **Recursos prontos**: `style.css` (o mesmo do M3U2-02 com um bloco novo no
  fim: link ativo, erro por campo, falha no envio, botão desativado e o botão
  "Assinar" nos cartões de plano) e `Icones.jsx`. As capas e a foto da
  abertura ficam hospedadas no repositório `nexo-literario-imagens`, como no
  M3U2-02; o `db.json` traz o link completo.
- **Build obrigatório, deploy opcional**: a última etapa pede
  `npm run build` + `npm run preview`. Publicar (frontend e API no Render, como
  no Raiz) está na evolução, porque a API só roda local até o M4.
- **Etapas**: 0 (montar), 1 (componentes estáticos), 2 (estado), 3
  (formulário), 4 (API), 5 (rotas), 6 (enviar a assinatura), 7 (contexto como
  refatoração das buscas repetidas), 8 (acabamento, build e documentação).
- **Evolução**: título da aba, CPF real, máscaras, e-mail repetido, teclado no
  carrossel, filtro na URL, `react-toastify` (biblioteca), CSS Modules na
  página do livro (estilização) e publicação.
- **Armadilhas de propósito**: `paginas` e `nota` `null`; livro não
  encontrado é lista vazia (200), não 404; trimestre sem livro não vira slide;
  forma de pagamento que precisa voltar para cartão no parcelado; estado
  derivado (resumo) que não deve virar `useState`.
- **Sem gabarito** por enquanto.

### Projeto final · Raiz & Cia Área do assinante (M3U3-04)

- **Tema**: continuação da landing page Raiz & Cia do M2.
- **Telas**: catálogo com filtros na URL, página do kit, cadastro e login,
  assinatura com ViaCEP e a área do assinante com pausar, retomar, trocar e
  cancelar.
- **API**: `json-server@0.17.4` com o `api/db.json` (8 kits, 2 usuários, 2
  assinaturas). Testei todas as rotas e filtros citados na documentação.
  - A versão está **fixada de propósito**: o json-server 1.0 tem outra sintaxe
    de filtros, e muitos tutoriais na internet misturam as duas.
- **Orientações**:
  - chamadas com `fetch` e `async`/`await` (axios não é proibido, mas o README
    explica por que o `fetch` faz parte do exercício);
  - sem hooks próprios;
  - hooks usados: `useState`, `useEffect`, `useContext` e os do React Router.
- **Ponte com o M4**: as rotas e o formato dos dados foram pensados para virar
  a API Express do M4 (tabelas `kits`, `usuarios` e `assinaturas`, com chaves
  estrangeiras). O login é simulado e inseguro de propósito, com aviso
  explícito no README e no guia da API. O M4U4 corrige com hash e JWT.
- **Armadilhas de propósito**:
  - POST sem `Content-Type`, que grava lixo sem dar erro;
  - `"erro": "true"` do ViaCEP vem como texto;
  - PATCH devolve a assinatura sem o `kit` expandido;
  - 404 do kit é diferente de erro de rede;
  - recarregar uma rota na Vercel sem o `vercel.json`.
- **Evolução**: busca enquanto digita, resumo do pedido, tema escuro, editar
  endereço, paginação, máscara de campo com biblioteca e tema próprio com
  `meu-tema.css` e CSS Modules (estilização).
- **Documentação do aluno**: a entrega inclui reescrever o README no modelo da
  seção "Documentação do seu projeto".
- **Publicação**: build conferido com `npm run preview`, frontend na Vercel ou
  Netlify, API no Render, ou um vídeo de até 3 minutos se não der para
  publicar a API.

---

## Documentação para publicação

Os READMEs indicam a documentação em português quando ela existe, e avisam
quando não existe:

| Para | Em português | Só em inglês |
| --- | --- | --- |
| GitHub Pages (U2 e opção na U3) | [criar um site](https://docs.github.com/pt/pages/getting-started-with-github-pages/creating-a-github-pages-site), [publicar com fluxo de trabalho](https://docs.github.com/pt/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) | |
| Fork | [criar fork de um repositório](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) | |
| React | [pt-br.react.dev](https://pt-br.react.dev/learn) (algumas páginas ainda em inglês) | |
| Vite (build e deploy) | | [static deploy](https://vite.dev/guide/static-deploy) |
| Vercel, Netlify, Render | | [Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Netlify](https://docs.netlify.com/frameworks/vite/), [Render](https://render.com/docs/web-services) |

---

## Próximos passos

- **Agente tutor do módulo**: um agente por módulo (não por unidade), em que o
  aluno informa o projeto e o agente conduz a construção e o entendimento, sem
  entregar o código, no nível da ementa e com base nos assuntos anteriores
  (lógica com JS, HTML e CSS). As regras dos projetos já citam "o prompt da
  unidade"; quando o agente existir, vale trocar essa expressão pelo nome e o
  link dele nos sete READMEs.
