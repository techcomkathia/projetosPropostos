# Estilo · Nexo Literário

O `style.css` já está pronto e ligado à Home e à página Planos. **Não edite
este arquivo.** O seu JavaScript cria os elementos com as classes abaixo e liga
e desliga os estados.

Os modelos completos de HTML de cada componente estão em
`docs/03-componentes.md`.

## Como os nomes funcionam

As classes seguem o padrão **bloco__elemento--variação**, o mesmo do Módulo 2:

```
carrossel                  o bloco (o carrossel inteiro)
carrossel__item            um elemento dentro do bloco (um slide)
carrossel__item--ativo     uma variação desse elemento (o slide visível)
```

## Gerais

| Classe | Uso |
| --- | --- |
| `.conteiner` | Limita a largura e centraliza o conteúdo |
| `.sobretitulo` | Rótulo pequeno em maiúsculas (mês, trimestre, seção) |
| `.texto-suave` | Texto secundário e mensagens de estado |
| `.capa` | Proporção 2:3 e sombra da capa |
| `.capa-indisponivel` | Substituto da capa quando não há imagem |

## Home: carrossel por trimestre

| Classe | Uso |
| --- | --- |
| `.carrossel__controle` | Botão de seta (com `--anterior` ou `--proximo`) |
| `.carrossel__icone-controle` | Círculo com o ícone da seta |
| `.carrossel__janela` | Área que contém os slides |
| `.carrossel__item` | Um slide (um trimestre); fica escondido |
| `.carrossel__item--ativo` | O slide visível |
| `.carrossel__paginacao` | Grupo dos pontos |
| `.carrossel__ponto` | Um ponto (botão) |
| `.carrossel__ponto--ativo` | O ponto do slide visível (fica alongado) |
| `.rotulo-trimestre` | Rótulo do trimestre com linha embaixo ("Jan – Mar") |
| `.inicio-grade-livros` | Grade de 3 colunas com os livros do trimestre |
| `.inicio-livro` | Cartão de livro |
| `.inicio-livro__mes`, `__capa`, `__titulo`, `__autor`, `__categoria` | Partes do cartão de livro |

O `.carrossel` e o `.inicio-programacao__carrossel` já estão no
`#carrossel-trimestres`, no HTML.

## Home: linha do tempo

| Classe | Uso |
| --- | --- |
| `.linha-tempo__item` | Um livro na linha do tempo (`<li>`) |
| `.linha-tempo__marcador` | Bolinha sobre a linha vertical |
| `.linha-tempo__conteudo` | Capa à esquerda e textos à direita |
| `.linha-tempo__capa` | Capa da linha do tempo |
| `.linha-tempo__titulo` | Título do livro |
| `.linha-tempo__autor` | Autor |
| `.linha-tempo__categoria` | Linha secundária ("Publicado em 1937") |
| `.linha-tempo__sinopse` | Descrição do livro |

## Planos

| Classe | Uso |
| --- | --- |
| `.precos__plano` | Cartão de plano |
| `.precos__plano--destaque` | Variação do plano em destaque (borda e sombra) |
| `.precos__selo` | Selo "Mais escolhido" no topo do cartão em destaque |
| `.precos__nome-plano` | Nome do plano |
| `.precos__resumo` | Linha abaixo do nome ("Ciclo de 6 meses") |
| `.precos__valor` | Preço principal (parcela) |
| `.precos__periodo` | Complemento do preço: "/mês" |
| `.precos__detalhes` | Parcelas e total |
| `.precos__avista` | Caixa do pagamento à vista |
| `.precos__economia` | Etiqueta com a economia do pagamento à vista |
| `.precos__beneficios` | Lista de benefícios, com ícone de check feito no CSS |

A grade (`.precos__grade`) e a seção (`.pagina-planos`) já estão no
`planos.html`.

## Estados

O atributo `hidden` controla os estados. O CSS inclui `[hidden] { display: none
!important; }`, então use `elemento.hidden = true` ou `false` em vez de alterar
`display` pelo JavaScript.

O `style.css` também tem classes que não são usadas neste projeto. Ignore as
que não aparecem nas tabelas acima.

Teste as duas telas em largura de celular e de desktop.
