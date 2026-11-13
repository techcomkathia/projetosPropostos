# Guia da API · Nexo Literário

## 1. Uma API simulada, por enquanto

> **A API de verdade do Nexo Literário ainda não existe. Ela vai ser
> construída por você, no Módulo 4 (Backend).**

Neste projeto, quem responde às requisições é o **json-server**: um programa
que lê o arquivo `api/db.json` e se comporta **como se fosse** o servidor do
clube. Ele tem rotas, devolve JSON, responde 404 e guarda o que você envia com
`POST`. É uma **API fake**.

O combinado com o "time de backend" (que, no Módulo 4, vai ser você) é:

- **as rotas deste guia não mudam**;
- **o formato dos dados não muda**;
- **só o endereço muda**.

Ou seja: se o frontend estiver bem feito, trocar o json-server pela sua API vai
ser só mudar o valor de `VITE_API_URL` no `.env`. Por isso:

1. Todas as chamadas ficam em `src/services/api.js`.
2. O endereço vem de `import.meta.env.VITE_API_URL`, nunca escrito à mão.
3. O frontend não depende de nada que seja "coisa do json-server". Ele faz
   `fetch`, confere o `response.ok` e lê o JSON, como faria com qualquer API.

> **Teste antes de programar.** Com a API rodando, cole as URLs deste guia no
> navegador. Para testar o `POST` sem escrever código, use a extensão
> **Thunder Client** do VS Code (ou o Postman).

---

## 2. Subir a API

O json-server roda com o **Node.js**. Confira no terminal:

```sh
node -v
```

