# Briefing do cliente · Raiz & Cia Área do assinante

Documento de entrada do projeto: o pedido, os textos e as mensagens aprovadas.
O comportamento de cada tela está em `comportamento-interativo.md`, na raiz.

---

## A cliente

A **Raiz & Cia** vende kits de sementes por assinatura. Cada caixa traz
sementes escolhidas para a estação, terra, um vaso de fibra e um guia de
plantio de duas páginas. A loja é da **Lúcia**, que cuida de tudo com uma
ajudante.

No Módulo 2, você fez a página de apresentação da loja. Agora são mais de
trezentos assinantes.

## O problema

Toda pausa, troca e cancelamento chega por mensagem no Instagram. A Lúcia
copia na mão para uma planilha, e os erros aparecem: caixa mandada para quem
tinha pausado, kit errado, endereço trocado.

## O pedido

> "Quero que a pessoa entre, escolha o kit, assine e depois resolva a vida
> dela sozinha: pausar nas férias, trocar de kit, cancelar. Sem me chamar."

Na prática:

- um **catálogo** que dê para filtrar pelo que importa para quem planta (sol
  ou sombra) e cujo link dê para mandar para alguém;
- uma **página para cada kit**, com os cuidados, para a pessoa saber o que vai
  receber;
- **cadastro e login**, para cada pessoa ver só o que é dela;
- uma **assinatura sem atrito**: o CEP preenche o endereço sozinho;
- uma **área do assinante** para pausar, retomar, trocar de kit e cancelar.

## O que a cliente **não** quer

- Cobrança pelo site. "Por enquanto eu confirmo por e-mail e cobro do jeito
  que já cobro."
- Tela em branco ou travada enquanto carrega.
- Cancelamento sem confirmação. "Já aconteceu de a pessoa cancelar sem querer
  e eu perder a cliente."
- Mensagem técnica para o assinante ("Error 500", "Failed to fetch").

## Tom

O mesmo do site: direto, simples e caseiro. Frases curtas, em segunda pessoa,
sem exclamação. As mensagens de erro dizem o que fazer, não o que quebrou.

## Os dados

As regras de negócio que importam para a tela:

- **Preço**: cada kit tem o preço **por caixa**. A frequência define quantas
  caixas saem: todo mês, a cada dois meses ou uma só.
- **Situação do kit**:
  - `disponivel`: aceita qualquer frequência;
  - `sazonal`: só sai como caixa avulsa ("Uma caixa só");
  - `lista-de-espera`: não aceita assinatura nova.
- **Situação da assinatura**: `ativa` ou `pausada`. Cancelar **apaga** a
  assinatura.
- Uma pessoa pode ter várias assinaturas, inclusive do mesmo kit.

---

## Textos aprovados

Use exatamente como está. `{entre chaves}` é o valor que muda.

### Início

**Abertura**
> Sementes da estação, uma caixa por mês.
>
> Escolhemos o que dá certo plantar agora, mandamos com terra, vaso de fibra e
> um guia de duas páginas. Você planta no domingo.

Botão: **Ver os kits** · Link: **Como funciona**

**Kits em destaque**
> Kits da estação
>
> Frete incluso. Troque de kit quando quiser.

**Como funciona**

| Passo | Título | Texto |
| --- | --- | --- |
| 1 | Escolha o kit | Pelo que você quer colher e pela luz que bate na sua janela. |
| 2 | Assine | Todo mês, a cada dois meses ou uma caixa só. Sem fidelidade. |
| 3 | Plante e resolva tudo por aqui | Pausar nas férias, trocar de kit ou cancelar: é na sua conta, sem mandar mensagem. |

### Catálogo

> Kits
>
> Frete incluso. Troque de kit quando quiser.

### Assinar

> Confirmamos por e-mail em um dia útil. Nenhuma cobrança nesta etapa.

### Rodapé

> Raiz & Cia · © 2026 Raiz & Cia. Todos os direitos reservados.

---

## Mensagens aprovadas

### Carregando, erro e vazio

| Tela | Carregando | Erro | Vazio |
| --- | --- | --- | --- |
| Início (destaques) | cartões-esqueleto | Não foi possível carregar os kits. | (não acontece) |
| Catálogo | cartões-esqueleto | Não foi possível carregar os kits. | Nenhum kit encontrado com esses filtros. |
| Página do kit | Carregando kit… | Não foi possível carregar este kit. | (404) Kit não encontrado |
| Assinar | Carregando kit… | Não foi possível carregar este kit. | (404) Kit não encontrado |
| Minha conta | Carregando suas assinaturas… | Não foi possível carregar suas assinaturas. | Você ainda não tem assinaturas. |

Todo estado de erro tem o botão **Tentar de novo**.

### Textos da tela

