# Guia da API · Cleveland Museum of Art Open Access

A API pública do Cleveland Museum of Art. É gratuita, não pede cadastro nem
chave e aceita requisições vindas de qualquer site.

- Documentação oficial: <https://openaccess-api.clevelandart.org/>
- Endereço base: `https://openaccess-api.clevelandart.org/api`

Este guia traz só o que o projeto precisa. Ler a documentação oficial é parte
do exercício: em algum momento você vai precisar de algo que não está aqui.

> **Antes de escrever código, teste no navegador.** Cole as URLs deste guia na
> barra de endereço e olhe a resposta. O Firefox mostra o JSON organizado; no
> Chrome, marque a opção *Estilos de formatação* que aparece no topo.

---

## 1. Listar e buscar obras

```
GET /artworks/
```

### Parâmetros que você vai usar

| Parâmetro | Exemplo | O que faz |
| --- | --- | --- |
| `q` | `q=landscape` | busca por palavra (em inglês) em título, autoria, descrição etc. |
| `type` | `type=Photograph` | só obras deste tipo |
| `has_image` | `has_image=1` | **só obras com imagem**. Use sempre: obra sem foto não serve para a página |
| `limit` | `limit=12` | quantas obras vêm por resposta |
| `skip` | `skip=24` | quantas obras pular a partir do começo (é assim que se pagina) |
| `fields` | `fields=id,title,images` | só estes campos na resposta (a resposta fica bem mais leve) |

### Exemplo

```
https://openaccess-api.clevelandart.org/api/artworks/?q=landscape&type=Photograph&has_image=1&limit=12&skip=0&fields=id,title,creation_date,type,creators,images
```

### Formato da resposta

```json
{
  "info": {
    "total": 145,
    "parameters": { "q": "landscape", "type": "Photograph", "limit": 12, "skip": 0 }
  },
  "data": [
    {
      "id": 157013,
      "title": "Landscape",
      "creation_date": "1856",
      "type": "Photograph",
      "creators": [
        { "id": 1088, "description": "Henry White (British, 1819–1903)", "role": "artist" }
      ],
      "images": {
        "web": {
          "url": "https://openaccess-cdn.clevelandart.org/1993.162/1993.162_web.jpg",
          "width": "1173",
          "height": "893"
        }
      }
    }
  ]
}
```

- `info.total` é o total de obras **da busca inteira**, não só desta página.
  É com ele que você calcula o número de páginas e preenche o contador.
- `data` é a lista de obras **desta página**. Busca sem resultado devolve
  `data: []` e `total: 0`, com status 200. Isso **não é erro**: é o estado
  vazio.

O arquivo `dados/obras-exemplo.json` é uma resposta de verdade desta rota
(busca `landscape`, tipo `Photograph`, página 1). Use-o nas etapas 2 a 5,
antes de ligar a API.

## 2. Uma obra

```
GET /artworks/{id}
```

```
https://openaccess-api.clevelandart.org/api/artworks/157013
```

A resposta vem **dentro de `data`**, e `data` é um objeto, não uma lista:

```json
{
  "data": {
    "id": 157013,
    "title": "Landscape",
    "creation_date": "1856",
    "type": "Photograph",
    "technique": "albumen print from wet collodion negative",
    "measurements": "Image: 19 x 25 cm (7 1/2 x 9 13/16 in.); Matted: 50.8 x 61 cm (20 x 24 in.)",
    "culture": ["England, 19th century"],
    "description": "In the 1850s London lawyer Henry White was also recognized as one of...",
    "url": "https://clevelandart.org/art/1993.162",
    "creators": [ { "description": "Henry White (British, 1819–1903)" } ],
    "images": { "web": { "url": "https://openaccess-cdn.clevelandart.org/1993.162/1993.162_web.jpg" } }
  }
}
```

Também aceita `fields`, e vale usar: a obra completa tem mais de 60 campos.

Um `id` que não existe responde com **status 404**. O `fetch` não considera
isso um erro, então confira o `response.ok`.

---

## 3. Os campos e as armadilhas

