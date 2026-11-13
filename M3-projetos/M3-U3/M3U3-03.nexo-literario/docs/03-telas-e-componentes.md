# Telas e componentes · Nexo Literário

Como a aplicação se organiza: a estrutura de pastas sugerida, a árvore de
componentes, onde mora cada estado, o contrato do `ClubeContext` e a marcação
de cada tela em JSX, com as classes do `style.css`.

Os nomes de componentes e pastas abaixo são **sugestões**. Você pode dividir
diferente, desde que consiga explicar a sua divisão no README. A marcação
(classes e estrutura) é a que dá o visual das imagens de referência.

Os exemplos mostram **o resultado** para um livro ou plano específico, com os
textos já preenchidos. No seu componente, esses textos vêm das props e do
estado.

---

## 1. Estrutura de pastas sugerida

```
src/
├── main.jsx ................ monta o React, o ClubeProvider e o Router; importa o CSS
├── style.css
├── rotas.jsx ............... a tabela de rotas
├── contexts/
│   └── ClubeContext.jsx .... livros e planos, buscados uma vez
├── services/
│   └── api.js .............. todas as chamadas à API
├── utils/
│   ├── formatar.js ......... mês por extenso, valor em reais, nota
│   ├── programacao.js ...... agrupar por trimestre, livros do histórico, anterior e próximo
│   ├── precos.js ........... contas dos planos, em centavos
│   └── validar.js .......... regras do formulário de assinatura
├── components/ ............. peças reaproveitadas
│   ├── Icones.jsx .......... pronto (veio em recursos/)
│   ├── Layout.jsx
│   ├── Topo.jsx
│   ├── Rodape.jsx
│   ├── CapaLivro.jsx
│   ├── CartaoLivro.jsx
│   ├── ItemLinhaDoTempo.jsx
│   ├── Carrossel.jsx
│   ├── Estrelas.jsx
│   ├── CartaoPlano.jsx
│   └── MensagemDeErro.jsx .. texto de erro + "Tentar de novo"
└── pages/ .................. uma por rota
    ├── Inicio.jsx
    ├── Clube.jsx
    ├── Livro.jsx
    ├── Assinar.jsx
    └── NaoEncontrada.jsx
```

> **Regra prática para separar:** se aparece em mais de uma tela, é
> componente. Se é uma tela inteira, é página. Se não desenha nada (formata,
> calcula, valida), é função em `utils/`. Se conversa com a API, fica em
> `services/`.

Muitas funções de `utils/` você **já escreveu** no M3U2-02: `formatarMes`, o
agrupamento por trimestre (`Math.floor((mes - 1) / 3)`) e as contas em
centavos. Traga-as para cá e exporte com `export function`.

## 2. Árvore de componentes

```
<ClubeProvider>
  <RouterProvider>
    <Layout>                          Topo + <main><Outlet /></main> + Rodapé
      /                <Inicio>        Carrossel > CartaoLivro > CapaLivro
                                       ItemLinhaDoTempo > CapaLivro
      /clube           <Clube>         Carrossel > (livro do histórico) > CapaLivro + Estrelas
                                       CartaoPlano
      /livros/:identificador <Livro>   CapaLivro + ficha + navegação
      /assinar         <Assinar>       formulário + resumo (ou a confirmação)
      *                <NaoEncontrada>
```

Repare: o **mesmo `Carrossel`** aparece na Início e no Clube, e a **mesma
`CapaLivro`** aparece em quatro lugares, cada um com a sua classe.

### Onde fica cada estado

| Estado | Onde | Por quê |
| --- | --- | --- |
| livros, planos, carregando, erro | `ClubeContext` | Início, Clube, Livro e Assinar usam |
| menu do celular aberto ou fechado | `Topo` | só ele usa |
| slide visível | `Carrossel` | cada carrossel tem o seu, independente do outro |
| o livro da página, carregando, erro | `Livro` | depende do identificador da URL |
| plano escolhido | **na URL** (`useSearchParams`) | o link do Clube já chega com o plano, e recarregar mantém a escolha |
| campos, erros, enviando, falha, assinatura criada | `Assinar` | só ela usa |
| resumo da assinatura | **em lugar nenhum** | é calculado a cada render a partir dos campos e do plano |

