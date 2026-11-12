# Raiz & Cia · Área do assinante

Projeto final individual da unidade **ReactJS** (M3U3). Você vai construir em
React a aplicação de assinatura da Raiz & Cia: catálogo de kits, página de
cada kit, cadastro, login, formulário de assinatura com busca de endereço pelo
CEP e uma área onde a pessoa gerencia as próprias assinaturas.

A API é simulada com o **json-server**, a partir de um banco pronto. No Módulo
4 você vai construir a API de verdade, com as mesmas rotas, e este mesmo
frontend vai passar a conversar com ela.

O CSS vem pronto. **O projeto inteiro é React.**

![Catálogo de kits](referencias/02-catalogo.png)

---

## Antes de começar

1. Faça o fork, clone o **seu** fork e abra a pasta no VS Code.
2. Confira se tem o Node instalado: `node -v` no terminal precisa mostrar a
   versão 20 ou maior.
3. Siga a **Etapa 0** do roteiro (mais abaixo) para criar o projeto React
   dentro desta pasta e ligar a API.

## O briefing

Você já conhece a **Raiz & Cia** do Módulo 2: a lojinha que vende kits de
sementes por assinatura e que perdia pedidos porque tudo passava pelo direct
do Instagram. A página que você fez naquela época deu certo. Deu tão certo que
criou um problema novo.

Agora são mais de trezentos assinantes, e cada pausa, troca de kit ou
cancelamento ainda chega por mensagem. A dona, a Lúcia, passa as manhãs
copiando endereços para uma planilha. O pedido dela:

> "Quero que a pessoa entre, escolha o kit, assine e depois resolva a vida
> dela sozinha: pausar nas férias, trocar de kit, cancelar. Sem me chamar."

A designer manteve a identidade do site anterior. A equipe de backend vai
entregar a API no mês que vem, mas já combinou as rotas e o formato dos dados.
Até lá, você trabalha com uma API simulada que responde exatamente do mesmo
jeito.

O pedido completo, os textos e as mensagens aprovadas estão em
`docs/01-briefing-do-cliente.md`.

## O que a aplicação precisa ter

| Rota | Tela | Acesso |
| --- | --- | --- |
| `/` | Início: abertura, kits em destaque e como funciona | livre |
| `/kits` | Catálogo com busca, filtro por luz e ordenação | livre |
| `/kits/:id` | Página do kit | livre |
| `/entrar` | Login | livre |
| `/cadastro` | Criar conta | livre |
| `/assinar/:kitId` | Formulário de assinatura | **só logado** |
| `/minha-conta` | Minhas assinaturas: pausar, retomar, trocar kit e cancelar | **só logado** |
| qualquer outra | Página não encontrada | livre |

O comportamento de cada tela está em `comportamento-interativo.md`. **Esse
documento é a sua especificação**: leia inteiro antes de começar.

## O que você recebe

```
raiz-e-cia-assinante/
├── api/
│   └── db.json .................... banco da API simulada (kits, usuários, assinaturas)
├── recursos/
│   ├── estilo-base.css ............ estilo pronto (vai para src/)
│   ├── README-estilo-base.md ...... guia das classes e variáveis do estilo
│   └── img/mudas.png .............. foto da abertura (vai para public/)
├── docs/
│   ├── 01-briefing-do-cliente.md .. pedido, textos e mensagens aprovadas
│   ├── 02-guia-da-api.md .......... rotas da API simulada e do ViaCEP
│   └── 03-telas-e-componentes.md .. rotas, componentes sugeridos e marcação de cada tela
├── referencias/ ................... imagens de referência das telas
├── comportamento-interativo.md .... como cada tela deve reagir
└── README.md ...................... este arquivo
```

O guia completo das classes do CSS está em `recursos/README-estilo-base.md`.
O projeto usa o tema **Raiz** (`data-tema="raiz"`).

## O que você entrega

1. O projeto React funcionando, criado com Vite, no seu repositório.
2. O **frontend publicado** na Vercel ou na Netlify.
3. A **API publicada** no Render, com o passo a passo da Etapa 8. Se não
   conseguir publicar a API, grave um vídeo de até 3 minutos mostrando o fluxo
   completo rodando na sua máquina e coloque o link no README.
4. O **README do seu projeto** reescrito, no modelo da seção
   "[Documentação do seu projeto](#documentação-do-seu-projeto)", no fim deste
   arquivo.

## Regras

1. **React com Vite**, sem TypeScript.
2. **Bibliotecas permitidas:** `react`, `react-dom`, `react-router-dom` e, só
   como dependência de desenvolvimento, `json-server@0.17.4`. Nada além disso:
   sem axios, sem biblioteca de formulário, sem biblioteca de componentes.
