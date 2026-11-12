# Comportamento esperado · Nexo Literário

Na M3-U2, o projeto contempla somente a Home e a página Planos. As duas telas
buscam suas coleções no JSON Server e constroem a interface com JavaScript.
Não há navegação para uma ficha individual de livro, parâmetros de URL,
histórico ou formulário de assinatura.

## 1. Home (`index.html`)

Ao abrir a página, `js/inicio.js` faz `GET /livros`.

- Enquanto a resposta não chega, mostre `#livros-carregando`.
- Se a resposta não for bem-sucedida ou a rede falhar, mostre `#livros-erro` e
  o botão `#livros-tentar-novamente`. O botão deve repetir a busca.
- Se a resposta for uma lista vazia, mostre `#livros-vazio`.
- Com dados, ordene os livros pelo campo `mes` e crie um cartão para cada um
  dentro de `#lista-livros`.
- Cada cartão mostra mês por extenso, capa, título, autor, categoria e sinopse.
  Não há link de detalhes.
- Se a capa não estiver informada, mostre um marcador de capa indisponível
  (veja `docs/03-componentes.md`). Se a sinopse estiver vazia ou ausente, não
  crie esse parágrafo; nunca mostre `null` ou `undefined`.

A cada nova tentativa, limpe a lista anterior e volte ao estado de carregamento.
Apenas um dos estados de carregamento, erro, vazio e sucesso deve ficar visível.

## 2. Planos (`planos.html`)

Ao abrir a página, `js/planos.js` faz `GET /planos`.

- Enquanto a resposta não chega, mostre `#planos-carregando`.
- Se a resposta não for bem-sucedida ou a rede falhar, mostre `#planos-erro` e
  o botão `#planos-tentar-novamente`. O botão deve repetir a busca.
- Se a resposta for uma lista vazia, mostre `#planos-vazio`.
- Com dados, crie um cartão para cada plano dentro de `#lista-planos`.
- Cada cartão mostra nome, quantidade de livros, valor parcelado, total do
  ciclo, percentual e valor do desconto à vista, valor final à vista e os
  benefícios recebidos da API.
- Marque o plano em destaque somente quando `destaque` vier como `true`.

Calcule os valores a partir de `valorDaParcela`, `meses` e
`descontoAVista`, seguindo `docs/02-dados-e-calculos.md`. Não mantenha uma
segunda lista de preços no JavaScript.

## 3. Regras comuns

- Use `async`/`await` com `try`/`catch` nas chamadas `fetch`.
- Verifique `response.ok`: respostas HTTP 404 e 500 não caem automaticamente
  no `catch`.
- Mostre as mensagens de erro na própria página; não use `alert()`.
- Insira texto vindo da API com `textContent` e imagens por atributos como
  `src` e `alt`.
- O menu responsivo existente pode continuar funcionando, mas não é o foco de
  avaliação desta unidade.

A página de detalhes, a navegação entre livros, o histórico e o fluxo de
assinatura ficam para a M3-U3, quando a turma trabalhar com React.