> **Estado derivado.** Se um valor pode ser calculado a partir de outro estado
> (o total à vista, o texto do resumo, os trimestres a partir dos livros),
> **não crie um `useState` para ele**. Calcule no corpo do componente. Dois
> estados que precisam "andar juntos" sempre acabam desencontrando.

## 3. O `ClubeContext`

```jsx
const { livros, planos, carregando, erro, recarregar } = useContext(ClubeContext);
```

| Valor | Tipo | O que é |
| --- | --- | --- |
| `livros` | lista | os livros da API, **já ordenados por `mes`** |
| `planos` | lista | os planos da API, na ordem em que vieram |
| `carregando` | booleano | `true` até as duas listas chegarem |
| `erro` | booleano | `true` se alguma das duas buscas falhou |
| `recarregar` | função | busca as duas listas de novo (é o "Tentar de novo") |

O Provider busca as duas coleções em um `useEffect` que roda **uma vez**, ao
abrir o site. Dá para buscar as duas ao mesmo tempo com
`Promise.all([listarLivros(), listarPlanos()])`.

A página do livro continua buscando **o próprio livro** na API (pelo
identificador). Do contexto, ela usa a lista para descobrir o anterior e o
próximo.

---

## 4. Layout: topo, conteúdo e rodapé

```jsx
<>
  <Topo />
  <main className="conteudo-principal">
    <Outlet />
  </main>
  <Rodape />
</>
```

### Topo

```jsx
<header className="cabecalho">
  <div className="cabecalho__interno">
    <Link to="/" className="cabecalho__marca">Nexo Literário</Link>

    <nav className="cabecalho__navegacao">
      <NavLink to="/" end className="cabecalho__link">Início</NavLink>
      <NavLink to="/clube" className="cabecalho__link">O Clube</NavLink>
      <Link to="/assinar" className="cabecalho__assinar">Assinar</Link>
    </nav>

    <button
      className="cabecalho__botao-menu"
      type="button"
      aria-label="Abrir menu"
      aria-expanded="false"
      aria-controls="menu-celular"
    >
      <IconeMenu />
    </button>
  </div>

  {/* só existe com o menu aberto */}
  <nav id="menu-celular" className="cabecalho__menu-celular">
    <Link to="/">Início</Link>
    <Link to="/clube">O Clube</Link>
    <Link to="/assinar" className="cabecalho__assinar-celular">Assinar</Link>
  </nav>
</header>
```

- Com o menu aberto: `<IconeFechar />`, `aria-label="Fechar menu"` e
  `aria-expanded="true"`.
- O `end` no `NavLink` de Início faz ele ficar ativo **só** em `/`, e não em
  todas as rotas.
- O CSS só mostra o botão e o menu do celular em telas estreitas.

### Rodapé

```jsx
<footer className="rodape">
  <div className="rodape__interno">
    <div>
      <span className="rodape__marca">Nexo Literário</span>
      <p className="rodape__slogan">Onde grandes histórias nos conectam.</p>
    </div>
    <nav className="rodape__navegacao">
      <NavLink to="/" end>Início</NavLink>
      <NavLink to="/clube">O Clube</NavLink>
      <NavLink to="/assinar">Assinar</NavLink>
    </nav>
  </div>
  <div className="rodape__direitos">
    Nexo Literário · Curadoria editorial independente · © 2026
  </div>
</footer>
```

---

## 5. Peças de livro

### Capa (`CapaLivro`)

Recebe o livro e a classe do lugar onde aparece (`inicio-livro__capa`,
`linha-tempo__capa`, `historico-clube__capa` ou `pagina-livro__capa`).

