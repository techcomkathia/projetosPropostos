# Comportamento esperado na tela · Raiz & Cia Área do assinante

Este documento descreve, tela por tela, o que a aplicação mostra e como reage a
cada ação. A aparência de cada estado já está pronta no CSS: o seu código
decide **qual** estado aparece.

Os textos entre aspas são as mensagens aprovadas pela cliente. A lista
completa está em `docs/01-briefing-do-cliente.md`. A marcação de cada tela
está em `docs/03-telas-e-componentes.md`.

---

## 1. Em todas as telas

### Topo

- A marca **Raiz & Cia** leva para `/`.
- Links: **Kits** (`/kits`) e, se a pessoa estiver logada, **Minha conta**
  (`/minha-conta`). O link da página atual fica marcado. O `NavLink` faz isso
  sozinho, e o CSS já tem o estilo da classe `active`.
- **Sem login**: botão **"Entrar"** (contorno), que leva para `/entrar`.
- **Com login**: o texto **"Olá, {primeiro nome}"** e o botão **"Sair"**.
  - Sair apaga o usuário do contexto e do `localStorage` e leva para `/`.
- No celular, os links ficam atrás do botão **"Menu"**, que abre e fecha
  alternando o `aria-expanded`. Navegar para outra página fecha o menu.

### Rodapé

- "Raiz & Cia" de um lado e "© 2026 Raiz & Cia. Todos os direitos
  reservados." do outro.

### Título da aba

- Cada tela muda o `document.title`: "Kits · Raiz & Cia", "Cozinha · Raiz &
  Cia", "Minha conta · Raiz & Cia". Isso se faz com um `useEffect` em cada
  página.

### Rolagem

- Ao trocar de página, a nova tela abre **no topo**, não na altura onde a
  anterior estava. O `ScrollRestoration` do React Router resolve, ou um
  `window.scrollTo(0, 0)` em um efeito.

### Estados de dados

Toda tela que busca algo na API passa pelos mesmos três estados, sem exceção:

| Estado | Quando | O que aparece |
| --- | --- | --- |
| Carregando | do início da requisição até a resposta | spinner com o texto da tela ("Carregando kits…"), ou cartões-esqueleto nas grades |
| Erro | falha de rede ou `response.ok` falso | estado de erro com o texto da tela e o botão **"Tentar de novo"**, que repete a mesma busca |
| Vazio | resposta certa, mas lista vazia | estado vazio com o texto da tela |

Erro **nunca** é uma tela em branco, e carregando **nunca** mostra "Nenhum
kit encontrado" por meio segundo antes dos kits chegarem.

---

## 2. Início · `/`

- **Abertura** com o título "Sementes da estação, uma caixa por mês.", o
  texto de abertura, a foto `mudas.png`, o botão **"Ver os kits"** (vai para
  `/kits`) e o link **"Como funciona"** (rola até a seção).
- **Kits em destaque**: os kits com `destaque: true`, buscados na API, no mesmo
  cartão usado no catálogo. Os três estados valem aqui.
- **Como funciona**: três passos fixos, sem API (textos no briefing).

## 3. Catálogo · `/kits`

### Filtros

- **Busca** por texto: procura no nome, na descrição e nas espécies.
- **Luz**: chips **Todos**, **Sol pleno** e **Meia-sombra**. Um marcado por
  vez (`aria-pressed`).
- **Ordenar**: lista suspensa com **Nome (A–Z)**, **Menor preço** e **Maior
  preço**. O padrão é Nome.
- Os três funcionam **juntos** e são enviados **para a API** como parâmetros,
  e não filtrados no navegador depois.

### URL

- Os filtros vivem na URL: `/kits?busca=rúcula&luz=meia-sombra&ordem=menor-preco`.
- Abrir esse endereço direto (ou recarregar a página) mostra o catálogo já
  filtrado e com os controles marcados.
- Filtro no valor padrão não aparece na URL: "Todos" e "Nome (A–Z)" deixam a
  URL limpa (`/kits`).
- A busca vai para a URL ao **enviar** o formulário (Enter ou botão), não a
  cada tecla.

### Resultado

- Contador acima da grade: "1 kit" ou "8 kits".
- Vazio: **"Nenhum kit encontrado com esses filtros."** e o botão **"Limpar
  filtros"**, que volta para `/kits`.

### Cartão de kit

- Nome, descrição e, no pé, "{sementes} sementes · {luz}" de um lado e o
  preço do outro. O preço aparece como **R$ 79**, sem centavos (o
  `Intl.NumberFormat` resolve).
- Kit em lista de espera ou sazonal mostra a etiqueta da situação acima do
  nome. Kit disponível não mostra etiqueta nenhuma.
- O cartão inteiro leva para `/kits/{id}`. O nome do kit é um `Link`.

## 4. Página do kit · `/kits/:id`

- Link **"Todos os kits"** para voltar ao catálogo.
- Nome, etiqueta de situação (se não estiver disponível), descrição e preço
  com a frase "por caixa".