3. **Todas as chamadas à API com `fetch` e `async`/`await`**, com `try`/`catch`
   e conferência do `response.ok`.
4. **Hooks do projeto:** `useState`, `useEffect`, `useContext` e os do React
   Router (`useParams`, `useNavigate`, `useSearchParams`). Não é preciso criar
   hooks próprios.
5. **Formulários controlados**: todo campo tem `value` (ou `checked`) ligado a
   um estado e um `onChange`.
6. **O endereço da API vem de uma variável de ambiente** (`VITE_API_URL`), e não
   escrito à mão em cada `fetch`.
7. **Não edite o `estilo-base.css`.** Para personalizar, crie outro arquivo e
   sobrescreva as variáveis. **Nada de `style={{ }}`** nos componentes: use as
   classes.
8. **Nenhuma manipulação direta do DOM** (`document.querySelector`,
   `innerHTML`) dentro dos componentes. No React, a tela é consequência do
   estado.
9. Você pode usar IA como tutora, com o prompt da unidade, para tirar dúvidas e
   revisar o seu código. Não pode pedir para ela fazer o projeto. Na
   apresentação, você vai explicar qualquer trecho que for apontado.

> **Sobre a senha no `db.json`.** A API simulada guarda a senha em texto puro
> e o login confere a senha no navegador. **Isso é inseguro e só serve para
> simular.** Nunca faça isso em um projeto de verdade. No Módulo 4 (unidade de
> Segurança) você vai guardar senhas com hash e autenticar com token JWT no
> servidor. A interface que você constrói agora continua a mesma.

## O que você vai desenvolver

**Componentes e JSX**
- Dividir uma tela em componentes, com props e `children`
- Listas com `map` e `key`, renderização condicional
- Reaproveitar o mesmo componente em telas diferentes

**Estado e formulários**
- `useState` com valores simples, objetos e listas, sempre sem mutar
- Elevar o estado e passar funções como props
- Formulários controlados com validação e mensagens por campo

**Efeitos e API**
- `useEffect` para buscar dados, com a lista de dependências certa
- Estados de carregando, erro e vazio em todas as telas que buscam dados
- `GET`, `POST`, `PATCH` e `DELETE` com `fetch`
- Ler a documentação de duas APIs e integrar as duas (a sua e o ViaCEP)
- Variáveis de ambiente no Vite

**Rotas**
- Rotas com layout comum (`Outlet`), rotas com parâmetro, página 404
- `NavLink`, navegação depois de uma ação e filtros guardados na URL
- Rotas protegidas

**Contexto**
- Um `AuthContext` com o usuário logado, entrar e sair, salvo no
  `localStorage`

**Publicação**
- Build e deploy de uma SPA, incluindo o ajuste de rotas no servidor
- Documentar um projeto para quem nunca viu o código

---

## Roteiro de estudo

O projeto é apresentado na aula 2 e entregue na aula 9. Cada etapa usa o que
foi visto até aquela aula.

### Etapa 0 · Montar o projeto (aula 1)

Na pasta do repositório, crie o projeto React **dentro da própria pasta** (o
ponto no fim do comando é isso). Quando o Vite avisar que a pasta não está
vazia, escolha **"Ignore files and continue"**. Se ele fizer outras perguntas
(usar outra ferramenta de build, instalar e iniciar agora), responda **No**.

```
npm create vite@latest . -- --template react
npm install
npm install react-router-dom
npm install -D json-server@0.17.4
```

Depois:

1. Mova `recursos/estilo-base.css` para `src/` e importe no `main.jsx`. Apague
   o `index.css` e o `App.css` que vieram do Vite.
2. Mova `recursos/img/mudas.png` para `public/`.
3. No `index.html` da raiz, troque `<html lang="en">` por
   `<html lang="pt-BR" data-tema="raiz">` e mude o `<title>`.
4. Crie um arquivo `.env` na raiz com o endereço da API:

   ```
   VITE_API_URL=http://localhost:3001
   ```

5. No `package.json`, dentro de `"scripts"`, acrescente:

   ```json
   "api": "json-server --watch api/db.json --port 3001"
   ```

A partir daqui, o projeto roda com **dois terminais abertos**: `npm run api`
em um e `npm run dev` no outro.

> O `json-server` escreve no `db.json` toda vez que a aplicação cria, altera ou
> apaga algo. Se os dados ficarem bagunçados durante os testes, volte ao
> original com `git checkout api/db.json`.

### Etapa 1 · Componentes estáticos (aulas 1 e 2)

Ainda sem API e sem rotas: monte a página inicial e o catálogo com um array de
kits copiado do `db.json` para dentro do código. Crie os componentes `Topo`,
`Rodape`, `CardKit`, `TagSituacao` e `GradeKits`.

