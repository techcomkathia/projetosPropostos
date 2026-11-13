# Componentes · Jogo de Dados

Os componentes do jogo, as props de cada um e a marcação que dá o visual das
referências. As classes já estão no `estilo.css`; você só precisa usá-las.

Os exemplos mostram **o resultado** para valores específicos (o dado 4, a
soma 12). No seu componente, esses valores vêm das props.

---

## 1. A árvore

```
App ............................ estado: valores, rolagens · calculado: total
 ├── Dado valor={4}
 ├── Dado valor={2}
 ├── Dado valor={6}
 ├── Soma total={12} jaRolou={true}
 ├── BotaoRolar aoRolar={rolarDados}
 └── Rolagens quantidade={3}
```

| Componente | Props que recebe | O que desenha |
| --- | --- | --- |
| `App` | nenhuma | a mesa inteira; guarda os estados e calcula o total |
| `Dado` | `valor` (número de 1 a 6) | uma face, com um pontinho para cada número do valor |
| `Soma` | `total` (número), `jaRolou` (booleano) | o rótulo e o total, ou a dica antes da primeira rolagem |
| `BotaoRolar` | `aoRolar` (função) | o botão; no clique, chama `aoRolar` |
| `Rolagens` | `quantidade` (número) | "Nenhuma rolagem ainda", "1 rolagem", "3 rolagens" |

Repare que **só o `App` tem estado**. Os outros quatro só recebem props e
desenham. Componentes assim são fáceis de testar: basta trocar a prop e ver
se a tela muda certo.

---

## 2. `App`

```jsx
<main className="mesa">
  <header className="mesa__cabecalho">
    <h1 className="mesa__titulo">Jogo de Dados</h1>
    <p className="mesa__subtitulo">Três dados, uma soma. Boa sorte!</p>
  </header>

  <div className="dados">
    {/* os três <Dado /> */}
  </div>

  {/* <Soma />, <BotaoRolar /> e <Rolagens />, nesta ordem */}
</main>
```

A ordem dos elementos dentro de `.mesa` é a ordem em que aparecem na tela, de
cima para baixo.

---

## 3. `Dado`

O dado 4:

```jsx
<div className="dado dado--4" role="img" aria-label="Dado mostrando 4">
  <span className="dado__ponto"></span>
  <span className="dado__ponto"></span>
  <span className="dado__ponto"></span>
  <span className="dado__ponto"></span>
</div>
```

- A classe **`dado--4`** diz ao CSS **onde** colocar cada pontinho. O CSS já
  sabe o desenho das seis faces. Você só precisa colocar a classe certa e o
  **número certo** de `<span className="dado__ponto">`.
- Para montar a classe com o valor, use uma template string:
  ``className={`dado dado--${valor}`}``.
- Os pontinhos são uma lista do tamanho do `valor` (veja "Repetir algo N
  vezes" em `01-entendendo-o-react.md`). Cada um precisa de uma `key`.
- **Acessibilidade:** um leitor de tela não enxerga pontinhos. O `role="img"`
  diz que o `div` é uma imagem, e o `aria-label` diz o que ela mostra.
- **Não é bug:** o visual é de videogame dos anos 80. Os pontos são
  quadrados (pixels grandes), o ponto do 1 é vermelho, como nos dados de
  verdade, e o dado "cai" no painel em degraus, meio travado, quando aparece.
  As linhas horizontais por cima da tela imitam uma TV de tubo.

Como o CSS posiciona os pontos (você não precisa mexer nisso, é só para
entender):

```
grade 3 × 3          dado--1   dado--2   dado--3   dado--4   dado--5   dado--6
  a  b  c             · · ·     ● · ·     ● · ·     ● · ●     ● · ●     ● · ●
  d  e  f             · ● ·     · · ·     · ● ·     · · ·     · ● ·     ● · ●
  g  h  i             · · ·     · · ●     · · ●     ● · ●     ● · ●     ● · ●
```

---

## 4. `Soma`

Depois da primeira rolagem (`jaRolou` é `true`):

```jsx
<div className="soma" aria-live="polite">
  <p className="soma__rotulo">Soma</p>
  <p className="soma__valor">12</p>
</div>
```

Antes da primeira rolagem (`jaRolou` é `false`):

```jsx
<div className="soma" aria-live="polite">
  <p className="soma__dica">Clique no botão para rolar os dados.</p>
</div>
```

- O `div.soma` existe sempre; só o **conteúdo** muda. Escolha o conteúdo com
  um ternário.
- O `aria-live="polite"` faz o leitor de tela anunciar a soma nova a cada
  rolagem, sem a pessoa precisar procurar.
- O `.soma` tem altura mínima no CSS: a tela não "pula" quando a dica vira o
  número.

---

## 5. `BotaoRolar`

```jsx
<button className="botao-rolar" type="button">
  Rolar os dados
</button>
```

No clique, o botão chama a função que recebeu em `aoRolar`. Ele **não sabe**
o que é rolar dados: quem sabe é o `App`. O botão só avisa que foi clicado.

---

## 6. `Rolagens`

```jsx
<p className="rolagens">3 rolagens</p>
```

| `quantidade` | Texto |
| --- | --- |
| 0 | Nenhuma rolagem ainda |
| 1 | 1 rolagem |
| 2 ou mais | 2 rolagens, 3 rolagens... |

---

## 7. Desafio extra: Trinca

Quando os três valores forem iguais, logo depois da `Soma`
(`referencias/04-desafio-trinca.png`):

```jsx
<p className="trinca">Trinca!</p>
```

Só depois da primeira rolagem: três dados em 1 ao abrir a página não contam.
