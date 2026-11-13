# Comportamento esperado · Nexo Literário

Este documento é a especificação do projeto: o que cada tela mostra e como
reage a cada ação. A marcação (classes e estrutura) de cada parte está em
`docs/03-telas-e-componentes.md`. As contas estão em
`docs/04-dados-e-calculos.md`.

Os dados vêm da API simulada (json-server). Veja `docs/02-guia-da-api.md`.

---

## 0. Em todas as telas

### Topo

- A marca "Nexo Literário" leva para `/`.
- Links: **Início** (`/`), **O Clube** (`/clube`) e o botão **Assinar**
  (`/assinar`).
- O link da página atual fica marcado (o `NavLink` faz isso com a classe
  `active`).
- **No celular**, os links somem e aparece o botão de menu. Ele abre e fecha o
  menu, troca o ícone (menu ↔ X), o `aria-label` ("Abrir menu" ↔ "Fechar menu")
  e o `aria-expanded`. Clicar em um link do menu fecha o menu.

### Rodapé

Marca, slogan "Onde grandes histórias nos conectam.", os mesmos três links e a
linha "Nexo Literário · Curadoria editorial independente · © 2026".

### Livros e planos (o `ClubeContext`)

Livros e planos são buscados **uma vez**, quando o site abre, e ficam
disponíveis para todas as telas. Até a Etapa 7, cada tela busca os seus; o
comportamento visível é o mesmo.

- A lista de livros fica **ordenada pelo mês** (1 a 12) antes de chegar às
  telas.
- Enquanto carrega, as telas mostram o seu aviso de carregando.
- Se a busca falhar, as telas mostram o erro com o botão **"Tentar de novo"**,
  que busca outra vez.

### Dados que faltam

Nenhuma tela mostra `null`, `undefined` ou um rótulo sem valor.

- **Sem capa:** no lugar da imagem, o marcador "Capa indisponível".
- **Sem autor, categoria, ano ou sinopse:** o parágrafo correspondente não é
  criado.
- Os casos da página do livro (páginas, nota) estão na seção 3.

---

## 1. Início (`/`)

### Abertura

Foto de fundo (`https://raw.githubusercontent.com/techcomkathia/nexo-literario-imagens/main/img/hero.jpg`), título "Nexo Literário", o texto "Onde
grandes histórias nos conectam. Descubra ciclos mensais de leitura
criteriosamente selecionados." e o botão **"Ver investimento"**, que leva para
`/clube`.

### Carrossel "Leituras por trimestre"

- Sobretítulo "A programação" e título "Leituras por trimestre".
- Os livros agrupados em trimestres: Jan – Mar, Abr – Jun, Jul – Set e
  Out – Dez. **Trimestre sem livro não vira slide.**
- Cada slide tem o rótulo do trimestre e um cartão por livro: mês por extenso,
  capa, título, autor, categoria e o link **"Ver detalhes"**, que leva para
  `/livros/:identificador`.
- Só um slide aparece por vez. O primeiro aparece ao abrir.
- **Seta anterior e seta próxima** trocam o slide. Depois do último volta ao
  primeiro, e antes do primeiro vai para o último.
- **Pontos de paginação:** um por slide. Clicar em um ponto mostra aquele
  slide. O ponto do slide visível fica ativo.
- Acessibilidade: os slides escondidos têm `aria-hidden="true"`, o ponto ativo
  tem `aria-current="true"`, e cada seta e cada ponto tem um `aria-label`
  ("Anterior: trimestre", "Mostrar Abr – Jun").

### Linha do tempo

- Sobretítulo "Programação demonstrativa de 2026" e o título **"As 12 leituras
  de 2026"**, com o número vindo do tamanho da lista.
- Um item por livro, na ordem dos meses: capa e, ao lado, mês por extenso,
  título, autor, categoria, sinopse e "Ver detalhes".

### Chamada final

"Sua próxima grande leitura começa aqui.", "Junte-se a leitores que escolheram
ler com intenção, um livro de cada vez." e o botão **"Quero participar"**, que
leva para `/assinar`.

### Estados

