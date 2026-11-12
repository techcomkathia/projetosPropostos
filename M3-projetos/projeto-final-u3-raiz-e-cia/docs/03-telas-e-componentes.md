# Telas e componentes · Raiz & Cia

Como a aplicação se organiza: a estrutura de pastas sugerida, a árvore de
componentes, o contrato do contexto de autenticação e a marcação de cada tela
com as classes do estilo base.

Os nomes de componentes e pastas abaixo são **sugestões**. Você pode dividir
diferente, desde que consiga explicar a sua divisão no README. A marcação
(classes e estrutura) é a que dá o visual das imagens de referência.

---

## 1. Estrutura de pastas sugerida

```
src/
├── main.jsx ............... monta o React, o Router e o AuthProvider; importa o CSS
├── estilo-base.css
├── rotas.jsx .............. a tabela de rotas
├── contexts/
│   └── AuthContext.jsx .... usuário logado, entrar, cadastrar, sair
├── services/
│   └── api.js ............. todas as chamadas às duas APIs
├── utils/
│   ├── rotulos.js ......... objetos de tradução (luz, frequência, situação…)
│   ├── formatar.js ........ preço em reais, endereço resumido
│   └── validar.js ......... regras de validação dos formulários
├── components/ ............ peças reaproveitadas em mais de uma tela
│   ├── Layout.jsx
│   ├── Topo.jsx
│   ├── Rodape.jsx
│   ├── CardKit.jsx
│   ├── GradeKits.jsx
│   ├── TagSituacao.jsx
│   ├── Estado.jsx ......... carregando, vazio e erro
│   ├── Campo.jsx .......... rótulo + campo + mensagem de erro
│   ├── Modal.jsx
│   ├── Toast.jsx
│   └── RotaProtegida.jsx
└── pages/ ................. uma por rota
    ├── Inicio.jsx
    ├── Catalogo.jsx
    ├── DetalheKit.jsx
    ├── Entrar.jsx
    ├── Cadastro.jsx
    ├── Assinar.jsx
    ├── MinhaConta.jsx
    └── NaoEncontrada.jsx
```

> **Regra prática para separar:** se aparece em mais de uma tela, é
> componente. Se é uma tela inteira, é página. Se não desenha nada (traduz,
> formata, valida), é função em `utils/`. Se conversa com uma API, fica em
> `services/`.

## 2. Árvore de componentes

```
<AuthProvider>
  <RouterProvider>
    <Layout>                    Topo + <Outlet /> + Rodapé
      /               <Inicio>          GradeKits > CardKit
      /kits           <Catalogo>        barra de filtros + GradeKits > CardKit
      /kits/:id       <DetalheKit>      TagSituacao + lista de dados
      /entrar         <Entrar>          Campo × 2
      /cadastro       <Cadastro>        Campo × 4
      <RotaProtegida>
        /assinar/:kitId <Assinar>       Campo × 9 + opções + resumo
        /minha-conta    <MinhaConta>    tabela + Modal (trocar, cancelar) + Toast
      *               <NaoEncontrada>
```

### Onde fica cada estado

| Estado | Onde | Por quê |
| --- | --- | --- |
| usuário logado | `AuthContext` | o Topo, as rotas protegidas e várias páginas precisam dele |
| kits, carregando, erro do catálogo | `Catalogo` | só ele usa |
| filtros do catálogo | **na URL** (`useSearchParams`) | o link pode ser compartilhado e sobrevive ao recarregar |
| valores e erros de um formulário | na página do formulário | só ela usa |
| lista de assinaturas | `MinhaConta` | é ela que altera depois de cada ação |
| qual janela está aberta e para qual assinatura | `MinhaConta` | ela abre e decide o que fazer ao confirmar |
| menu aberto no celular | `Topo` | só ele usa |

### Props dos componentes reaproveitados

| Componente | Props |
| --- | --- |
| `CardKit` | `kit` |
| `GradeKits` | `kits`, `carregando`, `erro`, `aoTentarDeNovo`, `textoVazio` |
| `TagSituacao` | `situacao` (não desenha nada se for `disponivel`) |
| `Estado` | `tipo` (`carregando`, `vazio` ou `erro`), `titulo`, `texto`, `children` (ações) |
| `Campo` | `id`, `rotulo`, `erro`, `ajuda`, `obrigatorio`, `children` (o input) |
| `Modal` | `titulo`, `aoFechar`, `children` |
| `Toast` | `mensagem`, `tipo`, `aoSumir` |

