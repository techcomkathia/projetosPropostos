# Componentes · Nexo Literário

Na M3-U2, o JavaScript cria somente cartões para as coleções de livros e planos.
Os recipientes e os estados de carregamento, erro e lista vazia já existem no
HTML.

Dados recebidos da API devem ser inseridos com `textContent` ou atributos DOM.
Não use `innerHTML` com dados externos.

## 1. Cartão de livro

Cada objeto de `GET /livros` gera um `<article>` dentro de
`#lista-livros`:

```html
<article class="inicio-livro">
  <p class="sobretitulo inicio-livro__mes">Março</p>
  <img class="capa inicio-livro__capa" src="img/03_captaes_da_areia.jpg"
       alt="Capa de Capitães da Areia" loading="lazy">
  <h3 class="inicio-livro__titulo">Capitães da Areia</h3>
  <p class="texto-suave inicio-livro__autor">Jorge Amado</p>
  <p class="texto-suave inicio-livro__categoria">Romance social</p>
  <p class="texto-suave inicio-livro__sinopse">Resumo do livro...</p>
</article>
```

O título é `<h3>` porque a seção já tem o `<h2>` "Os livros do clube".

Quando não houver caminho de imagem, crie no lugar da `<img>` um elemento com
as classes `capa capa-indisponivel inicio-livro__capa`, o texto "Capa
indisponível", `role="img"` e `aria-label` com o título. Quando não houver
sinopse, não crie o parágrafo. Não crie links para páginas individuais nesta
etapa.

## 2. Cartão de plano

Cada objeto de `GET /planos` gera um `<article>` dentro de `#lista-planos`:

```html
<article class="precos__plano">
  <p class="sobretitulo">6 livros</p>
  <h2 class="precos__nome-plano">Semestral</h2>
  <p class="precos__valor">R$ 64,90<span class="precos__periodo">por mês</span></p>
  <p class="precos__detalhes">6 parcelas no cartão · total de R$ 389,40</p>
  <p class="precos__valor">R$ 350,46<span class="precos__periodo">à vista</span></p>
  <p class="precos__detalhes">10% de desconto · economia de R$ 38,94</p>
  <ul class="precos__beneficios">
    <li>6 livros, um por mês</li>
    <li>Nota editorial exclusiva</li>
    <li>Encontros mensais de leitura</li>
  </ul>
</article>
```

Quando `destaque` for `true`, acrescente a classe
`precos__plano--destaque` e, como primeiro item do cartão, um
`<p class="sobretitulo">Mais escolhido</p>`. Os benefícios são uma lista de
dados: crie um `<li>` para cada item. O título do plano é `<h2>` porque a
página tem o `<h1>` "Escolha seu plano".

## 3. Estados da página

Cada página já fornece um recipiente de lista e três blocos de estado. Ao
buscar dados, mostre somente o bloco correspondente:

- `#*-carregando`: solicitação em andamento;
- `#*-erro`: falha na rede ou resposta HTTP inválida, com botão de nova tentativa;
- `#*-vazio`: resposta válida sem itens;
- sucesso: lista preenchida e visível.

Consulte `comportamento-interativo.md` para os IDs de cada página e a sequência
esperada.
