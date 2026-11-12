# Nexo Literário · Programação e planos

Atividade individual da unidade **Frontend dinâmico com JavaScript** (M3U2).
Você vai transformar listas de dados em interface: a programação de livros de
um clube de leitura vira um carrossel por trimestre e uma linha do tempo, e os
planos de assinatura viram cartões de preço.

O HTML, o CSS e os dados já vêm prontos. **O projeto inteiro é JavaScript.**

![Home: carrossel por trimestre e linha do tempo](referencias/01-inicio.png)

As outras referências estão em `referencias/`: a página Planos
(`02-planos.png`) e as duas telas no celular (`03-inicio-celular.png` e
`04-planos-celular.png`).

---

## Antes de começar

1. Faça o fork deste repositório para a sua conta, clone o **seu** fork e só
   então comece a desenvolver. Se tiver dúvida, o passo a passo está no fim
   deste arquivo.
2. Abra a pasta no VS Code e rode a página com a extensão **Live Server**
   (botão *Go Live*, no canto de baixo).
3. Abra o console do navegador (F12 › Console), digite `LIVROS` e aperte
   Enter. A lista com os 12 livros deve aparecer. Faça o mesmo com `PLANOS`.
   Explore os objetos antes de escrever código.

Não precisa instalar nada além do VS Code e do Live Server. As capas dos
livros vêm da internet, então mantenha a conexão ligada.

## O briefing

O **Nexo Literário** é um clube de leitura por assinatura, com curadoria
editorial independente: um livro por mês, doze por ano. Até hoje, cada mudança
na programação ou nos preços exigia editar o HTML à mão.

O pedido da editora: "quero trocar um livro ou um preço nos dados e ver o site
mudar sozinho. E quero que a Home mostre a programação de dois jeitos: o que
vem nos próximos meses, em destaque, e o ano inteiro, com calma, para quem quer
conhecer cada livro".

A designer já entregou as páginas montadas, e a equipe já organizou os dados
em `dados/`. Falta ligar uma coisa à outra. Esse é o seu trabalho.

O texto completo do pedido e os planos de referência estão em
`docs/01-briefing-do-cliente.md`.

## O que o site precisa fazer

**Home (`index.html`)**, a partir da lista `LIVROS`:

1. **Carrossel "Leituras por trimestre"**: um slide por trimestre (Jan – Mar,
   Abr – Jun, Jul – Set, Out – Dez), cada um com os cartões dos livros daquele
   trimestre: mês, capa, título, autor e categoria. Setas de anterior e
   próxima, pontos de paginação, e volta ao início depois do último.
2. **Linha do tempo "As leituras do ano"**: os 12 livros em ordem, cada um com
   a capa ao lado do mês, título, autor, ano de publicação e descrição.

**Planos (`planos.html`)**, a partir da lista `PLANOS`:

3. **Cartões de preço**: nome, duração, preço da parcela, total parcelado,
   valor à vista com a economia, benefícios e o selo "Mais escolhido" no plano
   em destaque. Os valores são **calculados** a partir dos dados.

E nas duas páginas:

4. **Lista vazia**: se não houver dados, aparece o aviso da página no lugar do
   conteúdo.
5. **Menu** que abre e fecha no celular.

O comportamento de cada item, em detalhe, está em
`comportamento-interativo.md`. **Esse documento é a sua especificação**: leia
inteiro antes de escrever a primeira linha.

## O que você recebe

```
nexo-literario/
├── css/
│   ├── style.css .................. estilo pronto (não edite; veja "Regras")
│   └── README.md .................. guia das classes do estilo
├── dados/
│   ├── livros.js .................. constante LIVROS: a programação do ano
│   └── planos.js .................. constante PLANOS: os planos de assinatura
├── docs/
│   ├── 01-briefing-do-cliente.md .. pedido e planos de referência
│   ├── 02-dados-e-calculos.md ..... formato dos dados, meses e contas dos preços
│   ├── 03-componentes.md .......... HTML dos pedaços que o seu JS vai criar
│   └── 04-guia-dos-dados.md ....... como os dados chegam à página e como testar
├── referencias/
│   ├── 01-inicio.png .............. Home esperada em tela larga
│   ├── 02-planos.png .............. Planos esperada em tela larga
│   ├── 03-inicio-celular.png ...... Home esperada no celular
│   └── 04-planos-celular.png ...... Planos esperada no celular
├── index.html ..................... Home (pronta, sem os dados)
├── planos.html .................... Planos (pronta, sem os dados)
├── comportamento-interativo.md .... como cada página deve reagir
└── README.md ...................... este arquivo
```