## 3. O contexto de autenticação

O que o `AuthContext` oferece para o resto da aplicação:

```js
const { usuario, entrar, cadastrar, sair } = useContext(AuthContext)
```

| Valor | Tipo | O que é |
| --- | --- | --- |
| `usuario` | objeto ou `null` | `{ id, nome, email }` de quem está logado, **sem a senha**; `null` se ninguém estiver |
| `entrar(email, senha)` | função `async` | confere na API; deu certo, guarda o usuário; deu errado, **lança um erro** com a mensagem do briefing |
| `cadastrar({ nome, email, senha })` | função `async` | confere se o e-mail existe, cria e já deixa logado; e-mail repetido **lança um erro** |
| `sair()` | função | limpa o usuário do estado e do `localStorage` |

- O estado inicial do `usuario` já vem do `localStorage`. Assim, recarregar a
  página não desloga, e a rota protegida não pisca para o login.
- Quem chama `entrar` ou `cadastrar` usa `try`/`catch` para mostrar a mensagem
  de erro na tela.

### Rota protegida

```jsx
<RotaProtegida>
  <MinhaConta />
</RotaProtegida>
```

Sem usuário, o componente devolve um `<Navigate>` para
`/entrar?voltar=/minha-conta`. A página de login lê o `voltar` com
`useSearchParams` e, depois de entrar, navega para lá.

---

## 4. Marcação das telas

As imagens de referência estão na pasta `referencias/`. Abaixo, a estrutura de
cada tela com as classes que dão aquele visual. Em JSX, `class` vira
`className` e `for` vira `htmlFor`.

### Layout (topo e rodapé)

```jsx
<>
  <header className="topo">
    <div className="container topo__conteudo">
      <Link className="topo__marca" to="/">Raiz &amp; Cia</Link>
      <button className="topo__menu-botao" aria-expanded={menuAberto} aria-controls="menu">Menu</button>
      <nav className="topo__nav" id="menu" aria-label="Principal">
        <ul className="topo__lista">
          <li><NavLink className="topo__link" to="/kits">Kits</NavLink></li>
          <li><NavLink className="topo__link" to="/minha-conta">Minha conta</NavLink></li>
        </ul>
        <span className="texto-apoio">Olá, Maria</span>
        <button className="botao botao--texto botao--pequeno">Sair</button>
      </nav>
    </div>
  </header>

  <main>
    <Outlet />
  </main>

  <footer className="rodape">
    <div className="container rodape__conteudo">
      <p>Raiz &amp; Cia</p>
      <p>© 2026 Raiz &amp; Cia. Todos os direitos reservados.</p>
    </div>
  </footer>
</>
```

### Início

```jsx
<section className="secao">
  <div className="container destaque">
    <div className="destaque__texto">
      <h1 className="titulo-pagina">Sementes da estação, uma caixa por mês.</h1>
      <p className="texto-destaque">Escolhemos o que dá certo plantar agora…</p>
      <div className="linha">
        <Link className="botao" to="/kits">Ver os kits</Link>
        <a className="link" href="#como-funciona">Como funciona</a>
      </div>
    </div>
    <img className="destaque__imagem" src="/mudas.png" alt="…" />
  </div>
</section>

<section className="secao secao--alt">
  <div className="container">
    <div className="secao__cabecalho">
      <div className="pilha">
        <h2 className="titulo-secao">Kits da estação</h2>
        <p className="texto-apoio">Frete incluso. Troque de kit quando quiser.</p>
      </div>
      <Link className="link" to="/kits">Ver todos</Link>
    </div>
    <GradeKits … />
  </div>
</section>

<section className="secao" id="como-funciona">
  <div className="container">
    <h2 className="titulo-secao">Como funciona</h2>
    <ol className="grade">
      <li className="pilha">
        <p className="rotulo">Passo 1</p>
        <h3 className="card__titulo">Escolha o kit</h3>
        <p className="texto-apoio">…</p>
      </li>
    </ol>
  </div>
</section>
```

### Cartão de kit