O `CardKit` recebe um kit por props e decide sozinho o que mostrar: a etiqueta
de situação só aparece se o kit não estiver disponível, e o texto da luz vem
traduzido ("sol-pleno" vira "sol pleno").

`props` · `children` · `map` + `key` · `&&` · ternário · `className`

### Etapa 2 · Estado no catálogo (aula 3)

Faça a busca, o filtro por luz e a ordenação funcionarem **no array local**,
com `useState`. A busca e os filtros são **um estado só** (um objeto) ou
estados separados? Experimente e decida.

`useState` · eventos · imutabilidade · `filter` · `sort` em uma **cópia**

### Etapa 3 · Formulários controlados (aula 4)

Monte os formulários de **Entrar**, **Cadastro** e **Assinar**, com todas as
regras de validação do `comportamento-interativo.md`. Por enquanto, o envio só
mostra os dados no console.

`value` + `onChange` · estado-objeto do formulário · `checked` · validação no `submit`

### Etapa 4 · A API simulada (aula 5)

Suba a API (`npm run api`) e troque o array local pelo `fetch`. Leia
`docs/02-guia-da-api.md` antes.

- Catálogo e início buscando da API, com carregando, erro e vazio.
- Filtros e ordenação passam a ser **parâmetros da URL da API**, e o
  `useEffect` busca de novo quando eles mudam.
- No formulário de assinatura, o CEP busca o endereço no **ViaCEP**.

`useEffect` · lista de dependências · função `async` dentro do efeito · `import.meta.env`

### Etapa 5 · Rotas (aula 6)

Instale as rotas da tabela do início deste arquivo. Topo e rodapé ficam em um
**layout** comum com `Outlet`. A página do kit lê o `id` da URL. Os filtros do
catálogo vão para a URL (`/kits?luz=sol-pleno&ordem=preco`), então dá para
mandar o link de uma busca para alguém.

`createBrowserRouter` ou `BrowserRouter` · `Outlet` · `NavLink` · `useParams` · `useSearchParams` · `useNavigate`

### Etapa 6 · Enviar dados (aula 7)

Faça tudo que **escreve** na API funcionar: criar conta (`POST /usuarios`),
assinar (`POST /assinaturas`), pausar, retomar e trocar de kit (`PATCH`) e
cancelar (`DELETE`). Depois de cada resposta, **atualize o estado** para a tela
refletir a mudança sem recarregar a página.

Junte todas as chamadas em `src/services/api.js`, uma função assíncrona por
operação (`listarKits`, `buscarKit`, `criarAssinatura`…). Nenhum componente faz
`fetch` direto.

`method` · `headers` · `body` + `JSON.stringify` · estado de "enviando" · `response.ok`

### Etapa 7 · Login e rotas protegidas (aula 8)

Crie o `AuthContext` com o usuário logado e as funções `entrar`, `cadastrar` e
`sair`. O usuário fica salvo no `localStorage` (sem a senha). Crie um
componente `RotaProtegida` que manda para `/entrar` quem não está logado,
lembrando para onde a pessoa queria ir.

`createContext` · Provider · `useContext` · `Navigate` · `localStorage`

### Etapa 8 · Publicar e documentar (aula 9)

**Frontend (Vercel):**

1. Na Vercel, importe o repositório do GitHub. O Vite é detectado sozinho.
2. Em *Environment Variables*, crie `VITE_API_URL` com o endereço da sua API
   publicada.