Se aparecer a versão (20 ou maior), está tudo certo. Se não, instale a versão
**LTS** em [nodejs.org](https://nodejs.org/pt-br), feche e abra o terminal de
novo e repita o teste.

Com a Etapa 0 do README feita, rode em um terminal:

```sh
npm run api
```

A API sobe em `http://localhost:3001`. Mantenha esse terminal aberto e rode o
React (`npm run dev`) em **outro** terminal.

- Versão do json-server: **0.17.4**. A versão 1.0 tem outra sintaxe de
  filtros. Tudo neste guia vale só para a 0.17.
- O `--watch` faz a API recarregar quando o `db.json` muda. Mesmo assim, se
  algo parecer estranho depois de editar o arquivo, pare (`Ctrl + C`) e suba de
  novo.

---

## 3. Recursos e rotas

| Recurso | Rota | O que tem |
| --- | --- | --- |
| Livros | `/livros` | os 12 livros da programação |
| Planos | `/planos` | os três planos de assinatura |
| Assinaturas | `/assinaturas` | as assinaturas criadas pelo site (começa vazia) |

| Método | Rota | Para quê | Tela |
| --- | --- | --- | --- |
| GET | `/livros` | listar todos os livros | contexto (Início, Clube, Livro) |
| GET | `/livros?identificador={identificador}` | procurar um livro pelo identificador | Livro |
| GET | `/planos` | listar os planos | contexto (Clube, Assinar) |
| POST | `/assinaturas` | criar uma assinatura | Assinar |

### Por que `?identificador=` e não `/livros/{id}`?

A URL da página do livro usa um texto legível (`/livros/capitaes-da-areia`), e
não o número do banco. Para achar o livro por esse texto, você **filtra** a
coleção: `GET /livros?identificador=capitaes-da-areia`.

Um filtro **sempre devolve uma lista**:

- com o livro: `[ { "id": 3, "identificador": "capitaes-da-areia", ... } ]`;
- sem o livro: `[]`, com status **200**, e não 404.

Então "livro não encontrado" é **lista vazia**, não erro. Quem decide o que
mostrar é você.

---

## 4. Formato dos dados

### Livro

```json
{
  "id": 3,
  "identificador": "capitaes-da-areia",
  "titulo": "Capitães da Areia",
  "autor": "Jorge Amado",
  "mes": 3,
  "categoria": "Romance social",
  "capa": "https://raw.githubusercontent.com/techcomkathia/nexo-literario-imagens/main/img/03_captaes_da_areia.jpg",
  "nota": 4.9,
  "idioma": "Português",
  "paginas": 296,
  "ano": 1937,
  "notaEditorial": "Uma história que confronta o leitor...",
  "sobreAutor": "Jorge Amado foi um dos mais importantes escritores...",
  "sinopse": "Em Salvador, um grupo de meninos abandonados..."
}
```

| Campo | Tipo | Observação |
| --- | --- | --- |
| `id` | número | chave do banco |
| `identificador` | texto | usado na URL da página do livro |
| `mes` | número de 1 a 12 | ordena a programação e define o trimestre |
| `capa` | texto | link completo da imagem, hospedada no GitHub; pode faltar |
| `nota` | número ou `null` | `null` = ainda sem avaliação |
| `paginas` | número ou `null` | `null` = não informado |
| `ano` | número | ano de publicação |
| demais | texto | podem faltar; trate todos |

Nos dados de exemplo, alguns livros vêm com `paginas: null` e os três últimos
vêm com `nota: null`. Isso é de propósito.

### Plano

```json
{
  "id": "semestral",
  "nome": "Semestral",
  "meses": 6,
  "valorDaParcela": 64.9,
  "descontoAVista": 10,
  "destaque": true,
  "beneficios": [
    "6 livros, um por mês",
    "Nota editorial exclusiva",
    "Encontros mensais de leitura"
  ]
}
```

O `id` do plano é um texto (`"semestral"`), e é ele que vai na URL
`/assinar?plano=semestral`. Os valores são números, não textos formatados. As
contas estão em `04-dados-e-calculos.md`.

### Assinatura (o que você envia)

```http
POST /assinaturas
Content-Type: application/json
```

```json
{
  "nome": "Ana Souza",
  "email": "ana@exemplo.com",
  "cpf": "12345678901",
  "planoId": "semestral",
  "modalidade": "avista",
  "formaDePagamento": "pix",
  "valorTotal": 350.46,
  "criadaEm": "2026-11-13T14:30:00.000Z"
}
```

| Campo | Valores |
| --- | --- |
| `cpf` | só os 11 números, sem pontos e traço |
| `planoId` | o `id` do plano escolhido |
| `modalidade` | `"avista"` ou `"parcelado"` |
| `formaDePagamento` | `"cartao"`, `"pix"` ou `"boleto"` |
| `valorTotal` | à vista: o valor com desconto; parcelado: o total parcelado |
| `criadaEm` | `new Date().toISOString()` |

> **Os dados do cartão não vão.** Número, nome impresso, validade e CVV são
> validados no formulário e ficam por lá. Guardar dados de cartão exige regras
> de segurança que nem o json-server nem um projeto de estudo têm. Em um site
> de verdade, eles vão direto para a empresa de pagamentos, nunca para a API do
> clube.

### Assinatura (o que a API responde)

Status **201 Created**, com o mesmo objeto e um `id` novo, criado pela API:

```json
{
  "nome": "Ana Souza",
  "email": "ana@exemplo.com",
  "...": "...",
  "id": 1
}
```

Use esse `id` na mensagem de confirmação ("Assinatura nº 1 confirmada").
Depois de testar, confira em `http://localhost:3001/assinaturas`: a assinatura
está lá, gravada no `db.json`.

---

## 5. Fazer as chamadas

```js
// src/services/api.js
const ENDERECO_DA_API = import.meta.env.VITE_API_URL;

export async function listarLivros() {
  const resposta = await fetch(`${ENDERECO_DA_API}/livros`);
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao buscar os livros`);
  }
  return resposta.json();
}
```

Escreva do mesmo jeito `listarPlanos()`, `buscarLivroPorIdentificador(identificador)`
(que devolve o livro ou `null`) e `criarAssinatura(dados)` (com `method`,
`headers` e `body`).

Lembretes:

- O `fetch` **não** cai no `catch` com 404 ou 500. Confira `response.ok`.
- Servidor desligado, endereço errado ou sem internet **caem** no `catch`.
- O callback do `useEffect` não pode ser `async`. Declare a função `async`
  dentro do efeito e chame logo em seguida.
- Mudou o `.env`? Pare o `npm run dev` e rode de novo: o Vite só lê o `.env`
  ao iniciar.

---

## 6. Testar os casos difíceis

Faça cada teste, confira a tela e **desfaça a alteração** depois
(`git checkout api/db.json` desfaz tudo de uma vez).

| Teste | Como provocar | O que deve aparecer |
| --- | --- | --- |
| API fora do ar | pare o `npm run api` e recarregue o site | o erro com "Tentar de novo" em todas as telas que buscam dados |
| Tentar de novo | com o erro na tela, suba a API e clique no botão | os dados aparecem, sem recarregar a página |
| Programação vazia | troque `"livros": [ ... ]` por `"livros": []` | o aviso de vazio na Início; o aviso de "ainda não registradas" no Clube |
| Planos vazios | troque `"planos": [ ... ]` por `"planos": []` | o aviso de vazio no Clube e na Assinar |
| Livro sem capa | apague a linha `"capa"` de um livro | "Capa indisponível" na Início, no Clube e na página do livro |
| Livro sem sinopse | apague a linha `"sinopse"` de um livro | a seção "Sinopse" some da página do livro |
| Livro inexistente | abra `/livros/nao-existe` | "Livro não encontrado" |
| Falha ao assinar | preencha o formulário, pare a API e confirme | a mensagem de falha; os campos continuam preenchidos |
| Plano pela URL | abra `/assinar?plano=anual` e `/assinar?plano=xyz` | Anual escolhido; Semestral escolhido |

Para ver o carregando com calma, abra o DevTools (F12 › Network) e escolha
**Slow 4G** na lista de velocidade.

---

## 7. E no Módulo 4?

Quando a sua API ficar pronta:

1. Ela vai ter as rotas `/livros`, `/planos` e `/assinaturas`, com os mesmos
   campos deste guia.
2. Você vai trocar o `VITE_API_URL` pelo endereço dela.
3. O `npm run api` e o `db.json` deixam de ser necessários.

Se alguma tela quebrar nessa troca, é sinal de que o frontend dependia de algo
que não estava neste guia. Esse é o melhor teste da qualidade do seu consumo
de API.