```jsx
<article className="card">
  <div className="card__corpo">
    <TagSituacao situacao="sazonal" />          {/* <span className="tag tag--aviso">Sazonal</span> */}
    <h3 className="card__titulo">
      <Link to="/kits/6">Pimenta</Link>
    </h3>
    <p className="card__texto">Dedo-de-moça, biquinho e malagueta.</p>
  </div>
  <footer className="card__rodape">
    <span className="texto-apoio">3 sementes · sol pleno</span>
    <strong className="preco">R$ 92</strong>
  </footer>
</article>
```

Etiquetas: `sazonal` usa `tag--aviso`, e `lista-de-espera` usa `tag--erro` e
deixa o cartão com a classe `indisponivel`.

### Catálogo

```jsx
<section className="secao">
  <div className="container">
    <div className="secao__cabecalho">
      <div className="pilha">
        <h1 className="titulo-pagina">Kits</h1>
        <p className="texto-apoio">Frete incluso. Troque de kit quando quiser.</p>
      </div>
    </div>

    <div className="barra-filtros">
      <form className="busca" role="search">
        <label className="visualmente-oculto" htmlFor="busca">Buscar kits</label>
        <input id="busca" type="search" placeholder="Buscar por nome ou espécie" />
        <button className="botao">Buscar</button>
      </form>
      <div className="linha">
        <div className="chips" role="group" aria-label="Luz">
          <button className="chip" aria-pressed={true}>Todos</button>
          <button className="chip" aria-pressed={false}>Sol pleno</button>
          <button className="chip" aria-pressed={false}>Meia-sombra</button>
        </div>
        <div className="campo">
          <label className="visualmente-oculto" htmlFor="ordem">Ordenar</label>
          <select id="ordem">…</select>
        </div>
      </div>
    </div>

    <p className="contador">8 kits</p>
    <GradeKits … />
  </div>
</section>
```

### Página do kit

```jsx
<section className="secao">
  <div className="container container--leitura pilha">
    <Link className="link-voltar" to="/kits">Todos os kits</Link>
    <TagSituacao situacao={kit.situacao} />
    <h1 className="titulo-pagina">Cozinha</h1>
    <p className="texto-destaque">Manjericão, cebolinha, salsa e orégano.</p>
    <p><strong className="preco">R$ 79</strong> <span className="texto-apoio">por caixa</span></p>

    <dl className="lista-dados">
      <div><dt>Espécies</dt><dd>Manjericão, Cebolinha, Salsa, Orégano</dd></div>
      <div><dt>Sementes</dt><dd>4</dd></div>
      <div><dt>Luz</dt><dd>sol pleno</dd></div>
      <div><dt>Rega</dt><dd>Todo dia, de manhã</dd></div>
      <div><dt>Dificuldade</dt><dd>Fácil</dd></div>
    </dl>

    <h2 className="titulo-secao">Cuidados</h2>
    <p className="texto-apoio">…</p>

    <div className="linha">
      <Link className="botao" to="/assinar/1">Assinar este kit</Link>
    </div>
  </div>
</section>
```

Para o botão desabilitado de lista de espera, use um `<button disabled>` (um
`Link` não pode ser desabilitado) e coloque o aviso em um
`<div className="alerta alerta--aviso">`.

### Entrar e Cadastro

```jsx
<section className="secao">
  <div className="container container--leitura">
    <div className="secao__cabecalho secao__cabecalho--centro">
      <h1 className="titulo-pagina">Entrar</h1>
    </div>
    <form className="formulario" noValidate>
      <div className="alerta alerta--erro" role="alert">E-mail ou senha incorretos.</div>

      <div className="campo">
        <label className="campo__rotulo" htmlFor="email">E-mail</label>
        <input id="email" type="email" value={…} onChange={…}
               aria-invalid={!!erros.email} aria-describedby="email-erro" />
        {erros.email && <p className="campo__erro" id="email-erro">{erros.email}</p>}
      </div>

      <div className="formulario__acoes">
        <button className="botao botao--bloco" disabled={enviando}>Entrar</button>
      </div>
      <p className="texto-apoio texto-centro">Ainda não tem conta? <Link className="link" to="/cadastro">Criar conta</Link></p>
    </form>
  </div>
</section>
```

Repare no `noValidate` no formulário: ele desliga as mensagens nativas do
navegador, porque quem valida é o seu código.

### Assinar

