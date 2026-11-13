# Estilo · Nexo Literário

O `style.css` é o mesmo do M3U2-02, com as classes das telas novas (Clube,
Livro e Assinar) e um bloco pequeno no fim para o que só existe na versão
React. **Não edite este arquivo**, e não use `style={{ }}` nos componentes.

A marcação completa de cada tela, já em JSX, está em
`docs/03-telas-e-componentes.md`.

## Como usar

1. Mova este `style.css` para `src/` e importe **uma vez só**, no `main.jsx`:

   ```jsx
   import "./style.css";
   ```

2. Cole as fontes no `<head>` do `index.html` da raiz (o trecho está na Etapa 0
   do README).
3. No JSX, `class` vira `className`.

## Como os nomes funcionam

As classes seguem o padrão **bloco__elemento--variação**, o mesmo do Módulo 2:

```
carrossel                  o bloco (o carrossel inteiro)
carrossel__item            um elemento dentro do bloco (um slide)
carrossel__item--ativo     uma variação desse elemento (o slide visível)
```

No React, ligar e desligar uma variação é decidir a classe no JSX:

```jsx
<div className={`carrossel__item ${ativo ? "carrossel__item--ativo" : ""}`}>
```

## Gerais

| Classe | Uso |
| --- | --- |
| `.conteudo-principal` | O `<main>` do layout |
| `.conteiner` | Limita a largura e centraliza o conteúdo |
| `.sobretitulo` | Rótulo pequeno em maiúsculas (mês, trimestre, seção) |
| `.titulo-secao` | Título grande de seção |
| `.texto-suave` | Texto secundário e mensagens de estado |
| `.botao` | Botão ou link com cara de botão |
| `.botao--primario` | Botão verde cheio |
| `.link-texto` | Link sublinhado ("Ver detalhes") |
| `.capa` | Proporção 2:3 e sombra da capa |
| `.capa-indisponivel` | Substituto da capa quando não há imagem |

## Topo e rodapé

| Classe | Uso |
| --- | --- |
| `.cabecalho`, `__interno`, `__marca` | Estrutura do topo e a marca |
| `.cabecalho__navegacao` | Links do topo em tela larga |
| `.cabecalho__link` | Link comum do topo (Início, O Clube) |
| `.cabecalho__link.active` | Link da página atual (o `NavLink` coloca o `active`) |
| `.cabecalho__assinar` | Botão verde "Assinar" do topo |
| `.cabecalho__botao-menu` | Botão do menu; só aparece no celular |
| `.cabecalho__menu-celular` | Menu aberto no celular |
| `.cabecalho__assinar-celular` | "Assinar" dentro do menu do celular |
| `.rodape`, `__interno`, `__marca`, `__slogan`, `__navegacao`, `__direitos` | Partes do rodapé |

## Carrossel (Início e Clube)

| Classe | Uso |
| --- | --- |
| `.carrossel` | O bloco inteiro |
| `.inicio-programacao__carrossel` | Classe extra do carrossel da Início |
| `.historico-clube__carrossel` | Caixa em volta do carrossel do Clube |
| `.carrossel__controle` | Seta (com `--anterior` ou `--proximo`) |
| `.carrossel__icone-controle` | Círculo com o ícone da seta |
| `.carrossel__janela` | Área que contém os slides |
| `.carrossel__item` | Um slide; fica escondido |
| `.carrossel__item--ativo` | O slide visível |
| `.carrossel__paginacao` | Grupo dos pontos |
| `.carrossel__ponto` | Um ponto (botão) |
| `.carrossel__ponto--ativo` | O ponto do slide visível (fica alongado) |
| `.rotulo-trimestre` | Rótulo do trimestre com linha embaixo ("Jan – Mar") |

## Início

| Classe | Uso |
| --- | --- |
| `.pagina-inicio` | Envolve a página inteira |
| `.inicio-destaque`, `__imagem`, `__sobreposicao`, `__conteudo`, `__titulo`, `__descricao`, `__botao` | A abertura com a foto |
| `.inicio-programacao`, `__cabecalho` | Seção do carrossel |
| `.inicio-grade-livros` | Grade de 3 colunas com os livros do trimestre |
| `.inicio-livro`, `__mes`, `__capa`, `__titulo`, `__autor`, `__categoria` | Cartão de livro do carrossel |
| `.linha-tempo`, `__lista` | Seção e lista `<ol>` da linha do tempo |
| `.linha-tempo__item`, `__marcador`, `__conteudo` | Um livro na linha do tempo e a bolinha |
| `.linha-tempo__capa`, `__titulo`, `__autor`, `__categoria`, `__sinopse` | Partes do item |
| `.inicio-chamada`, `__interno`, `__botao` | A chamada verde do fim |

## O Clube

| Classe | Uso |
| --- | --- |
| `.pagina-clube`, `__titulo` | A página e o título grande |
| `.pilares-clube` | Grade dos três pilares |
| `.pilar-clube`, `__icone`, `__titulo`, `__texto` | Um pilar (os ícones de `Icones.jsx` já trazem a classe) |
| `.encontros-clube`, `__titulo`, `__texto` | Seção dos encontros mensais |
| `.historico-clube` | Seção do histórico |
| `.historico-clube__grade` | Grade de livros de um slide |
| `.historico-clube__livro`, `__detalhe-livro`, `__texto-livro` | Um livro do histórico |
| `.historico-clube__capa`, `__titulo-livro`, `__autor`, `__categoria` | Partes do livro |
| `.historico-clube__avaliacao` | Linha das estrelas com a nota |
| `.historico-clube__estrelas` | Grupo das cinco estrelas |
| `.historico-clube__valor-avaliacao` | O texto "4.8 / 5" |
| `.historico-clube__legenda-avaliacao` | "Média dos assinantes" |
| `.historico-clube__aviso` | O aviso das notas demonstrativas |