```jsx
{/* com capa */}
<img
  className="capa inicio-livro__capa"
  src="https://raw.githubusercontent.com/techcomkathia/nexo-literario-imagens/main/img/03_captaes_da_areia.jpg"
  alt="Capa de Capitães da Areia"
  loading="lazy"
  width="672"
  height="992"
/>

{/* sem capa */}
<div className="capa capa-indisponivel inicio-livro__capa" role="img" aria-label="Capa de Capitães da Areia">
  Capa indisponível
</div>
```

### Cartão do carrossel (`CartaoLivro`)

```jsx
<article className="inicio-livro">
  <p className="sobretitulo inicio-livro__mes">Março</p>
  <CapaLivro livro={livro} className="inicio-livro__capa" />
  <h3 className="inicio-livro__titulo">Capitães da Areia</h3>
  <p className="texto-suave inicio-livro__autor">Jorge Amado</p>
  <p className="texto-suave inicio-livro__categoria">Romance social</p>
  <Link to="/livros/capitaes-da-areia" className="link-texto">Ver detalhes</Link>
</article>
```

### Item da linha do tempo (`ItemLinhaDoTempo`)

```jsx
<li className="linha-tempo__item">
  <span className="linha-tempo__marcador"></span>
  <div className="linha-tempo__conteudo">
    <CapaLivro livro={livro} className="linha-tempo__capa" />
    <div>
      <p className="sobretitulo">Março</p>
      <h3 className="linha-tempo__titulo">Capitães da Areia</h3>
      <p className="linha-tempo__autor">Jorge Amado</p>
      <p className="linha-tempo__categoria">Romance social</p>
      <p className="texto-suave linha-tempo__sinopse">Em Salvador, um grupo de meninos...</p>
      <Link to="/livros/capitaes-da-areia" className="link-texto">Ver detalhes</Link>
    </div>
  </div>
</li>
```

---

## 6. O `Carrossel`

O `Carrossel` **não sabe o que está mostrando**. Ele recebe:

| Prop | Exemplo | Para quê |
| --- | --- | --- |
| `itens` | `[{ rotulo: "Jan – Mar", conteudo: <>...</> }, ...]` | um objeto por slide; `conteudo` é JSX |
| `nome` | `"trimestre"` | completa os `aria-label` das setas e dos pontos |
| `className` | `"inicio-programacao__carrossel"` | classe extra do lugar (opcional) |

O resultado, com o primeiro slide visível:

```jsx
<div
  className="carrossel inicio-programacao__carrossel"
  role="region"
  aria-roledescription="carrossel"
  aria-label="Leituras por trimestre"
>
  <button className="carrossel__controle carrossel__controle--anterior" type="button" aria-label="Anterior: trimestre">
    <span className="carrossel__icone-controle"><IconeSetaEsquerdaCurta /></span>
  </button>

  <div className="carrossel__janela" aria-live="polite">
    <div className="carrossel__item carrossel__item--ativo" aria-hidden="false">
      {/* conteudo do 1º item */}
    </div>
    <div className="carrossel__item" aria-hidden="true">
      {/* conteudo do 2º item */}
    </div>
  </div>

  <button className="carrossel__controle carrossel__controle--proximo" type="button" aria-label="Próximo: trimestre">
    <span className="carrossel__icone-controle"><IconeSetaDireitaCurta /></span>
  </button>

  <div className="carrossel__paginacao" role="group" aria-label="Selecionar trimestre">
    <button className="carrossel__ponto carrossel__ponto--ativo" type="button" aria-label="Mostrar Jan – Mar" aria-current="true"></button>
    <button className="carrossel__ponto" type="button" aria-label="Mostrar Abr – Jun"></button>
  </div>
</div>
```

- Todos os slides são renderizados; o CSS esconde os que não têm
  `carrossel__item--ativo`.
- Para tirar um atributo, passe `undefined`: `aria-current={ativo ? "true" : undefined}`.
- Para juntar classes: ``className={`carrossel__ponto ${ativo ? "carrossel__ponto--ativo" : ""}`}``.

