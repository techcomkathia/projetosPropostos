# Componentes · Nexo Literário

O HTML já traz os recipientes (`#carrossel-trimestres`, `#linha-do-tempo`,
`#lista-planos`) e os avisos de lista vazia. O seu
JavaScript cria tudo o que fica dentro dos recipientes, seguindo os modelos
abaixo.

Os dados devem ser inseridos com `textContent` ou atributos DOM. Não use
`innerHTML` com os dados.

Sugestão: escreva **funções-componente**, que recebem um objeto e devolvem um
elemento pronto: `criarCartaoDoLivro(livro)`, `criarItemDaLinhaDoTempo(livro)`
e `criarCartaoDoPlano(plano)`.

## 1. Carrossel por trimestre

Dentro de `#carrossel-trimestres`, o carrossel completo fica assim (exemplo
com o primeiro trimestre visível):

```html
<button class="carrossel__controle carrossel__controle--anterior" type="button"
        aria-label="Anterior: trimestre">
  <span class="carrossel__icone-controle">‹</span>
</button>

<div class="carrossel__janela" aria-live="polite">
  <div class="carrossel__item carrossel__item--ativo" aria-hidden="false">
    <p class="sobretitulo rotulo-trimestre">Jan – Mar</p>
    <div class="inicio-grade-livros">
      <!-- um cartão de livro (modelo abaixo) para cada livro do trimestre -->
    </div>
  </div>
  <div class="carrossel__item" aria-hidden="true">
    <p class="sobretitulo rotulo-trimestre">Abr – Jun</p>
    <div class="inicio-grade-livros">...</div>
  </div>
  <!-- ... um carrossel__item por trimestre -->
</div>

<button class="carrossel__controle carrossel__controle--proximo" type="button"
        aria-label="Próximo: trimestre">
  <span class="carrossel__icone-controle">›</span>
</button>

<div class="carrossel__paginacao" role="group" aria-label="Selecionar trimestre">
  <button class="carrossel__ponto carrossel__ponto--ativo" type="button"
          aria-label="Mostrar Jan – Mar" aria-current="true"></button>
  <button class="carrossel__ponto" type="button" aria-label="Mostrar Abr – Jun"></button>
  <!-- ... um ponto por trimestre -->
</div>
```

- Trocar de slide é **só trocar classes e atributos**: o slide visível tem
  `carrossel__item--ativo`, e o ponto dele tem `carrossel__ponto--ativo`. O CSS
  esconde os outros slides.
- O ícone das setas pode ser o caractere `‹`/`›` ou um SVG. O SVG é um texto
  fixo, não vem dos dados.

### Cartão de livro (dentro do carrossel)

```html
<article class="inicio-livro">
  <p class="sobretitulo inicio-livro__mes">Março</p>
  <img class="capa inicio-livro__capa" src="https://raw.githubusercontent.com/techcomkathia/nexo-literario-imagens/main/img/03_captaes_da_areia.jpg"
       alt="Capa de Capitães da Areia" loading="lazy">
  <h3 class="inicio-livro__titulo">Capitães da Areia</h3>
  <p class="texto-suave inicio-livro__autor">Jorge Amado</p>
  <p class="texto-suave inicio-livro__categoria">Romance social</p>
</article>
```

O título é `<h3>` porque a seção já tem o `<h2>` "Leituras por trimestre".

## 2. Item da linha do tempo

Cada livro gera um `<li>` dentro de `#linha-do-tempo`:

```html
<li class="linha-tempo__item">
  <span class="linha-tempo__marcador"></span>
  <div class="linha-tempo__conteudo">
    <img class="capa linha-tempo__capa" src="https://raw.githubusercontent.com/techcomkathia/nexo-literario-imagens/main/img/03_captaes_da_areia.jpg"
         alt="Capa de Capitães da Areia" loading="lazy">
    <div>
      <p class="sobretitulo">Março</p>
      <h3 class="linha-tempo__titulo">Capitães da Areia</h3>
      <p class="linha-tempo__autor">Jorge Amado</p>
      <p class="linha-tempo__categoria">Publicado em 1937</p>
      <p class="texto-suave linha-tempo__sinopse">Em Salvador, um grupo de meninos...</p>
    </div>
  </div>
</li>
```

O `<span class="linha-tempo__marcador">` é a bolinha sobre a linha vertical;
ele não tem texto.

## Capa indisponível

Quando o livro não tiver caminho de capa, crie no lugar da `<img>` um elemento
com as classes `capa capa-indisponivel` mais a classe do lugar
(`inicio-livro__capa` ou `linha-tempo__capa`), o texto "Capa indisponível",
`role="img"` e `aria-label` com "Capa de [título]":

```html
<div class="capa capa-indisponivel linha-tempo__capa" role="img"
     aria-label="Capa de Capitães da Areia">Capa indisponível</div>
```

Não crie links para páginas individuais nesta etapa.

## 3. Cartão de plano

Cada objeto de `PLANOS` gera um `<article>` dentro de `#lista-planos`.
Exemplo do Semestral, que vem com `destaque: true`:

```html
<article class="precos__plano precos__plano--destaque">
  <p class="precos__selo">Mais escolhido</p>
  <h2 class="precos__nome-plano">Semestral</h2>
  <p class="precos__resumo">Ciclo de 6 meses</p>
  <p class="precos__valor">R$ 64,90<span class="precos__periodo">/mês</span></p>
  <p class="precos__detalhes">6× no cartão · total de R$ 389,40</p>
  <div class="precos__avista">
    <p>ou <strong>R$ 350,46</strong> à vista</p>
    <p class="precos__economia">Economize R$ 38,94 (10%)</p>
  </div>
  <ul class="precos__beneficios">
    <li>6 livros, um por mês</li>
    <li>Nota editorial exclusiva</li>
    <li>Encontros mensais de leitura</li>
  </ul>
</article>
```

- **Destaque**: só quando `destaque` for `true`, acrescente a classe
  `precos__plano--destaque` e o selo `<p class="precos__selo">` como primeiro
  item. Nos outros planos, não crie o selo.
- **Valores**: o preço grande é a parcela (`valorDaParcela`). O total, o valor
  à vista e a economia são calculados (veja `docs/02-dados-e-calculos.md`).
- **Benefícios**: são uma lista de dados; crie um `<li>` para cada item. O
  ícone de check vem do CSS, não precisa criar.
- **Títulos**: o nome do plano é `<h2>` porque a página tem o `<h1>` "Escolha
  seu plano".

## 4. Lista vazia

Cada página tem um aviso para quando não houver dados: `#livros-vazio` na
Home e `#planos-vazio` em Planos. Mostre o aviso **ou** o conteúdo, nunca os
dois. O conteúdo (`#carrossel-trimestres`, `#linha-do-tempo-secao` e
`#lista-planos`) começa com `hidden` e só aparece depois de montado.

Consulte `comportamento-interativo.md` para a sequência esperada.
