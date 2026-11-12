# Comportamento esperado na tela · Horizonte Acervo

Este documento descreve como a página deve reagir a cada ação de quem usa:
o que acontece ao abrir, buscar, filtrar, clicar, guardar, digitar e enviar.

No Módulo 2, este documento era resolvido com CSS. Aqui, **tudo é resolvido com
JavaScript**. A aparência de cada estado já está pronta no CSS: o seu código
só liga e desliga classes, atributos e o `hidden`.

Os textos entre aspas são as mensagens aprovadas pela cliente. Use exatamente
como estão (a lista completa está em `docs/01-briefing-do-cliente.md`).

---

## 1. Menu

- Em telas de até 768px, os links do menu ficam escondidos e aparece o botão
  "Menu". O CSS cuida disso sozinho.
- Clicar no botão abre o menu. Clicar de novo fecha. Quem abre é o atributo
  `aria-expanded="true"` no botão; quem fecha é `aria-expanded="false"`.
- Clicar em um dos links do menu também fecha o menu. A página rola até a
  seção.
- O link "Minha seleção" mostra entre parênteses quantas obras estão
  guardadas, por exemplo **(3)**, e atualiza na hora a cada obra guardada ou
  removida.

## 2. Ao abrir a página

- O campo de busca já aparece preenchido com **landscape**, o filtro "Todas"
  aparece marcado, e a grade carrega a página 1 dessa busca.
- A seção "Minha seleção" aparece com as obras guardadas da última visita, ou
  com o estado vazio se não houver nenhuma.
- O contador do menu já mostra o número certo.

## 3. Busca

- A busca acontece ao **enviar** o formulário (Enter ou botão "Buscar"), não a
  cada tecla.
- Espaços no começo e no fim são ignorados. `"  sea "` busca `sea`.
- Busca vazia é permitida: lista todo o acervo com imagem, sem filtro de
  palavra.
- Uma nova busca **mantém o filtro de tipo** que estava marcado e **volta para a
  página 1**.
- A página não recarrega ao enviar.

## 4. Filtro por tipo

- Apenas um chip fica marcado por vez. O marcado tem `aria-pressed="true"` e
  os outros têm `aria-pressed="false"`.
- "Todas" não envia tipo para a API. Os outros enviam o valor do `data-tipo` do
  próprio botão (`Photograph`, `Painting`, `Print`, `Drawing`).
- Trocar o tipo **mantém a palavra buscada** e **volta para a página 1**.
- Clicar no chip que já está marcado não faz nada: nenhuma requisição nova.

## 5. Contador de resultados

Fica logo abaixo da barra de filtros e acompanha o total devolvido pela API:

| Total | Texto |
| --- | --- |
| 0 | o contador fica vazio (quem explica é o estado vazio) |
| 1 | "1 obra encontrada" |
| mais de 1 | "145 obras encontradas" |

Enquanto carrega, mostra **"Buscando…"**. Em caso de erro, fica vazio. Números
acima de mil aparecem com ponto: "10.918 obras encontradas" (procure por
`toLocaleString('pt-BR')`).

## 6. A grade e seus estados

A `#grade-obras` está sempre em **um** destes quatro estados, nunca em dois ao
mesmo tempo:

**Carregando**
- Aparece no instante em que a requisição começa: abrir a página, buscar,
  filtrar, trocar de página ou tentar de novo.
- Mostra **12 cartões-esqueleto** (`.card.esqueleto`), no lugar exato onde os
  cartões de verdade vão aparecer.
- A paginação fica escondida enquanto carrega.

**Com resultados**
- Um cartão por obra, na ordem em que a API devolveu.

**Vazio**
- Quando a API responde com sucesso, mas sem nenhuma obra.
- Mostra o estado vazio com o título **"Nada por aqui"** e o texto
  **"Nenhuma obra encontrada para “{busca}”. Tente outra palavra, em inglês."**
  Se a busca estiver vazia, o texto é **"Nenhuma obra encontrada com esse
  filtro."**
- A paginação fica escondida.

**Erro**
- Quando a requisição falha: sem internet, API fora do ar ou resposta com
  status de erro (`response.ok` falso).