| Onde | Texto |
| --- | --- |
| Contador do catálogo | 1 kit · {n} kits |
| Botão do catálogo vazio | Limpar filtros |
| Preço na página do kit | R$ {preço} por caixa |
| Kit sazonal | Kit sazonal: disponível só como caixa avulsa. |
| Kit em lista de espera | Este kit está com a lista de espera aberta. Escolha outro kit enquanto isso. |
| Botão de kit em lista de espera | Em lista de espera |
| Link do 404 do kit | Ver todos os kits |
| Página não encontrada, título | Página não encontrada |
| Página não encontrada, texto | O endereço pode ter mudado, ou a semente ainda não brotou. |
| Página não encontrada, botão | Voltar para o início |

### Traduções dos dados

| Campo | Na API | Na tela |
| --- | --- | --- |
| luz | `sol-pleno` | sol pleno |
| luz | `meia-sombra` | meia-sombra |
| luz | `sortido` | sortido |
| dificuldade | `facil` | Fácil |
| dificuldade | `media` | Média |
| dificuldade | `desafiadora` | Desafiadora |
| situação do kit | `sazonal` | Sazonal |
| situação do kit | `lista-de-espera` | Lista de espera |
| frequência | `mensal` | Todo mês |
| frequência | `bimestral` | A cada dois meses |
| frequência | `avulsa` | Uma caixa só |
| local | `janela` / `varanda` / `quintal` | Janela / Varanda / Quintal |
| situação da assinatura | `ativa` / `pausada` | Ativa / Pausada |

> Dica: as traduções são **objetos** em um arquivo só (por exemplo,
> `src/utils/rotulos.js`), importados onde precisar.

### Formulários

| Campo | Situação | Mensagem |
| --- | --- | --- |
| Nome | vazio ou menos de 3 letras | Informe seu nome completo. |
| E-mail | vazio | Informe seu e-mail. |
| E-mail | formato inválido | Digite um e-mail válido, como nome@email.com. |
| E-mail (cadastro) | já existe | Este e-mail já tem uma conta. |
| Senha (entrar) | vazio | Informe sua senha. |
| Senha (cadastro) | menos de 6 caracteres | A senha precisa ter pelo menos 6 caracteres. |
| Confirmar senha | diferente | As senhas não são iguais. |
| Frequência | nenhuma marcada | Escolha a frequência. |
| Local | nenhum marcado | Escolha onde a horta vai ficar. |
| CEP | vazio ou diferente de 8 números | Digite um CEP com 8 números. |
| CEP | não existe | CEP não encontrado. |
| Rua, Número, Bairro, Cidade | vazio | Preencha este campo. |
| UF | diferente de 2 letras | Use a sigla do estado, como SP. |
| Observação | mais de 200 caracteres | Use até 200 caracteres. |

| Onde | Texto |
| --- | --- |
| Login recusado | E-mail ou senha incorretos. |
| Assinar, com erros | Corrija os campos marcados antes de assinar. |
| CEP, buscando | Buscando endereço… |
| CEP, falha de rede | Não foi possível buscar o CEP. Preencha o endereço manualmente. |
| Resumo, mensal | {kit} · Todo mês · R$ {preço} por mês |
| Resumo, bimestral | {kit} · A cada dois meses · R$ {preço} a cada dois meses |
| Resumo, avulsa | {kit} · Uma caixa só · R$ {preço}, uma vez |

### Sucesso e erro das ações

| Ação | Mensagem |
| --- | --- |
| Conta criada | Conta criada. Agora é só escolher o seu kit. |
| Assinatura criada | Assinatura criada. A primeira caixa sai na próxima remessa. |
| Erro ao assinar | Não foi possível concluir a assinatura. Tente de novo. |
| Pausar | Assinatura pausada. Nenhuma caixa sai até você retomar. |
| Retomar | Assinatura retomada. |
| Trocar kit | Kit trocado para {nome}. |
| Cancelar | Assinatura cancelada. |
| Erro em qualquer ação da Minha conta | Não foi possível concluir. Tente de novo. |

### Janelas

| Janela | Título | Texto | Botões |
| --- | --- | --- | --- |
| Cancelar | Cancelar a assinatura do kit {nome}? | As caixas que já saíram continuam a caminho. Essa ação não pode ser desfeita. | Manter assinatura · Cancelar assinatura |
| Trocar kit | Trocar o kit {nome} | Escolha o novo kit. A troca vale a partir da próxima caixa. | Voltar · Trocar kit |

---

## Usuários de teste

Já estão no `db.json`:

| Nome | E-mail | Senha | Assinaturas |
| --- | --- | --- | --- |
| Maria Andrade | maria@email.com | horta123 | duas (uma ativa, uma pausada) |
| João Pereira | joao@email.com | semente123 | nenhuma (bom para testar o estado vazio) |
