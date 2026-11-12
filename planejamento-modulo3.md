# Módulo 03 — Programação frontend com JavaScript

**Etapa 1: conteúdo de cada aula** (rascunho para refinar)

| Unidade | Tema | Aulas | Carga |
|---|---|---|---|
| M3U1 | Lógica de programação com JS | 7 | 21h |
| M3U2 | Frontend dinâmico com JS | 7 | 21h |
| M3U3 | ReactJS | 9 | 27h |

---

## Como cada aula de 3h é organizada

São 2h45 de aula útil, divididas em **dois ciclos** de conceito → exemplo → atividade, com o intervalo entre eles:

| Tempo | Bloco |
|---|---|
| 0:00 – 0:15 | Abertura: revisão rápida da aula anterior e dúvidas da atividade |
| 0:15 – 0:50 | **Ciclo 1**: conceito teórico + exemplo de código ao vivo |
| 0:50 – 1:25 | **Ciclo 1**: atividade |
| 1:25 – 1:40 | *Intervalo* |
| 1:40 – 2:10 | **Ciclo 2**: conceito teórico + exemplo de código ao vivo |
| 2:10 – 2:50 | **Ciclo 2**: atividade (na U2 e U3, este é o incremento do projeto guiado) |
| 2:50 – 3:00 | Fechamento: o que foi visto e o que vem na próxima aula |

Na U2 e na U3, o ciclo 2 de cada aula termina com o aluno **adicionando uma parte nova ao projeto guiado**. É isso que faz o aluno sentir que está construindo uma aplicação aula a aula.

---

## Linha condutora dos projetos (proposta)

```
M3U2 (JS puro)            M3U3 (React)                 M4 (Backend)
Projeto guiado v1   ──▶   mesmo projeto em React  ──▶  API Express substitui o json-server
consome json-server       consome json-server          (mesmas rotas, mesmo formato de dados)
```

- **Projeto guiado:** é **um único domínio** que atravessa as duas unidades. Na U2, o aluno constrói a versão em JS puro. Na U3, ele reconstrói a mesma aplicação em React e percebe na prática o que o React resolve (estado, re-renderização, componentes). No M4, o json-server sai e entra a API que o próprio aluno construiu. A grade já prevê essa ligação: a U3 deve "conectar com a API desenvolvida nos módulos de backend".
- **Projeto desafio U2 · Horizonte Acervo:** aplicação em JS puro que consome a API do Cleveland Museum of Art. É apresentado na aula 3 e entregue no fim da unidade. Material em `M3-projetos/desafio-u2-horizonte-acervo/`.
- **Projeto final U3 · Raiz & Cia Área do assinante:** aplicação em React com json-server e ViaCEP, com documentação completa no modelo do M2. É apresentado na aula 2 e entregue/apresentado na aula 9. Material em `M3-projetos/projeto-final-u3-raiz-e-cia/`.
- **Estilo base:** um CSS único com os três temas do M2 (Artesano, Raiz e Horizonte), entregue pronto aos alunos. Fica em `M3-projetos/estilo-base/`.

> **Sugestão de domínio para o projeto guiado** (só para dar forma ao exemplo, ajuste ao que será usado no M4): **"EventHub"**, um app de eventos com listagem, busca/filtro, página de detalhe, inscrição via formulário, favoritos e login. Ele rende bem no M4U1, que pede tabelas relacionadas: `users`, `events` e `registrations`.

---

## M3U1 — Lógica de programação com JS (7 aulas)

Atividades **independentes**, sem ligação entre si. Os exercícios rodam no console do navegador ou no Node, pelo terminal.

### Aula 1 — Primeiros passos com JavaScript
- **Ciclo 1:** O que é JS e onde ele roda (navegador). Ligar o script ao HTML (`<script src>` e `defer`). `console.log` e DevTools. Comentários.
- **Ciclo 2:** Variáveis (`let`, `const` e por que evitar `var`). Tipos primitivos (string, number, boolean, null, undefined). `typeof`. Operadores aritméticos e de atribuição. Template literals.
- *Tema da atividade:* calculadoras simples (IMC, conversão de temperatura, gorjeta).