### O conteúdo de um slide na Início

```jsx
<>
  <p className="sobretitulo rotulo-trimestre">Jan – Mar</p>
  <div className="inicio-grade-livros">
    {/* um <CartaoLivro> por livro do trimestre */}
  </div>
</>
```

### O conteúdo de um slide no Clube

```jsx
<>
  <p className="sobretitulo rotulo-trimestre">Jan – Mar</p>
  <div className="historico-clube__grade">
    <article className="historico-clube__livro">
      <p className="sobretitulo texto-suave">Janeiro</p>
      <div className="historico-clube__detalhe-livro">
        <CapaLivro livro={livro} className="historico-clube__capa" />
        <div className="historico-clube__texto-livro">
          <h3 className="historico-clube__titulo-livro">A Cabeça do Santo</h3>
          <p className="texto-suave historico-clube__autor">Socorro Acioli</p>
          <p className="texto-suave historico-clube__categoria">Realismo mágico</p>
          <div className="historico-clube__avaliacao">
            <Estrelas nota={4.8} />
            <span className="historico-clube__valor-avaliacao" aria-label="Nota 4.8 de 5 estrelas">4.8 / 5</span>
          </div>
          <p className="texto-suave historico-clube__legenda-avaliacao">Média dos assinantes</p>
          <Link to="/livros/a-cabeca-do-santo" className="link-texto">Ver detalhes</Link>
        </div>
      </div>
    </article>
    {/* ... um article por livro do trimestre */}
  </div>
</>
```

### `Estrelas`

```jsx
<span className="historico-clube__estrelas" aria-hidden="true">
  <IconeEstrela preenchimento={1} />
  <IconeEstrela preenchimento={1} />
  <IconeEstrela preenchimento={1} />
  <IconeEstrela preenchimento={1} />
  <IconeEstrela preenchimento={0.8} />
</span>
```

Gere as cinco com `map` a partir da nota. A conta está em
`04-dados-e-calculos.md`.

---

## 7. Início (`pages/Inicio.jsx`)

```jsx
<div className="pagina-inicio">
  <section className="inicio-destaque">
    <img src="https://raw.githubusercontent.com/techcomkathia/nexo-literario-imagens/main/img/hero.jpg" alt="" width="1600" height="912" className="inicio-destaque__imagem" />
    <div className="inicio-destaque__sobreposicao"></div>
    <div className="inicio-destaque__conteudo conteiner">
      <h1 className="inicio-destaque__titulo">Nexo Literário</h1>
      <p className="inicio-destaque__descricao">
        Onde grandes histórias nos conectam. Descubra ciclos mensais de leitura criteriosamente
        selecionados.
      </p>
      <Link to="/clube" className="botao inicio-destaque__botao">Ver investimento</Link>
    </div>
  </section>

  <section className="inicio-programacao">
    <div className="conteiner">
      <div className="inicio-programacao__cabecalho">
        <div>
          <p className="sobretitulo">A programação</p>
          <h2 className="titulo-secao">Leituras por trimestre</h2>
        </div>
      </div>
      {/* carregando, erro, vazio ou o <Carrossel> */}
    </div>
  </section>

  {/* só com livros */}
  <section className="linha-tempo" aria-labelledby="titulo-linha-do-tempo">
    <p className="sobretitulo">Programação demonstrativa de 2026</p>
    <h2 id="titulo-linha-do-tempo" className="titulo-secao">As 12 leituras de 2026</h2>
    <ol className="linha-tempo__lista">
      {/* um <ItemLinhaDoTempo> por livro */}
    </ol>
  </section>

  <section className="inicio-chamada">
    <div className="inicio-chamada__interno">
      <h2>Sua próxima grande leitura começa aqui.</h2>
      <p>Junte-se a leitores que escolheram ler com intenção, um livro de cada vez.</p>
      <Link to="/assinar" className="botao inicio-chamada__botao">Quero participar</Link>
    </div>
  </section>
</div>
```