```jsx
<form className="formulario" noValidate>
  <div className="formulario__grade">
    <fieldset className="campo campo--inteiro opcoes">
      <legend className="campo__rotulo">Frequência</legend>
      <label className="opcao">
        <input type="radio" name="frequencia" value="mensal"
               checked={form.frequencia === 'mensal'} onChange={…} disabled={sazonal} />
        Todo mês
      </label>
      …
    </fieldset>

    <div className="campo">
      <label className="campo__rotulo" htmlFor="cep">CEP</label>
      <input id="cep" inputMode="numeric" value={…} onChange={…} onBlur={…} />
      <p className="campo__ajuda">Buscando endereço…</p>
    </div>
    <div className="campo"> Número </div>
    <div className="campo campo--inteiro"> Rua </div>
    <div className="campo"> Complemento </div>
    <div className="campo"> Bairro </div>
    <div className="campo"> Cidade </div>
    <div className="campo"> UF </div>

    <div className="campo campo--inteiro"> Observação (textarea) </div>
    <label className="opcao campo--inteiro"> checkbox do calendário </label>
  </div>

  <div className="alerta">Cozinha · Todo mês · <strong>R$ 79 por mês</strong></div>

  <div className="formulario__acoes">
    <button className={enviando ? 'botao carregando' : 'botao'} disabled={enviando}>Confirmar assinatura</button>
  </div>
  <p className="texto-apoio">Confirmamos por e-mail em um dia útil. Nenhuma cobrança nesta etapa.</p>
</form>
```

### Minha conta

```jsx
<section className="secao">
  <div className="container">
    <div className="secao__cabecalho">
      <div className="pilha">
        <h1 className="titulo-pagina">Minha conta</h1>
        <p className="texto-apoio">Maria Andrade · maria@email.com</p>
      </div>
      <Link className="botao botao--contorno" to="/kits">Nova assinatura</Link>
    </div>

    <div className="tabela-rolagem">
      <table className="tabela tabela--destaque">
        <thead>
          <tr><th>Kit</th><th>Frequência</th><th>Entrega</th><th>Situação</th><th className="numero">Valor</th><th className="numero">Ações</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Cozinha</td>
            <td>Todo mês</td>
            <td>Avenida Paulista, 1578 · São Paulo/SP</td>
            <td><span className="tag tag--sucesso">Ativa</span></td>
            <td className="numero">R$ 79</td>
            <td className="numero">
              <div className="linha linha--fim">
                <button className="botao botao--texto botao--pequeno">Pausar</button>
                <button className="botao botao--texto botao--pequeno">Trocar kit</button>
                <button className="botao botao--perigo botao--pequeno">Cancelar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

### Janela de confirmação

```jsx
<div className="modal" onClick={/* fecha se o clique for no fundo */}>
  <div className="modal__janela modal__janela--estreita" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
    <button className="modal__fechar botao-icone" aria-label="Fechar">&times;</button>
    <div className="pilha">
      <h2 className="titulo-secao" id="modal-titulo">Cancelar a assinatura do kit Cozinha?</h2>
      <p className="texto-apoio">As caixas que já saíram continuam a caminho. Essa ação não pode ser desfeita.</p>
      <div className="linha linha--fim">
        <button className="botao botao--texto">Manter assinatura</button>
        <button className="botao botao--perigo">Cancelar assinatura</button>
      </div>
    </div>
  </div>
</div>
```

No React, a janela aparece com renderização condicional
(`{assinaturaParaCancelar && <Modal …>}`), sem precisar do atributo `hidden`.
Para o Esc fechar, um `useEffect` dentro do `Modal` registra o `keydown` no
`document` **e remove no retorno do efeito** (o *cleanup* da aula 5).

### Estados

```jsx
<div className="estado" role="status">
  <div className="spinner" aria-hidden="true"></div>
  <p>Carregando kit…</p>
</div>

<div className="estado estado--erro" role="alert">
  <p className="estado__titulo">Não foi possível carregar os kits.</p>
  <button className="botao botao--contorno botao--pequeno" onClick={tentarDeNovo}>Tentar de novo</button>
</div>

<article className="card esqueleto" aria-hidden="true"></article>

<div className="toast toast--sucesso" role="status">Assinatura pausada. Nenhuma caixa sai até você retomar.</div>
```