### Aula 2 — Decisões
- **Ciclo 1:** Operadores de comparação (`==` vs `===`) e lógicos (`&&`, `||`, `!`). Conversão de tipos (`Number()`, `String()`, `parseInt`). Valores truthy e falsy.
- **Ciclo 2:** `if` / `else if` / `else`, `switch` e operador ternário.
- *Tema da atividade:* classificador de notas, verificação de idade/ingresso, calculadora de frete por região.

### Aula 3 — Repetição
- **Ciclo 1:** `for`, `while` e `do...while`. Contadores e acumuladores. `break` e `continue`.
- **Ciclo 2:** Depuração: breakpoints no DevTools e leitura de mensagens de erro. Objeto `Math` (`random`, `floor`, `round`).
- *Tema da atividade:* tabuada, jogo de adivinhação, soma de pares, padrões com asteriscos.

### Aula 4 — Funções
- **Ciclo 1:** Declaração, parâmetros, argumentos, `return`, valores padrão. Escopo (global, de função e de bloco).
- **Ciclo 2:** Arrow functions. Funções como valores: passar uma função como argumento (introdução a callbacks, que prepara `map`/`filter` e eventos). Boas práticas de nomeação e funções pequenas.
- *Tema da atividade:* refatorar exercícios das aulas 1 a 3 em funções reutilizáveis.

### Aula 5 — Arrays e strings
- **Ciclo 1:** Criação, índices e `length`. `push`, `pop`, `shift`, `unshift`, `includes`, `indexOf` e `slice`. Percorrer com `for` e `for...of`. Métodos de string (`toUpperCase`, `trim`, `split`, `join`, `includes`, `replace`).
- **Ciclo 2:** Métodos de alta ordem: `forEach`, `map`, `filter` e `find`.
- *Tema da atividade:* lista de compras, filtrar números, formatar nomes, contar palavras.

### Aula 6 — Objetos e manipulação de dados
- **Ciclo 1:** Objetos: propriedades, acesso por ponto e por colchete, métodos, objetos aninhados. Arrays de objetos.
- **Ciclo 2:** Desestruturação, spread/rest, `reduce`. JSON: formato, `JSON.stringify` e `JSON.parse`. Com isso o aluno já trabalha dados no mesmo formato que uma API devolve.
- *Tema da atividade:* carrinho de compras (total com `reduce`), catálogo de produtos com filtro por categoria, ranking.

### Aula 7 — Síncrono vs assíncrono e primeira API
- **Ciclo 1:** Código síncrono vs assíncrono. Call stack e event loop (de forma visual e simplificada). `setTimeout`, callbacks, Promises (`then`/`catch`).
- **Ciclo 2:** `async`/`await` e `try`/`catch`. O que é uma API REST e o formato JSON. Primeiro `fetch` com GET, mostrando o resultado no console.
- *Tema da atividade:* buscar endereço por CEP (ViaCEP), dados de um Pokémon (PokéAPI), conselho aleatório.

> ⚠️ A aula 7 é a mais densa da unidade. A U2 retoma `fetch` com profundidade (aula 6), então aqui o objetivo é só o **primeiro contato**.

---

## M3U2 — Frontend dinâmico com JS (7 aulas)

O ciclo 2 de cada aula gera um **incremento no projeto guiado** (versão JS puro).

### Aula 1 — DOM: selecionar e modificar
- **Ciclo 1:** O que é o DOM (a árvore de nós). `querySelector`, `querySelectorAll` e `getElementById`. `textContent` vs `innerHTML`, incluindo o risco de XSS com dados externos.
- **Ciclo 2:** Atributos, `classList` (`add`, `remove`, `toggle`) e `style`.
- *Exercício extra:* aplicar no portfólio do M2 (menu mobile, modo escuro). Isso atende à grade: "aplicar manipulação de DOM nas páginas construídas nos módulos anteriores".
- **Projeto guiado:** estrutura HTML/CSS base da aplicação, com o primeiro script ligando elementos estáticos.

### Aula 2 — Eventos e criação de elementos
- **Ciclo 1:** `addEventListener` com os eventos `click`, `input`, `change`, `keydown` e `submit`. O objeto `event`, `preventDefault` e `event.target`.
- **Ciclo 2:** `createElement`, `append`, `remove` . Delegação de eventos.
- **Projeto guiado:** botões interativos (favoritar, abrir/fechar detalhes) e um modal.