### Avisos de estado (em todas as telas)

```jsx
{/* carregando */}
<p className="texto-suave" role="status">Carregando a programação…</p>

{/* vazio */}
<p className="texto-suave">Nenhum livro está disponível no momento.</p>

{/* erro: o componente MensagemDeErro */}
<div role="alert">
  <p>Não foi possível carregar a programação.</p>
  <button className="botao botao--primario" type="button">Tentar de novo</button>
</div>
```

---

## 8. O Clube (`pages/Clube.jsx`)

```jsx
<div className="pagina-clube conteiner">
  <section aria-labelledby="titulo-clube">
    <p className="sobretitulo">O Clube</p>
    <h1 id="titulo-clube" className="pagina-clube__titulo">Mais do que ler. Uma forma de descobrir.</h1>
    <div className="pilares-clube">
      <div className="pilar-clube">
        <IconeLivroAberto />
        <h2 className="pilar-clube__titulo">Curadoria</h2>
        <p className="texto-suave pilar-clube__texto">
          Obras escolhidas com cuidado, de clássicos a vozes contemporâneas.
        </p>
      </div>
      {/* Programação (IconeCalendario) e Valorização da obra (IconePena) */}
    </div>
  </section>

  <section aria-labelledby="titulo-encontros" className="encontros-clube">
    <div>
      <p className="sobretitulo">Encontros mensais</p>
      <h2 id="titulo-encontros" className="encontros-clube__titulo">
        Uma conversa sobre o livro, de qualquer lugar.
      </h2>
    </div>
    <div className="texto-suave encontros-clube__texto">
      <p>Os encontros acontecem remotamente...</p>
      <p>Depois de cada encontro...</p>
    </div>
  </section>

  <section aria-labelledby="titulo-livros-lidos" className="historico-clube">
    <div>
      <p className="sobretitulo">Histórico do clube</p>
      <h2 id="titulo-livros-lidos" className="titulo-secao">Livros já lidos</h2>
    </div>
    <div className="historico-clube__carrossel">
      {/* carregando, erro ou o <Carrossel> */}
    </div>
    <p className="texto-suave historico-clube__aviso">
      As notas exibidas são demonstrativas; as avaliações dos assinantes serão registradas após
      os encontros.
    </p>
  </section>

  <section id="planos" className="investimento-clube pagina-planos" aria-labelledby="titulo-planos">
    <p className="sobretitulo">Ciclos de leitura</p>
    <h2 id="titulo-planos" className="titulo-secao">Escolha seu plano</h2>
    <p className="texto-suave">Um ciclo completo de histórias, com curadoria e encontros mensais.</p>

    {/* carregando, erro, vazio ou a grade */}
    <div className="precos__grade" aria-live="polite">
      {/* um <CartaoPlano> por plano */}
    </div>

    <p className="precos__observacao">
      O plano termina ao fim do ciclo e não renova automaticamente. O pagamento parcelado é feito no cartão.
    </p>
  </section>
</div>
```

Os textos completos dos pilares e dos encontros estão em
`comportamento-interativo.md`.

### `CartaoPlano`

A mesma marcação do cartão da página Planos do M3U2-02: o que o seu
`criarCartaoDoPlano` criava vira o JSX do componente. O Semestral, que vem com
`destaque: true`:

```jsx
<article className="precos__plano precos__plano--destaque">
  <p className="precos__selo">Mais escolhido</p>
  <h3 className="precos__nome-plano">Semestral</h3>
  <p className="precos__resumo">Ciclo de 6 meses</p>
  <p className="precos__valor">
    R$ 64,90<span className="precos__periodo">/mês</span>
  </p>
  <p className="precos__detalhes">6× no cartão · total de R$ 389,40</p>
  <div className="precos__avista">
    <p>ou <strong>R$ 350,46</strong> à vista</p>
    <p className="precos__economia">Economize R$ 38,94 (10%)</p>
  </div>
  <ul className="precos__beneficios">
    <li>6 livros, um por mês</li>
    <li>Nota editorial exclusiva</li>
    <li>Encontros mensais de leitura</li>
  </ul>
  <Link to="/assinar?plano=semestral" className="precos__acao">Assinar semestral</Link>
</article>
```