- Lista de dados: **Espécies** (separadas por vírgula), **Sementes**, **Luz**,
  **Rega** e **Dificuldade**.
- Parágrafo **Cuidados**.
- **Botão de assinar**, de acordo com a situação do kit:

| Situação | Botão | Abaixo do botão |
| --- | --- | --- |
| disponível | **"Assinar este kit"**, leva para `/assinar/{id}` | nada |
| sazonal | **"Assinar este kit"**, leva para `/assinar/{id}` | aviso: "Kit sazonal: disponível só como caixa avulsa." |
| lista de espera | **"Em lista de espera"**, desabilitado | aviso: "Este kit está com a lista de espera aberta. Escolha outro kit enquanto isso." |

- **Kit inexistente** (`/kits/99`, a API responde 404): estado vazio com
  **"Kit não encontrado"** e o link **"Ver todos os kits"**. Isso é diferente
  do erro de rede: um 404 aqui não tem "Tentar de novo".
- Trocar de kit sem sair da página (por exemplo, editando a URL de `/kits/1`
  para `/kits/2`) carrega o novo kit. Se não carregar, revise a lista de
  dependências do `useEffect`.

## 5. Entrar · `/entrar`

- Campos **E-mail** e **Senha** (`type="password"`), e o link **"Ainda não tem
  conta? Criar conta"** para `/cadastro`.
- Validação ao enviar: e-mail vazio ou fora do formato, senha vazia (mensagens
  no briefing).
- Com os campos certos, o botão entra em carregando, e a aplicação procura o
  usuário pelo e-mail na API e confere a senha.
- Usuário não encontrado ou senha errada: alerta **"E-mail ou senha
  incorretos."** Nunca diga qual dos dois errou: isso ajudaria quem está
  tentando adivinhar contas.
- Deu certo:
  - o usuário vai para o contexto e para o `localStorage`, **sem a senha**;
  - a pessoa vai para onde queria ir antes de ser mandada para o login (por
    exemplo, `/assinar/3`) ou, se veio direto, para `/minha-conta`.
- Quem já está logado e abre `/entrar` vai direto para `/minha-conta`.

## 6. Criar conta · `/cadastro`

- Campos **Nome**, **E-mail**, **Senha** e **Confirmar senha**, e o link **"Já
  tem conta? Entrar"**.
- Regras: nome com pelo menos 3 letras; e-mail no formato certo; senha com pelo
  menos 6 caracteres; confirmação igual à senha.
- Antes de criar, a aplicação confere na API se o e-mail já existe. Se
  existir: erro no campo e-mail, **"Este e-mail já tem uma conta."**, com um
  link para entrar.
- Deu certo: cria o usuário (`POST /usuarios`), já deixa a pessoa logada e leva
  para `/kits` com o alerta **"Conta criada. Agora é só escolher o seu kit."**

## 7. Assinar · `/assinar/:kitId` (só logado)

### Ao abrir

- Busca o kit da URL. Carregando e erro valem aqui.
- Se o kit estiver em **lista de espera**, a tela não mostra o formulário:
  mostra o aviso da página do kit e o link **"Ver outros kits"**.
- O título é "Assinar o kit {nome}", com o preço por caixa logo abaixo.

### Campos

| Campo | Tipo | Regra |
| --- | --- | --- |
| Frequência | radio: **Todo mês** (`mensal`), **A cada dois meses** (`bimestral`), **Uma caixa só** (`avulsa`) | obrigatório |
| Onde a horta vai ficar | radio: **Janela**, **Varanda**, **Quintal** | obrigatório |
| CEP | texto | obrigatório; 8 números (aceita digitar com ou sem traço) |
| Rua | texto | obrigatório |
| Número | texto | obrigatório |
| Complemento | texto | opcional |
| Bairro | texto | obrigatório |
| Cidade | texto | obrigatório |
| UF | texto | obrigatório; 2 letras |
| Observação para a entrega | textarea | opcional; até 200 caracteres |
| Quero o calendário de plantio por e-mail | checkbox | opcional; começa desmarcado |

- **Kit sazonal**: só **"Uma caixa só"** fica habilitada e já vem marcada. As
  outras duas opções aparecem desabilitadas, com o texto de ajuda "Kit sazonal:
  disponível só como caixa avulsa."

### O CEP

- Quando o CEP fica com 8 números (ao sair do campo ou ao completar a
  digitação, você escolhe), a aplicação busca o endereço no ViaCEP.
- Enquanto busca, o texto de ajuda do campo mostra **"Buscando endereço…"**.
- Encontrou: Rua, Bairro, Cidade e UF são preenchidos, e o foco vai para
  **Número**, que é o próximo campo que a pessoa precisa digitar.
- CEP inexistente: erro no campo, **"CEP não encontrado."** Os campos de
  endereço continuam editáveis.
- Falha de rede no ViaCEP: ajuda com **"Não foi possível buscar o CEP.
  Preencha o endereço manualmente."** O formulário continua funcionando.
- Mudar o CEP depois de preenchido busca de novo.