| Situação | O que aparece no lugar do carrossel e da linha do tempo |
| --- | --- |
| carregando | "Carregando a programação…" |
| erro | "Não foi possível carregar a programação." e o botão "Tentar de novo" |
| lista vazia | "Nenhum livro está disponível no momento." (e a linha do tempo não aparece) |

A abertura e a chamada final aparecem sempre.

---

## 2. O Clube (`/clube`)

### Apresentação

Sobretítulo "O Clube", título "Mais do que ler. Uma forma de descobrir." e os
três pilares, cada um com ícone, título e texto:

| Pilar | Texto |
| --- | --- |
| Curadoria | Obras escolhidas com cuidado, de clássicos a vozes contemporâneas. |
| Programação | Um livro por mês, em ciclos trimestrais pensados como coleção. |
| Valorização da obra | Notas editoriais e contexto para ler com mais profundidade. |

### Encontros mensais

Sobretítulo "Encontros mensais", título "Uma conversa sobre o livro, de
qualquer lugar." e os dois parágrafos:

> Os encontros acontecem remotamente, uma vez por mês, com todos os assinantes
> do clube. É um espaço para compartilhar impressões, perguntas e diferentes
> interpretações da leitura.
>
> Depois de cada encontro, cada assinante poderá atribuir uma nota ao livro. As
> avaliações passam a compor o histórico coletivo das leituras do clube.

### Histórico "Livros já lidos"

- Sobretítulo "Histórico do clube" e título "Livros já lidos".
- Entram **só os livros que têm nota** (`nota` diferente de `null`). Com os
  dados de exemplo, são os nove primeiros.
- Usa **o mesmo componente `Carrossel` da Início**, agrupado por trimestre,
  com o rótulo "histórico de leituras avaliadas" nas setas e nos pontos.
- Cada livro mostra: mês, capa, título, autor, categoria, **cinco estrelas**,
  a nota no formato "4.8 / 5", a legenda "Média dos assinantes" e "Ver
  detalhes".
- As estrelas seguem a nota: na nota 4.8, as quatro primeiras ficam cheias e a
  quinta fica 80% preenchida (conta em `docs/04-dados-e-calculos.md`). Elas são
  decorativas; quem lê a nota para o leitor de tela é o `aria-label` "Nota 4.8
  de 5 estrelas".
- Abaixo do carrossel, o aviso: "As notas exibidas são demonstrativas; as
  avaliações dos assinantes serão registradas após os encontros."
- **Nenhum livro com nota:** o carrossel não aparece e o aviso vira "As
  avaliações dos livros ainda não foram registradas."

### Planos "Escolha seu plano"

O cartão é **o mesmo da página Planos do M3U2-02**, com um botão a mais no pé
(veja o fim de `02-clube.png` e `07-clube-celular.png`).

- Sobretítulo "Ciclos de leitura", título "Escolha seu plano" (`<h2>`) e o
  texto "Um ciclo completo de histórias, com curadoria e encontros mensais."
- Um cartão por plano, na ordem da API, com:
  - o selo **"Mais escolhido"** e a variação de destaque **só** no plano com
    `destaque: true`;
  - o nome do plano e a duração ("Ciclo de 6 meses");
  - o valor da parcela em destaque, com "/mês" ao lado ("R$ 64,90/mês");
  - as parcelas e o total ("6× no cartão · total de R$ 389,40");
  - a caixa do pagamento à vista ("ou **R$ 350,46** à vista") com a economia
    ("Economize R$ 38,94 (10%)");
  - os benefícios, **vindos da API**, com o ícone de check (feito pelo CSS);
  - o botão **"Assinar semestral"** (com o nome do plano em minúsculas), que
    leva para `/assinar?plano=semestral`.
- Abaixo dos cartões, a observação: "O plano termina ao fim do ciclo e não
  renova automaticamente. O pagamento parcelado é feito no cartão."

Os valores são calculados a partir de `valorDaParcela`, `meses` e
`descontoAVista`, como em `docs/04-dados-e-calculos.md`. Nenhum preço escrito
à mão.

### Estados

