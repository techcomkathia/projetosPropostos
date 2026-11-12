# Estilo · Nexo Literário

O `style.css` já está pronto e ligado à Home e à página Planos. Nesta unidade,
o JavaScript cria cartões com as classes existentes e alterna os estados das
listas. O CSS não entra na avaliação.

## Classes usadas

| Classe | Uso |
| --- | --- |
| `.conteiner` | Limita a largura e centraliza o conteúdo |
| `.sobretitulo` | Rótulo de mês e de seção |
| `.texto-suave` | Texto secundário e mensagens de estado |
| `.inicio-grade-livros` | Grade de livros na Home |
| `.inicio-livro` | Cartão de livro |
| `.inicio-livro__mes`, `__capa`, `__titulo`, `__autor`, `__categoria`, `__sinopse` | Partes do cartão de livro |
| `.capa` | Proporção e apresentação da capa |
| `.capa-indisponivel` | Alternativa visual quando não há imagem |
| `.pagina-planos` | Espaçamento da seção da página Planos (já no HTML) |
| `.precos__grade` | Grade dos planos |
| `.precos__plano` | Cartão de plano |
| `.precos__plano--destaque` | Variação para um plano em destaque |
| `.precos__nome-plano` | Nome do plano |
| `.precos__valor` | Valor em destaque (parcela ou à vista) |
| `.precos__periodo` | Complemento do valor: "por mês", "à vista" |
| `.precos__detalhes` | Linha de detalhes (parcelas, total, desconto) |
| `.precos__beneficios` | Lista de benefícios do plano |

O `style.css` também contém classes das páginas legadas (carrossel, linha do
tempo, ficha do livro, assinatura). Elas não são usadas na M3-U2.

O atributo `hidden` controla os estados. O CSS inclui `[hidden] { display: none
!important; }`, então use `elemento.hidden = true` ou `false` em vez de alterar
`display` pelo JavaScript.

O menu responsivo existente pode ser mantido, mas não é o foco desta etapa.
Teste as duas telas em largura de celular e desktop.