- Mostra o estado de erro com o título **"Não foi possível carregar o acervo"**,
  o texto **"Confira sua conexão e tente de novo."** e o botão **"Tentar de
  novo"**.
- "Tentar de novo" repete **a mesma** busca, com o mesmo tipo e a mesma página.
- A paginação fica escondida.
- O erro também é registrado no console com `console.error`, para quem estiver
  depurando.

## 7. Cartão de obra

- **Foto**: a imagem `web` da obra, com `loading="lazy"` e o título da obra
  como `alt`.
- **Rótulo**: o tipo traduzido e a data, separados por um ponto médio:
  "Fotografia · 1856". A tradução dos tipos está no briefing. Se o tipo não
  estiver na tabela, mostre como veio da API.
- **Título**: o título da obra. É um `<button>` dentro do `h3`, que torna o
  cartão inteiro clicável.
- **Autoria**: a descrição do primeiro criador. Se a obra não tiver criador,
  aparece **"Autoria desconhecida"**.
- **Botão de guardar**, no canto da foto. Ele mostra se a obra já está na
  seleção (`aria-pressed`) e tem um `aria-label` que muda junto:
  **"Guardar {título} na seleção"** ou **"Remover {título} da seleção"**.
- Clicar em qualquer ponto do cartão abre a janela de detalhe. Clicar no
  botão de guardar **só** guarda: não abre a janela.

## 8. Paginação

- São **12 obras por página**.
- O texto do meio é **"Página 2 de 13"**. O total de páginas sai do total de
  obras da resposta.
- "Anterior" fica desabilitado (`disabled`) na página 1. "Próxima" fica
  desabilitado na última página.
- Trocar de página carrega a nova página e **rola a tela até o início da seção
  do acervo**. Sem isso, a pessoa fica olhando para o rodapé da página
  anterior.
- A paginação só aparece quando há resultados. Se tudo couber em uma página,
  ela aparece com os dois botões desabilitados.

## 9. Janela de detalhe

**Abrir**
- Clicar em um cartão (da grade do acervo **ou** da seleção) abre a janela na
  hora, já com um carregando dentro, e busca a obra completa na API pelo `id`.
- Enquanto a janela está aberta, a página de trás não rola (classe
  `sem-rolagem` no `<body>`).

**Conteúdo**, quando a resposta chega:
- A imagem grande da obra.
- O rótulo com o tipo traduzido.
- O título, com `id="modal-titulo"` (é ele que dá nome à janela para o leitor
  de tela).
- A autoria, com a mesma regra do cartão.
- Uma lista de dados com **Data**, **Técnica**, **Dimensões** e **Cultura**.
  Linha cujo dado não existe **não aparece**: nada de "Técnica: undefined" nem
  linha vazia.
- A descrição, se existir. Algumas descrições vêm com tags HTML no meio do
  texto: elas não podem aparecer escritas na tela nem ser interpretadas como
  HTML (veja o guia da API).
- O link **"Ver no site do museu"**, que abre em outra aba.
- O botão de guardar, igual ao do cartão.

**Erro**: se a obra não carregar, a janela mostra **"Não foi possível carregar
esta obra."** e o botão **"Tentar de novo"**.

**Fechar**: pelo botão X, pela tecla **Esc** ou pelo clique no fundo escuro
fora da janela. Clicar **dentro** da janela não fecha.

## 10. Minha seleção

- Guardar uma obra (no cartão ou na janela):
  - salva a obra no `localStorage`, com a chave `horizonte:selecao`;
  - marca o botão como pressionado **em todos os lugares onde a obra aparece**
    (cartão do acervo, janela aberta, cartão da seleção);
  - atualiza o contador do menu e redesenha a grade da seleção;
  - mostra o aviso **"Obra guardada na sua seleção."**
- Remover faz o caminho inverso e mostra **"Obra removida da sua seleção."**
- A mesma obra nunca é guardada duas vezes.
- A ordem da seleção é a ordem em que as obras foram guardadas, da mais nova
  para a mais antiga.