### Aula 3 — Renderização a partir de dados *(aula-chave para preparar o React)*
- **Ciclo 1:** Modelo mental **estado → render**: um array de objetos é a "fonte da verdade" e uma função `render()` gera o HTML. Funções-template que retornam markup.
- **Ciclo 2:** Busca e filtros com `filter` e o evento `input`. Ordenação. Re-renderizar quando o estado muda.
- **Projeto guiado:** listagem dinâmica de itens a partir de um array local, com busca e filtro por categoria.
- 📌 **Apresentação do projeto desafio da U2.**

### Aula 4 — Formulários e validação
- **Ciclo 1:** Evento `submit`, `FormData` e leitura de campos. Validação nativa do HTML5 (`required`, `type`, `min`, `pattern`) e a Constraint Validation API.
- **Ciclo 2:** Validação personalizada em JS. Regex básico (e-mail, telefone). Mensagens de erro acessíveis (`aria-invalid`, `aria-describedby`) e feedback visual.
- **Projeto guiado:** formulário de cadastro/inscrição validado, que adiciona itens ao estado.

### Aula 5 — Persistência e organização do código
- **Ciclo 1:** `localStorage` e `sessionStorage`, com `JSON.stringify`/`parse` para salvar o estado.
- **Ciclo 2:** Módulos ES (`import`/`export`, `type="module"`). Separar o código em arquivos (`api.js`, `render.js`, `storage.js` e `main.js`).
- **Projeto guiado:** favoritos persistidos e código reorganizado em módulos.

### Aula 6 — Consumo de API completo
- **Ciclo 1:** Introdução ao npm e ao `npx json-server` (API fake local). Verbos HTTP (GET, POST, PUT/PATCH, DELETE), status codes, headers e body. Como ler a documentação de uma API.
- **Ciclo 2:** `fetch` com `method`, `headers` e `body`. Estados de **carregando / erro / vazio** na interface. Tratamento de erros (`response.ok`).
- **Projeto guiado:** o array local é trocado pelo json-server, e o CRUD passa a funcionar via API.

### Aula 7 — Componentização sem framework e ponte para o React
- **Ciclo 1:** O que é um componente: uma função que recebe dados ("props") e devolve UI. Reutilização e composição (Card, Lista, Modal, Formulário).
- **Ciclo 2:** As limitações da abordagem manual: sincronizar o DOM com o estado, re-renderizar tudo, eventos perdidos. Mostrar o mesmo componente em JS puro e em React, lado a lado, para motivar a U3.
- **Projeto guiado:** refatorar a aplicação em componentes-função e entregar a versão final da U2.
- 📌 **Entrega do projeto desafio da U2.**

---

## M3U3 — ReactJS (9 aulas)

O projeto guiado é **reconstruído em React**, com o mesmo domínio e o mesmo json-server.

### Aula 1 — Fundamentos do React
- **Ciclo 1:** SPA vs MPA, o que o React resolve (retomando a aula 7 da U2), DOM virtual de forma conceitual. Criar o projeto com Vite e entender a estrutura de pastas.
- **Ciclo 2:** JSX e suas regras (um elemento raiz, `className`, expressões `{}`). Componentes funcionais, props, `children` e composição.
- **Projeto guiado:** setup com Vite e layout estático em componentes (Header, Card, Footer).

### Aula 2 — Listas, condicionais e estilo
- **Ciclo 1:** Renderizar listas com `map` e `key`. Renderização condicional (`&&`, ternário, retorno antecipado).
- **Ciclo 2:** Estilização no React: CSS global, CSS Modules e/ou a biblioteca CSS usada no M2U2. Eventos no React (`onClick`, `onChange`).
- **Projeto guiado:** listagem renderizada a partir de um array mockado.
- 📌 **Apresentação do projeto final (desafio) da U3.**

### Aula 3 — Estado com useState
- **Ciclo 1:** `useState` e como uma atualização de estado provoca um novo render. Imutabilidade: atualizar arrays e objetos com spread, `map` e `filter`.
- **Ciclo 2:** Fluxo de dados unidirecional. Elevar o estado (lifting state up) e passar funções como props.
- **Projeto guiado:** favoritar, busca e filtro com estado.