- **Destaque:** só quando `destaque` for `true`, o `article` ganha
  `precos__plano--destaque` e o selo vem como primeiro item. Nos outros planos,
  o selo não existe.
- **Benefícios:** um `<li>` por item da lista da API. O ícone de check vem do
  CSS; não crie.
- **Títulos:** no M3U2 o nome do plano era `<h2>`, porque a página tinha o
  `<h1>` "Escolha seu plano". Aqui ele é `<h3>`: a página já tem o `<h1>` do
  Clube, e "Escolha seu plano" virou `<h2>`.
- **Botão:** é a única peça nova em relação ao M3U2-02. O CSS já o coloca no pé
  do cartão, alinhado nos três.

> **A `<section>` precisa da classe `pagina-planos`.** O CSS tem dois visuais
> para as classes `precos__...`: o do M3U2-02, que só vale dentro de
> `.pagina-planos`, e um antigo, de fora. Se os cartões aparecerem diferentes
> da referência, é essa classe que está faltando.

---

## 9. Livro (`pages/Livro.jsx`)

```jsx
<div className="pagina-livro conteiner">
  <Link to="/" className="pagina-livro__voltar">
    <IconeSetaEsquerda />
    Voltar à programação
  </Link>

  {/* carregando */}
  <p className="pagina-livro__secao texto-suave" role="status">Carregando o livro…</p>

  {/* não encontrado ou erro */}
  <div className="pagina-livro__secao" role="alert">
    <h2>Livro não encontrado</h2>
    <p className="texto-suave">Este livro não está mais na programação do clube.</p>
    {/* só no erro: */}
    <p>
      <button type="button" className="botao botao--primario">Tentar de novo</button>
    </p>
  </div>

  {/* com o livro */}
  <div className="pagina-livro__grade">
    <div>
      <CapaLivro livro={livro} className="pagina-livro__capa" />
      <dl className="pagina-livro__ficha">
        <div>
          <dt className="sobretitulo texto-suave">Páginas</dt>
          <dd>296</dd>
        </div>
        <div>
          <dt className="sobretitulo texto-suave">Ano</dt>
          <dd>1937</dd>
        </div>
        <div>
          <dt className="sobretitulo texto-suave">Idioma</dt>
          <dd>Português</dd>
        </div>
        <div>
          <dt className="sobretitulo texto-suave">Avaliação</dt>
          <dd>4.9 / 5</dd>
        </div>
      </dl>
    </div>
    <div>
      <p className="sobretitulo">Março</p>
      <h1 className="pagina-livro__titulo">Capitães da Areia</h1>
      <p className="pagina-livro__autor">Jorge Amado</p>
      <p className="pagina-livro__categoria">Romance social</p>
      <section className="pagina-livro__secao">
        <h2>Sinopse</h2>
        <p className="texto-suave">Em Salvador, um grupo de meninos...</p>
      </section>
      <section className="pagina-livro__secao">
        <h2>Nota editorial</h2>
        <p className="texto-suave">Uma história que confronta o leitor...</p>
      </section>
      <section className="pagina-livro__secao">
        <h2>Sobre o autor</h2>
        <p className="texto-suave">Jorge Amado foi um dos mais importantes...</p>
      </section>
    </div>
  </div>

  {/* com o livro: anterior e próximo */}
  <nav className="pagina-livro__navegacao" aria-label="Outros livros">
    <Link to="/livros/a-resposta" className="pagina-livro__link-navegacao">
      <IconeSetaEsquerda />
      A Resposta
    </Link>
    <Link to="/livros/a-guerra-nao-tem-rosto-de-mulher" className="pagina-livro__link-navegacao">
      A Guerra Não Tem Rosto de Mulher
      <IconeSetaDireita />
    </Link>
  </nav>
</div>
```