- Sem nenhuma obra guardada, a seção mostra o estado vazio com o título
  **"Sua seleção está vazia"** e o texto **"Guarde obras do acervo para vê-las
  aqui."**
- Se o conteúdo salvo no navegador estiver corrompido (alguém editou na mão), a
  página não pode quebrar: trate como seleção vazia.

## 11. Aviso flutuante

- Aparece no pé da tela com a mensagem e some sozinho depois de **3
  segundos**.
- Se um novo aviso chegar enquanto outro está na tela, o novo substitui o
  antigo e o tempo recomeça.
- Use `toast--sucesso` para avisos de sucesso e `toast--erro` para avisos de
  erro.

## 12. Formulário de inscrição

### Regras de cada campo

| Campo | Regra | Mensagem de erro |
| --- | --- | --- |
| Nome | obrigatório; pelo menos 3 letras, sem contar espaços | "Informe seu nome completo." |
| E-mail | obrigatório; formato de e-mail (algo@algo.algo) | vazio: "Informe seu e-mail." · inválido: "Digite um e-mail válido, como nome@email.com." |
| Cidade | obrigatório | "Informe sua cidade." |
| Portfólio | opcional; se preenchido, começa com `http://` ou `https://` | "O link precisa começar com http:// ou https://." |
| Paisagem | uma das três opções marcada | "Escolha uma das paisagens." |
| Título da foto | obrigatório; até 60 caracteres | "Dê um título para a sua foto." |
| Sobre a foto | obrigatório; entre 20 e 300 caracteres | vazio: "Conte um pouco sobre a foto." · curto: "Escreva pelo menos 20 caracteres." |
| Regulamento | marcado | "É preciso aceitar o regulamento." |

Todos os textos são conferidos **sem os espaços do começo e do fim**.

### Quando validar

- **No envio**: todos os campos, de uma vez.
- **Ao sair de um campo** (`blur`): só aquele campo, e só se a pessoa tiver
  digitado alguma coisa nele. Ninguém quer ver erro em um campo em que ainda
  nem chegou.
- **Enquanto digita** (`input`), em um campo que **já está com erro**: valida de
  novo e tira o erro assim que o valor ficar certo. Não espere a pessoa sair do
  campo para dizer que agora está tudo bem.

### Como mostrar o erro

- A `.campo` recebe a classe `com-erro`, e o campo recebe `aria-invalid="true"`.
- A mensagem vai para o `.campo__erro` daquele campo, que perde o `hidden`.
- Ao corrigir, tudo volta ao normal: sem classe, `aria-invalid="false"` e
  mensagem escondida.

### Contador de caracteres

- O texto abaixo de "Sobre a foto" acompanha a digitação: **"0 de 300
  caracteres"**, **"1 de 300 caracteres"**, **"152 de 300 caracteres"**.

### Envio

**Com erro**:
- Nada é enviado.
- O `#alerta-formulario` aparece com **"Corrija os 3 campos marcados antes de
  enviar."** (o número é a quantidade de campos com erro; com um só,
  **"Corrija o campo marcado antes de enviar."**).
- O foco vai para o **primeiro** campo com erro.

**Tudo certo**:
- O alerta some.
- O botão "Enviar inscrição" entra no estado de carregando (`carregando` e
  `disabled`) enquanto o envio simulado acontece (1,5 segundo).
- No fim:
  - aparece o aviso **"Inscrição enviada, {primeiro nome}! Você vai receber a
    confirmação por e-mail."**;
  - o formulário é limpo e o contador volta para "0 de 300 caracteres";
  - o botão volta ao normal.
- Os dados enviados aparecem no console como um objeto, para conferência:
  `{ nome, email, cidade, portfolio, categoria, tituloFoto, descricao }`.

### Limpar

- O botão "Limpar" apaga os campos, **todos os erros**, o alerta e o contador
  de caracteres.

## 13. Teclado

- Tudo o que funciona com o mouse funciona com o teclado: Tab chega em cada
  cartão, chip, botão e campo, e Enter ou Espaço aciona.
- Esc fecha a janela de detalhe.
- O contorno de foco aparece em tudo que recebe foco pelo teclado. O CSS já
  cuida disso: não o remova.