As capas e a foto da abertura não estão no projeto: ficam hospedadas no GitHub,
e os dados já trazem o link de cada uma.

## O que você entrega

1. A pasta `js/` com os três arquivos que os HTMLs já chamam:

   ```
   js/
   ├── comum.js ..... menu do celular e funções usadas pelas duas páginas
   ├── inicio.js .... Home: monta o carrossel e a linha do tempo
   └── planos.js .... Planos: calcula os valores e monta os cartões
   ```

   Os scripts são comuns, não módulos. A ordem das tags `<script>` importa:
   primeiro os dados, depois `comum.js`, depois o script da página (veja
   `docs/04-guia-dos-dados.md`).

2. O site publicado no **GitHub Pages**, com o link na descrição do
   repositório.

## Regras

1. **JavaScript puro.** Nenhuma biblioteca nem framework.
2. **Não edite o `index.html`, o `planos.html` nem o `style.css`.** Toda
   mudança na página vem do JavaScript.
3. **Os dados vêm de `LIVROS` e `PLANOS`.** Não copie as listas para dentro dos
   seus scripts, não escreva os preços prontos e não edite os dados para fazer
   o código funcionar.
4. **Dado vai para a tela com `textContent`** e atributos (`src`, `alt`),
   nunca colado dentro de `innerHTML`.
5. **O JavaScript não escreve estilo.** Nada de `elemento.style`: você liga e
   desliga classes, atributos (`aria-hidden`, `aria-current`, `aria-expanded`)
   e o `hidden`.
6. **Sem `alert()`, `confirm()` ou `prompt()`.** Toda mensagem aparece na
   própria página.
7. Você pode usar IA como tutora, com o prompt da unidade, para tirar dúvidas e
   revisar o seu código. Não pode pedir para ela fazer o projeto. Na
   apresentação, você vai explicar qualquer trecho que for apontado.

## O que você vai desenvolver

**DOM**
- Selecionar elementos e criar elementos com `createElement`
- Preencher texto com `textContent` e atributos com `src`, `alt`, `setAttribute`
- Mostrar e esconder com `hidden`

**Arrays e objetos**
- Ler propriedades de objetos e tratar as que faltam
- `sort` (numa cópia), `filter`, `map` e `forEach` para ordenar, agrupar e
  desenhar listas
- Um mesmo conjunto de dados desenhado de duas formas (carrossel e linha do tempo)

**Funções-componente**
- Funções que recebem um objeto e devolvem um elemento pronto
- Funções que recebem a lista inteira e montam a página

**Eventos e estado**
- `click` nas setas, nos pontos e no menu
- O índice do slide visível guardado em uma variável
- Trocar classes e atributos para mostrar o slide certo

**Formatação**
- Mês por extenso com `Intl.DateTimeFormat`
- Dinheiro com `toLocaleString` e contas em centavos

---

## Roteiro de estudo

Siga as etapas na ordem. Faça um commit ao fim de cada uma.

### Etapa 1 · Ponto de partida e menu

Crie `js/comum.js`, `js/inicio.js` e `js/planos.js`. Em cada script de página,
faça um `console.log(LIVROS)` ou `console.log(PLANOS)` para confirmar que os
dados chegam. Em `comum.js`, faça o menu do celular abrir e fechar, trocando o
`hidden` do `#menu-celular`, o `aria-expanded` do botão e o ícone (menu ou X).

`querySelector` · `addEventListener` · `setAttribute` · `hidden`

### Etapa 2 · A linha do tempo

Comece pela linha do tempo, que é uma lista simples. Ordene uma **cópia** de
`LIVROS` pelo `mes` e escreva `criarItemDaLinhaDoTempo(livro)`, que **recebe um
livro e devolve um `<li>`** (modelo em `docs/03-componentes.md`). Coloque um
item para cada livro em `#linha-do-tempo` e tire o `hidden` da seção.

Escreva também `formatarMes(mes)` (`docs/02-dados-e-calculos.md`) e uma função
para a capa, que devolve a `<img>` ou o marcador "Capa indisponível".

`[...lista].sort` · `createElement` · `textContent` · `append` · `Intl.DateTimeFormat`

### Etapa 3 · O carrossel

Agrupe os livros por trimestre (`filter` com `Math.floor((mes - 1) / 3)`).
Para cada trimestre, monte um slide com o rótulo e a grade de cartões
(`criarCartaoDoLivro(livro)`). Monte também as setas e um ponto por trimestre.