| Parte | Carregando | Erro | Vazio |
| --- | --- | --- | --- |
| Histórico | "Carregando o histórico…" | "Não foi possível carregar o histórico." e "Tentar de novo" | o aviso de avaliações não registradas (acima) |
| Planos | "Carregando os planos…" | "Não foi possível carregar os planos." e "Tentar de novo" | "Nenhum plano está disponível no momento." |

A apresentação, os encontros, os títulos e a observação dos planos aparecem
sempre.

---

## 3. Livro (`/livros/:identificador`)

O `identificador` vem da URL (`/livros/capitaes-da-areia`). A página busca o
livro na API com `GET /livros?identificador=capitaes-da-areia` **toda vez que
o identificador muda**: clicar em "próximo" troca a URL e a página busca o
livro novo.

### Com o livro

- No topo, o link "← Voltar à programação", que leva para `/`.
- À esquerda: capa e a ficha com **Páginas**, **Ano**, **Idioma** e
  **Avaliação**.
- À direita: mês por extenso, título (`<h1>`), autor, categoria e três seções:
  **Sinopse**, **Nota editorial** e **Sobre o autor**.
- Embaixo, a navegação: o livro **anterior** à esquerda ("← A Resposta") e o
  **próximo** à direita ("A Guerra Não Tem Rosto de Mulher →"), na ordem da
  programação. O primeiro livro não tem anterior e o último não tem próximo:
  nesses casos o lado fica vazio, mas o outro continua no lugar dele.
- A página volta ao topo ao trocar de livro.

### Campos que faltam

| Campo | Se vier `null` ou não existir |
| --- | --- |
| `paginas` | "Não informado" |
| `nota` | "Sem avaliações" |
| `ano`, `idioma` | o item da ficha não aparece |
| `sinopse`, `notaEditorial`, `sobreAutor` | a seção inteira não aparece |

### Estados

| Situação | O que aparece (referência) |
| --- | --- |
| carregando | "Carregando o livro…" |
| a API devolveu a lista vazia | título "Livro não encontrado" e o texto "Este livro não está mais na programação do clube." Sem botão. (`05-livro-nao-encontrado.png`) |
| erro de rede ou HTTP | título "Não foi possível carregar o livro", o texto "Confira a sua conexão e tente de novo em alguns instantes." e o botão "Tentar de novo" (`06-livro-erro.png`) |

O "Voltar à programação" aparece nos três casos.

---

## 4. Assinar (`/assinar`)

Formulário à esquerda e resumo à direita. No celular, o resumo vai para baixo
do formulário.

### Plano escolhido ao abrir

1. Se a URL tiver `?plano=` com o `id` de um plano que existe
   (`/assinar?plano=anual`), ele vem escolhido.
2. Se não tiver, ou se o `id` não existir, vem escolhido o plano com
   `destaque: true` (o Semestral).
3. Se nenhum tiver destaque, o primeiro da lista.

Trocar de plano no formulário **atualiza a URL** (`?plano=trimestral`), para
que recarregar a página mantenha a escolha.

### Seções do formulário

Título "Faça parte do Nexo Literário" e três grupos:

**1. Seus dados:** Nome completo, E-mail e CPF.

**2. Plano:**
- Um botão por plano vindo da API. O escolhido fica selecionado.
- Duas opções de modalidade (rádio), com o texto calculado para o plano
  escolhido:
  - **À vista:** "À vista: R$ 350,46" e a dica "10% de desconto · cartão, Pix
    ou boleto" (começa marcada);
  - **Parcelado:** "6x de R$ 64,90 no cartão" e a dica "Total de R$ 389,40 ·
    parcelas fixas, sem renovação".

**3. Pagamento:**
- À vista aceita **Cartão de crédito**, **Pix** e **Boleto**. Parcelado aceita
  **só Cartão de crédito**: os botões de Pix e boleto não aparecem.
- Se a pessoa estava com Pix ou boleto e muda para parcelado, a forma de
  pagamento volta para cartão.
- **Cartão:** aparecem os campos Número do cartão, Nome impresso no cartão,
  Validade e CVV.
- **Pix:** os campos do cartão somem e aparece "Ao confirmar, geramos um QR
  Code Pix com validade de 30 minutos. A assinatura é ativada assim que o
  pagamento é aprovado."
