# Guia da API · Raiz & Cia

O projeto conversa com **duas** APIs:

1. A **API da Raiz & Cia**, simulada com o json-server a partir do
   `api/db.json`. No Módulo 4 ela vai ser trocada pela API que você vai
   construir, **com as mesmas rotas e o mesmo formato**. Se o frontend estiver
   bem feito, a troca vai ser só mudar o `VITE_API_URL`.
2. O **ViaCEP**, pública, para buscar endereço pelo CEP.

> **Teste antes de programar.** Com `npm run api` rodando, cole as URLs deste
> guia no navegador. Para testar POST, PATCH e DELETE sem escrever código, use
> a extensão **Thunder Client** do VS Code (ou o Postman).

---

## 1. API da Raiz & Cia

- Endereço local: `http://localhost:3001`
- No código: `import.meta.env.VITE_API_URL` (veja a Etapa 0 do README)
- Versão do json-server: **0.17.4**. A versão 1.0 tem outra sintaxe de
  filtros: tudo neste guia vale só para a 0.17.

### Recursos

| Recurso | Rota | O que tem |
| --- | --- | --- |
| Kits | `/kits` | os oito kits do catálogo |
| Usuários | `/usuarios` | contas de quem assina |
| Assinaturas | `/assinaturas` | cada assinatura, ligada a um usuário e a um kit |

### Rotas

| Método | Rota | Para quê |
| --- | --- | --- |
| GET | `/kits` | listar kits (aceita os filtros abaixo) |
| GET | `/kits/{id}` | um kit; **404** se não existir |
| GET | `/usuarios?email={email}` | procurar uma conta pelo e-mail (devolve uma **lista**, vazia ou com um usuário) |
| POST | `/usuarios` | criar conta |
| GET | `/assinaturas?usuarioId={id}&_expand=kit` | assinaturas de uma pessoa, já com o kit de cada uma |
| POST | `/assinaturas` | criar assinatura |
| PATCH | `/assinaturas/{id}` | alterar **só os campos enviados** (status, kitId) |
| DELETE | `/assinaturas/{id}` | apagar (cancelar) |

### Filtros, busca e ordenação (GET de lista)

| Parâmetro | Exemplo | O que faz |
| --- | --- | --- |
| `{campo}={valor}` | `luz=meia-sombra` | só os itens com aquele valor exato |
| `q` | `q=rúcula` | busca o texto em **todos** os campos, inclusive dentro de listas como `especies` |
| `_sort` e `_order` | `_sort=preco&_order=desc` | ordena (`asc` ou `desc`) |
| `{campo}_ne` | `situacao_ne=lista-de-espera` | todos **menos** aquele valor |
| `_limit` | `_limit=3` | no máximo N itens |
| `_expand` | `_expand=kit` | troca o `kitId` pelo objeto `kit` completo |

Os parâmetros se combinam:

```
/kits?luz=sol-pleno&q=pimenta&_sort=nome&_order=asc
```

### A URL do catálogo e a URL da API não são a mesma coisa

A URL da **sua aplicação** usa nomes pensados para quem lê
(`/kits?busca=rúcula&ordem=menor-preco`). A URL da **API** usa os nomes do
json-server (`/kits?q=rúcula&_sort=preco&_order=asc`). Uma função converte uma
na outra:

| Na URL da aplicação | Na URL da API |
| --- | --- |
| `busca=rúcula` | `q=rúcula` |
| `luz=meia-sombra` | `luz=meia-sombra` |
| sem `ordem` (Nome A–Z) | `_sort=nome&_order=asc` |
| `ordem=menor-preco` | `_sort=preco&_order=asc` |
| `ordem=maior-preco` | `_sort=preco&_order=desc` |

Essa separação é proposital: quando a API mudar no Módulo 4, a URL que as
pessoas compartilharam continua funcionando. Só a conversão muda.

Use `URLSearchParams` para montar a URL da API, como no desafio da U2.

### Exemplos de resposta

**`GET /kits/1`**

```json
{
  "id": 1,
  "nome": "Cozinha",
  "descricao": "Manjericão, cebolinha, salsa e orégano.",
  "especies": ["Manjericão", "Cebolinha", "Salsa", "Orégano"],
  "sementes": 4,
  "luz": "sol-pleno",
  "rega": "Todo dia, de manhã",
  "dificuldade": "facil",
  "preco": 79,
  "situacao": "disponivel",
  "destaque": true,
  "cuidados": "Os quatro gostam de sol direto por pelo menos cinco horas..."
}
```

**`GET /assinaturas?usuarioId=1&_expand=kit`**

