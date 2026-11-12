# Guia da API · Nexo Literário

A API desta atividade roda localmente com JSON Server. Ela fornece as coleções
de livros e planos que alimentam as duas páginas do projeto.

## 1. Iniciar o servidor

Abra um terminal na pasta `api` do projeto e execute:

```sh
npx json-server@0.17.4 db.json
```

Na primeira execução, confirme a instalação do pacote se o terminal solicitar.
Mantenha o processo aberto durante o desenvolvimento. A raiz da API será
`http://localhost:3000`.

Antes de programar, abra estas rotas no navegador e confira se cada uma mostra
uma lista JSON:

- `http://localhost:3000/livros`
- `http://localhost:3000/planos`

## 2. Rotas

| Método e rota | Resposta |
| --- | --- |
| `GET /livros` | Lista de livros para a Home |
| `GET /planos` | Lista de planos para a página Planos |

As páginas consomem as coleções completas. Nesta unidade, não é necessário
buscar um livro individual, criar ou atualizar dados, nem ler parâmetros do
endereço da página.

## 3. Fazer uma chamada

Guarde a raiz em uma constante para não repetir o endereço:

```js
const ENDERECO_DA_API = "http://localhost:3000";

const resposta = await fetch(`${ENDERECO_DA_API}/livros`);
if (!resposta.ok) {
  throw new Error(`Falha ao buscar livros: ${resposta.status}`);
}
const livros = await resposta.json();
```

Use a mesma sequência para `/planos`. Envolva a chamada em `try`/`catch` e
atualize os estados da página conforme `comportamento-interativo.md`.

## 4. Respostas e erros

- Em uma resposta bem-sucedida, `response.json()` devolve um array.
- `fetch` não rejeita quando o servidor responde com 404 ou 500. Confira
  `response.ok` antes de processar o JSON.
- Falhas de rede, servidor desligado ou endereço incorreto são capturadas pelo
  `catch`.
- Para testar o erro de rede, pare o JSON Server e tente novamente pela
  interface. Depois, inicie o servidor e use o botão de nova tentativa.
- Para testar uma lista vazia, troque temporariamente a coleção no `db.json`
  por um array vazio e reinicie o servidor.
- Para testar campos opcionais, apague temporariamente a `capa` ou a `sinopse`
  de um livro no `db.json`. Desfaça as alterações de teste antes da entrega.

Os formatos das respostas e os cálculos de apresentação estão em
[`02-dados-e-calculos.md`](02-dados-e-calculos.md).