- **Boleto:** os campos do cartão somem e aparece "O boleto vence em 3 dias
  úteis. A assinatura é ativada após a compensação (até 2 dias úteis)."

Por fim, a caixa "Li e aceito a Política de Privacidade e os Termos de
Assinatura." e o botão **"Confirmar assinatura"**.

### Resumo

Atualizado a cada mudança, **sem estado próprio** (tudo calculado a partir do
formulário):

| Linha | À vista | Parcelado |
| --- | --- | --- |
| Título | Plano Semestral | Plano Semestral |
| Descrição | 6 livros · um por mês | 6 livros · um por mês |
| Valor do ciclo | R$ 389,40 | R$ 389,40 |
| Desconto | Desconto à vista (10%): − R$ 38,94 | (a linha não aparece) |
| Total | Total à vista: **R$ 350,46** | 6 parcelas no cartão: **6x de R$ 64,90** |
| Forma de pagamento | Forma de pagamento: Pix | Forma de pagamento: Cartão de crédito |

### Validação

A validação roda ao clicar em "Confirmar assinatura". Os campos com problema
recebem `aria-invalid="true"` e a mensagem aparece logo abaixo de cada um,
ligada ao campo pelo `aria-describedby`. Quando a pessoa altera um campo, a
mensagem dele some.

| Campo | Regra | Mensagem |
| --- | --- | --- |
| Nome completo | pelo menos duas palavras | Informe o nome e o sobrenome. |
| E-mail | formato de e-mail | Informe um e-mail válido, como nome@exemplo.com. |
| CPF | 11 números (com ou sem pontos e traço) | O CPF precisa ter 11 números. |
| Número do cartão | 16 números (com ou sem espaços) | O número do cartão precisa ter 16 números. |
| Nome impresso | preenchido | Informe o nome como está no cartão. |
| Validade | `MM/AA`, mês de 01 a 12 e não vencido | Informe uma validade no formato MM/AA que ainda não venceu. |
| CVV | 3 ou 4 números | O CVV tem 3 ou 4 números. |
| Termos | marcado | Para assinar, aceite os termos. |

Os campos do cartão só são validados quando a forma de pagamento é cartão.

### Envio

1. Com tudo válido, o botão vira **"Confirmando…"** e fica desativado.
2. A página faz `POST /assinaturas` com os dados descritos em
   `docs/02-guia-da-api.md`. **Os dados do cartão não vão.**
3. **Deu certo:** o formulário e o resumo dão lugar à confirmação, com o título
   "Bem-vindo ao clube!" e a mensagem montada a partir da resposta da API:

   > Assinatura nº 1 confirmada: plano Semestral à vista, no Pix. Seu código
   > Pix foi gerado (simulação). Enviaremos os detalhes para ana@exemplo.com.

   Para cartão parcelado: "plano Anual em 12 parcelas no cartão". Para boleto:
   "Seu boleto foi gerado (simulação)." A frase do Pix ou do boleto só aparece
   nessas formas de pagamento.

4. **Deu errado:** acima do botão aparece "Não foi possível confirmar a sua
   assinatura. Tente de novo em alguns instantes.", o botão volta ao normal e
   **tudo que a pessoa digitou continua preenchido**.

### Estados

Enquanto os planos carregam: "Carregando os planos…". Se falhar: o erro com
"Tentar de novo". Sem planos: "Nenhum plano está disponível no momento." e o
formulário não aparece.

---

## 5. Página não encontrada (qualquer outra rota)

"404", o título "Página não encontrada", o texto "O endereço que você abriu não
existe ou mudou de lugar." e o botão "Voltar ao início". Topo e rodapé
continuam aparecendo.

---

## 6. Regras comuns

- Nenhum `alert()`, `confirm()` ou `prompt()`.
- Nenhum `style={{ }}`, `document.querySelector` ou `innerHTML` nos
  componentes.
- Toda imagem de capa tem `alt="Capa de [título]"`. A foto da abertura é
  decorativa (`alt=""`).
- As telas funcionam em tela larga e no celular.