```json
[
  {
    "id": 1,
    "usuarioId": 1,
    "kitId": 1,
    "frequencia": "mensal",
    "local": "janela",
    "cep": "01310200",
    "rua": "Avenida Paulista",
    "numero": "1578",
    "complemento": "apto 42",
    "bairro": "Bela Vista",
    "cidade": "São Paulo",
    "uf": "SP",
    "observacao": "A portaria recebe até as 18h",
    "calendario": true,
    "status": "ativa",
    "criadaEm": "2026-08-03T14:20:00.000Z",
    "kit": { "id": 1, "nome": "Cozinha", "preco": 79, "...": "..." }
  }
]
```

**`POST /assinaturas`**: envie o objeto **sem** `id`. O json-server cria o
`id` e devolve o objeto completo, com status **201**. Use essa resposta para
atualizar o estado: é ela que tem o `id` novo.

**`PATCH /assinaturas/1`** com `{ "status": "pausada" }`: devolve a assinatura
inteira já alterada, **sem** o `kit` expandido. Se você trocar a linha do
estado pela resposta, o nome do kit some da tabela. Pense em como juntar o que
voltou com o que já estava na tela.

**`DELETE /assinaturas/1`**: devolve `{}` com status 200.

### A armadilha do header

POST e PATCH **precisam** do header de JSON:

```js
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dados)
})
```

Sem o header, o json-server **não dá erro**. Ele grava um registro quebrado,
com o seu JSON inteiro virando o nome de um campo:

```json
{ "{\"usuarioId\":2}": "", "id": 3 }
```

A requisição "funciona", a tela não mostra nada e o `db.json` fica com lixo. Se
isso acontecer, confira o header e restaure o banco com
`git checkout api/db.json`.

### O login simulado

O json-server não tem login. A aplicação simula assim:

1. `GET /usuarios?email=maria@email.com` devolve uma **lista**.
2. Lista vazia: o e-mail não existe.
3. Lista com um usuário: compare a `senha` dele com a digitada.
4. Deu certo: guarde no contexto e no `localStorage` **sem** a senha.

> Isso é inseguro de propósito: a senha trafega e é conferida no navegador.
> Serve para você construir toda a interface de autenticação agora. No Módulo
> 4, o servidor passa a conferir a senha (com hash) e a devolver um token JWT,
> e só a função `entrar` do seu contexto muda.

---

## 2. ViaCEP

- Documentação: <https://viacep.com.br/>
- Rota: `GET https://viacep.com.br/ws/{cep}/json/`, com o CEP **só com os
  8 números**.

### Encontrou

```
https://viacep.com.br/ws/01310200/json/
```

```json
{
  "cep": "01310-200",
  "logradouro": "Avenida Paulista",
  "complemento": "de 1512 a 2132 - lado par",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP"
}
```

Os nomes são diferentes dos do formulário: `logradouro` vai para **rua**, e
`localidade` vai para **cidade**. O `complemento` do ViaCEP descreve o trecho
da rua e **não** é o complemento da pessoa: não use.

### Não encontrou

Um CEP com 8 números que não existe responde **status 200** com:

```json
{ "erro": "true" }
```

Repare: `"true"` entre aspas, um **texto**, não o booleano `true`. Uma
comparação com `=== true` nunca vai acertar. Teste se a propriedade `erro`
**existe**.

### Formato inválido

Um CEP com menos de 8 números responde **status 400**. A sua validação deve
impedir essa chamada antes que ela aconteça.

### Três respostas, três mensagens

| Situação | Como perceber | Mensagem |
| --- | --- | --- |
| CEP encontrado | `response.ok` e sem `erro` | preenche os campos |
| CEP não existe | `response.ok`, mas com `erro` | erro no campo: "CEP não encontrado." |
| Sem rede, ViaCEP fora | cai no `catch` | ajuda: "Não foi possível buscar o CEP. Preencha o endereço manualmente." |

---

## 3. Onde fica o código das chamadas

Todas as chamadas, das duas APIs, ficam em `src/services/api.js`, uma função
`async` exportada por operação. Exemplos de nomes: `listarKits(filtros)`,
`buscarKit(id)`, `buscarUsuarioPorEmail(email)`, `criarUsuario(dados)`,
`listarAssinaturas(usuarioId)`, `criarAssinatura(dados)`,
`atualizarAssinatura(id, alteracoes)`, `cancelarAssinatura(id)` e
`buscarCep(cep)`.

Cada função:

- monta a URL a partir do `VITE_API_URL`;
- faz o `fetch` e confere o `response.ok`;
- **lança um erro** (`throw new Error(...)`) se a resposta não for ok;
- devolve os dados já convertidos com `response.json()`.

Quem chama (o componente) decide o que mostrar com `try`/`catch`. Assim, o
componente nunca precisa saber a URL, o método ou os headers. E, quando a API
do Módulo 4 chegar, só este arquivo muda.

Para a página do kit separar "não existe" de "deu erro", a função
`buscarKit` precisa avisar qual foi o caso. Uma forma: devolver `null` quando o
status for 404 e lançar erro nos outros casos.