| Campo | Tipo | Uso na página | Cuidado |
| --- | --- | --- | --- |
| `id` | número | `data-id` do cartão, rota de detalhe, chave da seleção | |
| `title` | texto | título | |
| `creation_date` | texto | data | é **texto**, não número: "c. 1900", "1878–80", "early 1860s" |
| `type` | texto | rótulo (traduzido) | |
| `creators` | **lista** | autoria = `creators[0].description` | pode ser uma **lista vazia** |
| `images.web.url` | texto | foto | |
| `technique` | texto | detalhe | pode ser `null` |
| `measurements` | texto | detalhe | pode ser `null` |
| `culture` | **lista** de textos | detalhe | pode ser vazia; junte com `join(', ')` |
| `description` | texto | detalhe | pode ser `null` **e** pode conter tags HTML |
| `url` | texto | link "Ver no site do museu" | |

### Lista vazia não é erro, mas quebra o código

```js
obra.creators[0].description      // TypeError se creators for []
obra.creators[0]?.description     // undefined, sem quebrar
```

Procure por *optional chaining* (`?.`) e por *nullish coalescing* (`??`). Com os
dois, a regra "se não tiver autoria, mostre Autoria desconhecida" cabe em uma
linha.

### Por que nada de `innerHTML` com dado da API

Algumas descrições chegam assim. Este trecho é da obra 151365, que está no
arquivo de exemplo:

```
"description": "...This image was included among the 40 prints illustrating <em>Life and Landscape on the Norfolk Broads</em>..."
```

Com `textContent`, as tags aparecem escritas na tela, o que fica feio. Com
`innerHTML`, o navegador **interpreta** o que veio da API como HTML. Aqui é só
um itálico, mas se um dia viesse um `<img src=x onerror="...">`, esse código
rodaria na página de quem está vendo. Esse ataque se chama **XSS**, e a regra
do projeto existe por causa dele.

A saída é **remover as tags** antes de colocar o texto na tela. Uma forma
segura de fazer isso com o próprio navegador:

```js
function textoSemTags(html) {
  const documento = new DOMParser().parseFromString(html, 'text/html')
  return documento.body.textContent
}
```

O `DOMParser` monta o HTML em um documento separado, que não roda script
nenhum, e o `textContent` devolve só o texto. Use o resultado com
`textContent`.

---

## 4. Paginação com `skip` e `limit`

A API não sabe o que é "página 3". Ela sabe pular obras. Com 12 obras por
página:

| Página | `skip` |
| --- | --- |
| 1 | 0 |
| 2 | 12 |
| 3 | 24 |

Descubra a fórmula. O total de páginas sai de `info.total` e do tamanho da
página. Pense no que acontece quando a divisão não é exata (145 obras ÷ 12 por
página).

## 5. Montando a URL sem sofrimento

Concatenar texto (`'...?q=' + busca + '&type=' + tipo`) parece simples, mas
quebra com espaço, acento ou `&` na busca, e manda `type=` vazio quando o
filtro é "Todas". O navegador tem uma ferramenta para isso:

```js
const parametros = new URLSearchParams({ q: 'sea', limit: 12 })
parametros.append('has_image', 1)
parametros.toString()   // "q=sea&limit=12&has_image=1"
```

Ela cuida da codificação dos caracteres. Para não mandar o tipo quando ele está
vazio, use um `if` antes do `append`.

## 6. Quando dá errado

Existem três jeitos diferentes de uma chamada dar errado, e o projeto precisa
tratar os três:

| Situação | O que o `fetch` faz | Como perceber |
| --- | --- | --- |
| Sem internet, endereço errado | **rejeita** a Promise | cai no `catch` |
| Servidor responde 404, 500… | **resolve** normalmente | `response.ok === false` |
| Resposta chega, mas a lista está vazia | resolve normalmente | `data.length === 0`. Não é erro: é o estado vazio |

Para testar o erro sem derrubar a internet: no DevTools, aba **Network**, mude
*No throttling* para **Offline** e faça uma busca. Volte para *No throttling* e
clique em "Tentar de novo".

Para ver o carregando com calma: no mesmo menu, escolha **Slow 3G**.

## 7. Limites de uso

A API é aberta, mas não é infinita. Não faça uma requisição a cada tecla
digitada (a não ser no desafio extra de *debounce*) e não busque as obras uma
a uma para montar a grade: a rota de lista já traz tudo o que o cartão precisa.