- No primeiro livro, troque o link do anterior por um `<span />` vazio, e no
  último faça o mesmo com o próximo. Assim o outro link continua no lado
  certo.
- O `useEffect` que busca o livro depende do `identificador`. Nele, também dá
  para voltar ao topo com `window.scrollTo(0, 0)`.

---

## 10. Assinar (`pages/Assinar.jsx`)

```jsx
<div className="pagina-assinatura conteiner">
  <form className="formulario-assinatura" noValidate>
    <h1 className="formulario-assinatura__titulo">Faça parte do Nexo Literário</h1>

    <fieldset className="formulario-assinatura__grupo">
      <legend className="sobretitulo">1. Seus dados</legend>
      <label className="formulario-assinatura__rotulo">
        Nome completo
        <input name="nome" autoComplete="name" className="formulario-assinatura__campo" />
      </label>
      {/* E-mail (type="email") e CPF (inputMode="numeric", placeholder="000.000.000-00") */}
    </fieldset>

    <fieldset className="formulario-assinatura__grupo">
      <legend className="sobretitulo">2. Plano</legend>
      <div className="formulario-assinatura__opcoes-plano">
        <button type="button" className="formulario-assinatura__opcao" aria-pressed="false">Trimestral</button>
        <button type="button" className="formulario-assinatura__opcao formulario-assinatura__opcao--selecionada" aria-pressed="true">Semestral</button>
        <button type="button" className="formulario-assinatura__opcao" aria-pressed="false">Anual</button>
      </div>
      <div className="formulario-assinatura__opcoes-modalidade">
        <label className="formulario-assinatura__modalidade formulario-assinatura__modalidade--selecionada">
          <input type="radio" name="modalidade" value="avista" />
          <span className="formulario-assinatura__texto-modalidade">
            <span>À vista: R$ 350,46</span>
            <span className="formulario-assinatura__dica">10% de desconto · cartão, Pix ou boleto</span>
          </span>
        </label>
        <label className="formulario-assinatura__modalidade">
          <input type="radio" name="modalidade" value="parcelado" />
          <span className="formulario-assinatura__texto-modalidade">
            <span>6x de R$ 64,90 no cartão</span>
            <span className="formulario-assinatura__dica">Total de R$ 389,40 · parcelas fixas, sem renovação</span>
          </span>
        </label>
      </div>
    </fieldset>

    <fieldset className="formulario-assinatura__grupo">
      <legend className="sobretitulo">3. Pagamento</legend>
      <div className="formulario-assinatura__opcoes-pagamento">
        <button type="button" className="formulario-assinatura__opcao formulario-assinatura__opcao--selecionada" aria-pressed="true">Cartão de crédito</button>
        <button type="button" className="formulario-assinatura__opcao" aria-pressed="false">Pix</button>
        <button type="button" className="formulario-assinatura__opcao" aria-pressed="false">Boleto</button>
      </div>

      {/* só com cartão */}
      <div className="formulario-assinatura__campos-cartao">
        <label className="formulario-assinatura__rotulo">
          Número do cartão
          <input name="numeroCartao" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" className="formulario-assinatura__campo" />
        </label>
        <label className="formulario-assinatura__rotulo">
          Nome impresso no cartão
          <input name="nomeCartao" autoComplete="cc-name" className="formulario-assinatura__campo" />
        </label>
        <div className="formulario-assinatura__validade">
          <label className="formulario-assinatura__rotulo">
            Validade
            <input name="validade" autoComplete="cc-exp" placeholder="MM/AA" className="formulario-assinatura__campo" />
          </label>
          <label className="formulario-assinatura__rotulo">
            CVV
            <input name="cvv" inputMode="numeric" autoComplete="cc-csc" placeholder="123" maxLength={4} className="formulario-assinatura__campo" />
          </label>
        </div>
      </div>

      {/* só com Pix */}
      <p className="formulario-assinatura__ajuda-pagamento">
        Ao confirmar, geramos um QR Code Pix com validade de 30 minutos. A assinatura é ativada
        assim que o pagamento é aprovado.
      </p>
      {/* só com boleto */}
      <p className="formulario-assinatura__ajuda-pagamento">
        O boleto vence em 3 dias úteis. A assinatura é ativada após a compensação (até 2 dias
        úteis).
      </p>
    </fieldset>

    <label className="formulario-assinatura__termos">
      <input type="checkbox" name="aceitouTermos" />
      Li e aceito a Política de Privacidade e os Termos de Assinatura.
    </label>

    {/* só se o envio falhou */}
    <p className="formulario-assinatura__falha" role="alert">
      Não foi possível confirmar a sua assinatura. Tente de novo em alguns instantes.
    </p>

    <button type="submit" className="botao botao--primario formulario-assinatura__enviar">
      Confirmar assinatura
    </button>
  </form>

  <aside className="resumo-assinatura">
    <p className="sobretitulo">Resumo</p>
    <h2 className="resumo-assinatura__titulo">Plano Semestral</h2>
    <p className="texto-suave resumo-assinatura__descricao">6 livros · um por mês</p>
    <dl className="resumo-assinatura__linhas">
      <div>
        <dt>Valor do ciclo</dt>
        <dd>R$ 389,40</dd>
      </div>
      {/* só à vista */}
      <div className="resumo-assinatura__desconto">
        <dt>Desconto à vista (10%)</dt>
        <dd>− R$ 38,94</dd>
      </div>
    </dl>
    <div className="resumo-assinatura__total">
      <span>Total à vista</span>
      <span>R$ 350,46</span>
    </div>
    <p className="texto-suave resumo-assinatura__forma-pagamento">Forma de pagamento: Cartão de crédito</p>
  </aside>
</div>
```