### Resumo

- Abaixo dos campos, uma linha resume o pedido e acompanha cada mudança:
  "Cozinha · Todo mês · **R$ 79 por mês**". Para "A cada dois meses":
  "**R$ 79 a cada dois meses**". Para "Uma caixa só": "**R$ 79, uma vez**".

### Envio

- Valida tudo ao enviar. Com erro: mensagem em cada campo, alerta
  **"Corrija os campos marcados antes de assinar."** e nada é enviado.
- Tudo certo: o botão **"Confirmar assinatura"** entra em carregando e a
  aplicação cria a assinatura (`POST /assinaturas`) com:
  - o `usuarioId` de quem está logado e o `kitId` da URL;
  - os campos do formulário, com o CEP **só com números**;
  - `status: "ativa"` e `criadaEm` com a data e hora atuais em ISO
    (`new Date().toISOString()`).
- Deu certo: vai para `/minha-conta` com o alerta **"Assinatura criada. A
  primeira caixa sai na próxima remessa."**
- Erro da API: alerta **"Não foi possível concluir a assinatura. Tente de
  novo."** O formulário mantém tudo o que foi digitado.
- O botão fica desabilitado enquanto envia: dois cliques **não** criam duas
  assinaturas.

## 8. Minha conta · `/minha-conta` (só logado)

### Ao abrir

- Título "Minha conta" e o texto "{nome} · {e-mail}".
- Se a pessoa chegou depois de assinar, o alerta de sucesso aparece no topo.
- Busca as assinaturas **de quem está logado**, já com os dados do kit de cada
  uma (veja `_expand` no guia da API). Carregando, erro e vazio valem aqui.
- Vazio: **"Você ainda não tem assinaturas."** e o botão **"Escolher um
  kit"**, que vai para `/kits`.

### Cada assinatura

Em uma tabela no computador, que rola de lado no celular:

| Coluna | Conteúdo |
| --- | --- |
| Kit | nome do kit |
| Frequência | "Todo mês", "A cada dois meses" ou "Uma caixa só" |
| Entrega | "{rua}, {número} · {cidade}/{UF}" |
| Situação | etiqueta **Ativa** (sucesso) ou **Pausada** (aviso) |
| Valor | "R$ 79" |
| Ações | os botões abaixo |

### Ações

| Ação | Quando aparece | O que faz | Aviso de sucesso |
| --- | --- | --- | --- |
| **Pausar** | assinatura ativa | `PATCH` com `status: "pausada"` | "Assinatura pausada. Nenhuma caixa sai até você retomar." |
| **Retomar** | assinatura pausada | `PATCH` com `status: "ativa"` | "Assinatura retomada." |
| **Trocar kit** | sempre | abre uma janela com a lista dos kits **disponíveis** (sem o atual); escolher e confirmar faz `PATCH` com o novo `kitId` | "Kit trocado para {nome}." |
| **Cancelar** | sempre | abre a janela de confirmação; confirmar faz `DELETE` | "Assinatura cancelada." |

- Enquanto uma ação está em andamento, **o botão dela** fica em carregando, e
  os botões daquela linha ficam desabilitados.
- Depois da resposta, a tabela muda **na hora**, atualizando o estado. Não
  busque a lista inteira de novo e não recarregue a página.
- Erro em qualquer ação: aviso **"Não foi possível concluir. Tente de novo."**
  A linha volta ao que era.
- Os avisos de sucesso e de erro aparecem no aviso flutuante (`toast`) e
  somem em 3 segundos.

### Janela de cancelamento

- Título **"Cancelar a assinatura do kit {nome}?"**, texto **"As caixas que já
  saíram continuam a caminho. Essa ação não pode ser desfeita."** e dois
  botões: **"Manter assinatura"** (fecha) e **"Cancelar assinatura"** (botão
  de perigo, confirma).
- Fecha pelo X, pela tecla Esc, pelo clique fora e por "Manter assinatura".

## 9. Rotas protegidas

- Quem não está logado e abre `/assinar/3` ou `/minha-conta` vai para
  `/entrar`, e a aplicação **guarda para onde a pessoa queria ir**. Depois do
  login, ela volta exatamente para lá.
- Recarregar a página em uma rota protegida, estando logado, **não** manda para
  o login: o contexto lê o `localStorage` antes de decidir.

## 10. Página não encontrada · qualquer outra rota

- Dentro do mesmo layout (com topo e rodapé): **"Página não encontrada"**, o
  texto **"O endereço pode ter mudado, ou a semente ainda não brotou."** e o
  botão **"Voltar para o início"**.

## 11. Teclado e acessibilidade

- Tudo funciona pelo teclado, e o foco aparece em tudo que é clicável.
- Cada campo tem um `label` ligado pelo `htmlFor` (no JSX, `for` vira
  `htmlFor`).
- Campo com erro: `aria-invalid` e mensagem ligada pelo `aria-describedby`.
- Imagens com `alt`. A foto da abertura é decorativa? Decida e justifique no
  README.