3. Crie na raiz do projeto um `vercel.json` com o conteúdo abaixo. Sem ele,
   recarregar a página em `/kits/3` dá erro 404, porque o servidor procura um
   arquivo com esse nome e não encontra. Entender o porquê faz parte da
   entrega.

   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
   ```

   Na Netlify, o mesmo ajuste é um arquivo `public/_redirects` com a linha
   `/*  /index.html  200`.

**API (Render):** crie um *Web Service* a partir do mesmo repositório, com
*Build Command* `npm install` e *Start Command*:

```
npx json-server@0.17.4 api/db.json --port $PORT --host 0.0.0.0
```

A versão vai escrita no comando de propósito: sem ela, o `npx` baixa a versão
mais nova do json-server, que tem outra sintaxe de filtros, e o seu catálogo
para de filtrar.

No plano gratuito, a API "dorme" depois de um tempo parada (a primeira
requisição demora quase um minuto) e os dados voltam ao `db.json` original
quando ela reinicia. Para um projeto de estudo, tudo bem: o seu estado de
carregando vai ter a chance de brilhar.

Por fim, reescreva o README.

---

## Desafios extras (opcionais)

Só depois que tudo da lista de entrega estiver funcionando.

- **Busca enquanto digita**, esperando 400ms depois da última tecla.
- **Resumo do pedido** na tela de assinar, atualizado a cada campo mudado:
  kit, frequência, endereço e valor.
- **Tema escuro**: um contexto de tema que troca o `data-tema` do `<html>` e
  guarda a escolha.
- **Editar endereço** de uma assinatura na Minha conta.
- **Paginação no catálogo** com `_page` e `_limit` do json-server.

## Lista de entrega

- [ ] As oito rotas da tabela existem, com o topo e o rodapé em comum
- [ ] Catálogo: busca, filtro e ordenação funcionam juntos e ficam guardados na URL
- [ ] Toda tela que busca dados mostra carregando, erro e vazio
- [ ] A página de um kit inexistente (`/kits/99`) mostra "Kit não encontrado"
- [ ] Cadastro e login funcionam, com as mensagens de erro do briefing
- [ ] Recarregar a página mantém a pessoa logada
- [ ] Quem não está logado e tenta assinar vai para o login e, depois de entrar, volta para onde estava
- [ ] O CEP preenche o endereço, e o CEP inexistente mostra a mensagem certa
- [ ] Assinar cria a assinatura na API e leva para a Minha conta
- [ ] Pausar, retomar, trocar de kit e cancelar funcionam e atualizam a tela na hora
- [ ] Cancelar pede confirmação em uma janela, sem `confirm()`
- [ ] Todas as chamadas estão em `services/api.js`, com `VITE_API_URL`
- [ ] Nenhum erro nem aviso vermelho no console (inclusive o de `key`)
- [ ] Frontend publicado, API publicada (ou vídeo) e README reescrito

## Critérios de avaliação

| Critério | Peso |
| --- | --- |
| Integração com a API: as quatro operações, tratamento de erros, ViaCEP, camada de serviço | 25% |
| Componentes, estado e formulários controlados | 25% |
| Rotas: layout, parâmetros, URL do catálogo, proteção, 404 | 15% |
| Contexto de autenticação e persistência do login | 10% |
| Estados de carregando, erro e vazio em todas as telas | 10% |
| Publicação e documentação (README) | 15% |

---

## Documentação do seu projeto

O README que veio com este repositório é o **enunciado**. Na entrega, ele dá
lugar ao README do **seu projeto**, escrito para quem nunca viu o código: uma
pessoa recrutadora, alguém da turma ou você mesmo daqui a seis meses. Mova o
enunciado para `docs/00-enunciado.md`, para não perder.

O seu README precisa ter, nesta ordem:

1. **Nome e uma frase** dizendo o que a aplicação faz.
2. **Links**: aplicação publicada, API publicada (ou vídeo).
3. **Imagens**: pelo menos três telas, uma delas no celular.
4. **Funcionalidades**: a lista do que dá para fazer, em linguagem de quem usa.
5. **Tecnologias**: React, Vite, React Router, json-server, ViaCEP.
6. **Como rodar na sua máquina**: requisitos, instalação, o `.env`, os dois
   terminais e um usuário de teste para entrar.
7. **Estrutura de pastas**: a árvore do `src/` com uma linha explicando cada
   pasta.
8. **Rotas da aplicação** e **rotas da API que ela consome**.
9. **Decisões e aprendizados**: duas ou três decisões que você tomou e por quê
   (ex.: "o filtro fica na URL para o link poder ser compartilhado"), e o que
   foi mais difícil.
10. **Próximos passos**: o que você faria com mais tempo. A troca do json-server
    pela API do Módulo 4 é um deles.

---

## Como fazer o fork

**1. Faça o fork.** No topo desta página, clique em **Fork** e em **Create
fork**.

**2. Clone a SUA cópia:**

```
git clone https://github.com/SEU-USUARIO/raiz-e-cia-assinante.git
cd raiz-e-cia-assinante
```

**3. Trabalhe em commits pequenos**, um por etapa do roteiro, e envie:

```
git add .
git commit -m "etapa 4: catálogo buscando da API"
git push
```

O `.env` não deve ir para o GitHub: confira se ele está no `.gitignore` (o Vite
já coloca `*.local`, mas não `.env`). Para mostrar a quem clonar quais variáveis
existem, crie um `.env.example` com a mesma linha, esse sim versionado.

---

**Fontes de consulta:** [react.dev (em português)](https://pt-br.react.dev/learn),
[React Router](https://reactrouter.com/),
[json-server 0.17](https://github.com/typicode/json-server/tree/v0.17.4),
[ViaCEP](https://viacep.com.br/),
[Vite: variáveis de ambiente](https://vite.dev/guide/env-and-mode).
