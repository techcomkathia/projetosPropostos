# Comportamento esperado · Nexo Literário

O projeto tem duas páginas: a Home e Planos. Os dados já estão no projeto, em
`dados/livros.js` (constante `LIVROS`) e `dados/planos.js` (constante
`PLANOS`). Esses arquivos são carregados antes dos seus scripts, então as
constantes já existem quando o seu código roda. **Não há `fetch` neste
projeto**: o seu trabalho é transformar essas listas em interface com
JavaScript.

Não há página individual de livro, parâmetros de URL, histórico nem formulário
de assinatura.

## 1. Home (`index.html`)

`js/inicio.js` lê a lista `LIVROS` e monta duas seções com os mesmos dados: o
carrossel por trimestre e a linha do tempo.

### Lista vazia e sucesso

- Se `LIVROS` estiver vazia, mostre o aviso `#livros-vazio` e não mostre o
  carrossel nem a linha do tempo.
- Com livros, monte o carrossel dentro de `#carrossel-trimestres` e a linha do
  tempo dentro de `#linha-do-tempo`. Os dois começam com `hidden` no HTML:
  tire o `hidden` de `#carrossel-trimestres` e da seção
  `#linha-do-tempo-secao` depois de montar.
- O aviso de vazio e as seções nunca aparecem juntos.

Para testar o vazio, troque temporariamente o conteúdo de `dados/livros.js`
por `const LIVROS = [];` e desfaça depois.

### Carrossel "Leituras por trimestre"

- Ordene os livros pelo campo `mes` e agrupe em quatro trimestres: Jan – Mar,
  Abr – Jun, Jul – Set e Out – Dez. Trimestre sem livro não vira slide.
- Cada trimestre é um slide com o rótulo do trimestre e uma grade com um
  cartão por livro: mês por extenso, capa, título, autor e categoria.
- Só um slide fica visível por vez. O primeiro aparece ao abrir a página.
- **Seta anterior e seta próxima** trocam o slide. Depois do último volta ao
  primeiro, e antes do primeiro vai para o último.
- **Pontos de paginação**: um por trimestre. Clicar em um ponto mostra aquele
  trimestre. O ponto do slide visível fica marcado como ativo.
- Os slides escondidos recebem `aria-hidden="true"`, e o ponto ativo recebe
  `aria-current="true"`.

### Linha do tempo "As leituras do ano"

- Um item `<li>` por livro, na ordem dos meses, dentro de `#linha-do-tempo`.
- Cada item mostra a capa e, ao lado, o mês por extenso, o título, o autor, o
  ano de publicação ("Publicado em 1937") e a descrição (`sinopse`).

### Dados que faltam

- Se a capa não estiver informada, mostre um marcador de capa indisponível
  (veja `docs/03-componentes.md`).
- Se autor, categoria, ano ou sinopse estiverem vazios ou ausentes, não crie o
  parágrafo correspondente. Nunca mostre `null` ou `undefined`.
- Não há link "Ver detalhes" nem página individual de livro.

## 2. Planos (`planos.html`)

`js/planos.js` lê a lista `PLANOS`.

- Se `PLANOS` estiver vazia, mostre o aviso `#planos-vazio`.
- Com planos, crie um cartão para cada um dentro de `#lista-planos` e tire o
  `hidden` da lista.
- Cada cartão mostra nome, duração do ciclo, valor da parcela, total
  parcelado, valor à vista, a economia (em reais e em %) e os benefícios.
- Mostre o selo "Mais escolhido" e a variação de destaque somente quando
  `destaque` for `true`.

Calcule os valores a partir de `valorDaParcela`, `meses` e `descontoAVista`,
seguindo `docs/02-dados-e-calculos.md`. Não escreva os preços prontos no
código.

## 3. Regras comuns

- Leia os dados só das constantes `LIVROS` e `PLANOS`. Não copie as listas
  para dentro dos seus scripts e não edite os dados para "fazer funcionar".
- Insira textos com `textContent` e imagens por atributos como `src` e `alt`.
  Não use `innerHTML` com os dados.
- Não use `alert()`; toda mensagem aparece na própria página.
- O menu do celular abre e fecha nas duas páginas.

A página de detalhes, a navegação entre livros e a busca dos dados por `fetch`
ficam para a próxima unidade, quando o Nexo Literário for para o React.