Guarde em uma variável o índice do slide visível. Uma função `mostrar(indice)`
liga a classe `--ativo` no slide e no ponto certos e desliga nos outros. As
setas e os pontos só chamam `mostrar` com o índice novo. Para dar a volta,
use o resto da divisão: `(indice + total) % total`.

`filter` · `map` · `classList.toggle` · `aria-hidden` · `aria-current` · `%`

### Etapa 4 · Os planos

Em `planos.js`, faça as contas em centavos, como mostra
`docs/02-dados-e-calculos.md`, e confira com a tabela de valores esperados.
Depois, escreva `criarCartaoDoPlano(plano)` seguindo o modelo de
`docs/03-componentes.md`. O selo "Mais escolhido" só aparece quando `destaque`
for `true`.

`Math.round` · `toLocaleString` · `createElement` · `classList.add`

### Etapa 5 · Casos difíceis e acabamento

Faça os testes da seção "Testar os casos difíceis" de
`docs/04-guia-dos-dados.md`: lista vazia, livro sem capa, campos ausentes e
trimestre sem livros. Desfaça cada alteração nos dados depois do teste.

Compare as duas páginas com as imagens de `referencias/`, em tela larga e no
celular. Passe pela lista de entrega e publique no GitHub Pages.

---

## Desafios extras (opcionais)

Só depois que tudo da lista de entrega estiver funcionando.

- **Teclado no carrossel**: as setas ← e → do teclado trocam o slide quando o
  foco estiver nele.
- **Troca automática**: o carrossel avança sozinho a cada 6 segundos e para
  quando o mouse está em cima. Procure por `setInterval` e `clearInterval`.
  Respeite quem pediu menos movimento (`prefers-reduced-motion`).
- **Título com a contagem**: "As leituras do ano" vira "As 12 leituras de
  2026", com o número vindo da lista.
- **Filtro por categoria** na linha do tempo, com botões criados a partir das
  categorias que existem nos dados.

## Lista de entrega

- [ ] A Home monta o carrossel e a linha do tempo a partir de `LIVROS`
- [ ] O carrossel tem um slide por trimestre, com setas, pontos e volta ao início
- [ ] A linha do tempo tem os 12 livros em ordem, com capa, mês, título, autor, ano e descrição
- [ ] Planos mostra os valores da tabela de `docs/02-dados-e-calculos.md`
- [ ] O selo "Mais escolhido" aparece só no plano com `destaque: true`
- [ ] Com `LIVROS` ou `PLANOS` vazios, aparece o aviso da página
- [ ] Nenhum `undefined` ou `null` aparece na tela, nem em livro sem capa ou sinopse
- [ ] O menu abre e fecha no celular
- [ ] Nenhuma lista copiada no código, nenhum `innerHTML` com dados e nenhum `.style` no JS
- [ ] As páginas ficam parecidas com as referências em tela larga e no celular
- [ ] Nenhum erro vermelho no console
- [ ] O site está publicado no GitHub Pages

## Critérios de avaliação

| Critério | Peso |
| --- | --- |
| Carrossel: agrupamento por trimestre, navegação e acessibilidade | 30% |
| Linha do tempo e cartões de livro, com dados que faltam tratados | 25% |
| Planos: cálculos em centavos, formatação e destaque | 20% |
| Lista vazia, menu e fidelidade às referências | 10% |
| Organização: funções-componente, nomes claros, sem repetição | 15% |

---

## Como fazer o fork

**1. Faça o fork.** No topo desta página, clique em **Fork** e, na tela
seguinte, em **Create fork**. O endereço passa a ter o seu usuário.

**2. Clone a SUA cópia.** Confira que o endereço tem o seu usuário, não o da
professora, e clone:

```
git clone https://github.com/SEU-USUARIO/nexo-literario.git
cd nexo-literario
```

**3. Trabalhe e envie.** Faça commits pequenos, um por etapa do roteiro:

```
git add .
git commit -m "etapa 2: linha do tempo"
git push
```

**4. Publique.** No seu repositório, abra *Settings › Pages*, escolha a branch
`main` e a pasta `/ (root)` e salve. Em um ou dois minutos, o link aparece no
topo da mesma tela.

---

**Fontes de consulta:** [MDN: manipulando documentos](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents),
[MDN: Array](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array),
[MDN: Intl.DateTimeFormat](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat),
[MDN: Number.prototype.toLocaleString](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).