### Planos (no fim do Clube)

O mesmo cartão da página Planos do M3U2-02. Todas as classes abaixo só têm
esse visual **dentro de `.pagina-planos`**, que vai na `<section>` dos planos
junto com `.investimento-clube`.

| Classe | Uso |
| --- | --- |
| `.investimento-clube` | A `<section>` dos planos no Clube |
| `.pagina-planos` | Na mesma `<section>`; sem ela, os cartões ficam com o visual antigo |
| `.precos__grade` | Grade dos cartões |
| `.precos__plano` | Cartão de plano |
| `.precos__plano--destaque` | Variação do plano em destaque (borda verde e sombra) |
| `.precos__selo` | Selo "Mais escolhido" no topo do cartão em destaque |
| `.precos__nome-plano` | Nome do plano |
| `.precos__resumo` | Linha abaixo do nome ("Ciclo de 6 meses") |
| `.precos__valor` | Preço principal (parcela) |
| `.precos__periodo` | Complemento do preço: "/mês" |
| `.precos__detalhes` | Parcelas e total |
| `.precos__avista` | Caixa do pagamento à vista |
| `.precos__economia` | Etiqueta com a economia do pagamento à vista |
| `.precos__beneficios` | Lista de benefícios, com ícone de check feito no CSS |
| `.precos__acao` | Botão "Assinar ..." no pé do cartão (novo no M3U3) |
| `.precos__observacao` | Texto abaixo da grade |

> O CSS também tem `.precos`, `.precos__cabecalho`, `.precos__abas` e
> `.precos__aba`, de uma tabela de preços antiga com abas. Elas não são usadas
> neste projeto. Ignore.

## Livro

| Classe | Uso |
| --- | --- |
| `.pagina-livro` | A página |
| `.pagina-livro__voltar` | Link "Voltar à programação" |
| `.pagina-livro__grade` | Duas colunas: capa e ficha, textos |
| `.pagina-livro__capa` | Capa grande |
| `.pagina-livro__ficha` | Lista `<dl>` com páginas, ano, idioma e avaliação |
| `.pagina-livro__titulo`, `__autor`, `__categoria` | Cabeçalho do livro |
| `.pagina-livro__secao` | Sinopse, nota editorial, sobre o autor; também os avisos de estado |
| `.pagina-livro__navegacao` | Barra do anterior e do próximo |
| `.pagina-livro__link-navegacao` | Link do anterior ou do próximo |

## Assinar

| Classe | Uso |
| --- | --- |
| `.pagina-assinatura` | Duas colunas: formulário e resumo |
| `.formulario-assinatura`, `__titulo` | O formulário e o título |
| `.formulario-assinatura__grupo` | Um `<fieldset>` (dados, plano, pagamento) |
| `.formulario-assinatura__rotulo` | `<label>` com o texto e o campo |
| `.formulario-assinatura__campo` | `<input>` |
| `.formulario-assinatura__opcoes-plano` | Grade dos botões de plano |
| `.formulario-assinatura__opcoes-pagamento` | Linha dos botões de pagamento |
| `.formulario-assinatura__opcao` | Botão de plano ou de pagamento |
| `.formulario-assinatura__opcao--selecionada` | Botão escolhido |
| `.formulario-assinatura__opcoes-modalidade` | As duas caixas de modalidade |
| `.formulario-assinatura__modalidade` | Uma caixa (`<label>` com o rádio) |
| `.formulario-assinatura__modalidade--selecionada` | Caixa escolhida |
| `.formulario-assinatura__texto-modalidade`, `__dica` | Texto e dica da caixa |
| `.formulario-assinatura__campos-cartao`, `__validade` | Campos do cartão; validade e CVV lado a lado |
| `.formulario-assinatura__ajuda-pagamento` | Texto de ajuda do Pix ou do boleto |
| `.formulario-assinatura__termos` | Caixa dos termos |
| `.formulario-assinatura__enviar` | Botão "Confirmar assinatura" |
| `.resumo-assinatura`, `__titulo`, `__descricao` | O resumo ao lado |
| `.resumo-assinatura__linhas`, `__desconto` | Linhas do resumo e a linha do desconto |
| `.resumo-assinatura__total` | Linha do total |
| `.resumo-assinatura__parcelas` | Total em parcelas (fonte menor) |
| `.resumo-assinatura__forma-pagamento` | "Forma de pagamento: ..." |
| `.confirmacao-assinatura` | Tela de confirmação |

### Novas na versão React

| Classe ou seletor | Uso |
| --- | --- |
| `.formulario-assinatura__campo[aria-invalid="true"]` | Campo com erro (borda vermelha). Basta ligar o `aria-invalid` |
| `.formulario-assinatura__erro` | Mensagem de erro de um campo (`<span>`) |
| `.formulario-assinatura__falha` | Mensagem de falha ao enviar |
| `.botao:disabled` | Botão desativado enquanto envia |

## Página não encontrada

| Classe | Uso |
| --- | --- |
| `.nao-encontrada`, `__conteudo` | A página 404, centralizada |

## Estados

O CSS inclui `[hidden] { display: none !important; }`, mas no React você quase
não vai precisar dele: o jeito React de esconder é **não renderizar**
(`{condicao && <p>...</p>}`).

Teste todas as telas em largura de celular e de desktop (DevTools › ícone de
celular).