No parcelado, o total fica assim:

```jsx
<div className="resumo-assinatura__total">
  <span>6 parcelas no cartão</span>
  <span className="resumo-assinatura__parcelas">6x de R$ 64,90</span>
</div>
```

### Campo com erro

O `noValidate` no `<form>` desliga os balões de erro do navegador: quem
valida e mostra as mensagens é o seu código. Um campo com erro fica assim:

```jsx
<label className="formulario-assinatura__rotulo">
  E-mail
  <input
    type="email"
    name="email"
    autoComplete="email"
    className="formulario-assinatura__campo"
    value={campos.email}
    onChange={atualizarCampo}
    aria-invalid="true"
    aria-describedby="erro-email"
  />
  <span id="erro-email" className="formulario-assinatura__erro">
    Informe um e-mail válido, como nome@exemplo.com.
  </span>
</label>
```

Sem erro, o campo não tem `aria-invalid` nem `aria-describedby`, e o `<span>`
não existe. A mensagem dos termos fica **depois** do `<label>` dos termos, e
não dentro dele.

> **Um `onChange` para todos os campos.** Com o `name` de cada campo igual à
> chave no estado, uma função só resolve:
> `setCampos({ ...campos, [evento.target.name]: evento.target.value })`. Para
> a caixa dos termos, o valor é `evento.target.checked`.

### Confirmação

No lugar do formulário e do resumo:

```jsx
<div className="confirmacao-assinatura">
  <h1>Bem-vindo ao clube!</h1>
  <p>
    Assinatura nº 1 confirmada: plano Semestral à vista, no Pix. Seu código Pix foi gerado
    (simulação). Enviaremos os detalhes para ana@exemplo.com.
  </p>
</div>
```

---

## 11. Página não encontrada (`pages/NaoEncontrada.jsx`)

```jsx
<section className="nao-encontrada">
  <div className="nao-encontrada__conteudo">
    <h1>404</h1>
    <h2>Página não encontrada</h2>
    <p>O endereço que você abriu não existe ou mudou de lugar.</p>
    <Link to="/" className="botao botao--primario">Voltar ao início</Link>
  </div>
</section>
```