### Aula 4 — Formulários controlados
- **Ciclo 1:** Inputs controlados (`value` + `onChange`) e um único estado-objeto para o formulário. Submit.
- **Ciclo 2:** Validação no React, mensagens de erro e desabilitar o botão enquanto o formulário estiver inválido. Opcional: apresentar o React Hook Form.
- **Projeto guiado:** formulário de cadastro/inscrição.

### Aula 5 — Efeitos e busca de dados
- **Ciclo 1:** `useEffect`: quando roda, array de dependências, cleanup e erros comuns (loop infinito).
- **Ciclo 2:** Buscar dados da API com `fetch` dentro do `useEffect`, usando uma função assíncrona declarada dentro do efeito, já que o callback do `useEffect` não pode ser `async`. Estados de loading/erro/vazio. Variáveis de ambiente (`VITE_API_URL`).
- **Projeto guiado:** listagem vinda do json-server.

### Aula 6 — Rotas com React Router
- **Ciclo 1:** Roteamento no cliente. `createBrowserRouter`/`Routes`, `Link`/`NavLink`, layout com `Outlet` e página 404.
- **Ciclo 2:** Rotas dinâmicas com `useParams`. Navegação programática com `useNavigate`. Query string (`useSearchParams`) para os filtros.
- **Projeto guiado:** páginas Home, Lista, Detalhe (`/eventos/:id`) e Cadastro.

### Aula 7 — Enviando dados e organizando o projeto
- **Ciclo 1:** POST, PUT/PATCH e DELETE com `fetch` e funções `async`/`await` (`method`, `headers`, `body` com `JSON.stringify`). Atualizar o estado depois da resposta da API para a interface refletir a mudança. Tratamento de erros com `try`/`catch` e `response.ok`, e estado de "enviando" no botão.
- **Ciclo 2:** Organizar as chamadas em funções assíncronas reutilizáveis num arquivo de serviço (`services/api.js` com `getEventos`, `criarEvento` etc., usando `VITE_API_URL`). Organização das pastas (`pages`, `components` e `services`). Como ler a documentação de uma API (README e Swagger) para integrar.
- **Projeto guiado:** CRUD completo integrado com a API.

### Aula 8 — Context API e autenticação no frontend
- **Ciclo 1:** O problema do prop drilling. `createContext`, Provider e `useContext`. Contexto de tema ou de favoritos.
- **Ciclo 2:** `AuthContext`: login (simulado no json-server), token no `localStorage` e rotas protegidas. Prepara o JWT do M4U4.
- **Projeto guiado:** login, rota protegida e header com o usuário logado.

### Aula 9 — Build, deploy e apresentação
- **Ciclo 1:** `npm run build` e deploy (Vercel ou Netlify), incluindo variáveis de ambiente no deploy. Checklist de qualidade: README, acessibilidade e responsividade.
- **Ciclo 2:** Apresentação dos projetos finais. Ponte para o M4: "este json-server vai virar a API de vocês".
- 📌 **Entrega do projeto final da U3.**

---

## Pontos em aberto para a próxima rodada

1. **Domínio do projeto guiado:** qual API será construída no M4 (M4U1/M4U3)? O ideal é o projeto guiado da U2/U3 já usar as mesmas entidades e rotas.
2. **Base visual da U2:** o projeto guiado parte de um layout HTML/CSS pronto (entregue pela professora) ou de algo que os alunos fizeram no M2?
3. **Ambiente da U1:** exercícios no console do navegador, no Node pelo terminal, ou nos dois?
4. **Biblioteca CSS do M2U2** (Bootstrap ou Tailwind?): ela continua na U2/U3?
5. ~~`fetch` ou axios na U3?~~ **Decidido:** o consumo de API em todo o módulo usa só `fetch` com funções assíncronas, sem axios e sem custom hooks.
6. **Conteúdos a confirmar:** React Hook Form (aula 4 da U3)? `useRef`/`useMemo`? Na proposta atual eles ficaram de fora para não sobrecarregar.
