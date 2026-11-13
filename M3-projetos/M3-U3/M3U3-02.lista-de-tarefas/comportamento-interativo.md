# Comportamento esperado · Lista de Tarefas

Este documento é a especificação da aplicação: o que aparece na tela e como
ela reage a cada ação. A marcação de cada parte está em
`docs/02-componentes.md`.

## 1. Ao abrir

Como em `referencias/01-lista-vazia.png`:

- O sobretítulo "Lista de tarefas" e o título "O que vamos fazer hoje?".
- O resumo: **"0 tarefas"**, **"0 concluídas"** e **"0 prioritárias"**.
- O formulário em branco: descrição vazia, contador "0/80", categoria em
  "Escolha", prazo vazio, interruptor desligado e o botão **desativado**.
- No lugar da lista, o aviso **"Nenhuma tarefa por aqui"**.

A lista começa vazia **sempre**, inclusive ao recarregar a página: as tarefas
ficam só no estado, sem `localStorage`.

## 2. Preenchendo o formulário

| Campo | Comportamento |
| --- | --- |
| Descrição | aceita no máximo 80 letras (`maxLength`). O contador mostra quantas já foram digitadas, de "0/80" a "80/80", e fica laranja a partir de 70 |
| Categoria | as cinco opções vêm da lista `CATEGORIAS`, depois de "Escolha" |
| Prazo | um calendário do navegador; pode ficar vazio |
| Prioritária | o interruptor liga e desliga; ligado, a caixa fica rosada |
| Botão | desativado enquanto a descrição estiver vazia ou só com espaços |

## 3. Ao clicar em "Adicionar tarefa" (ou apertar Enter)

A página **não recarrega**. Os campos são conferidos:

| Campo | Regra | Mensagem |
| --- | --- | --- |
| Descrição | pelo menos 3 letras, sem contar espaços do começo e do fim | A tarefa precisa ter pelo menos 3 letras. |
| Categoria | uma categoria escolhida | Escolha uma categoria. |
| Prazo | vazio, ou hoje, ou um dia futuro | O prazo não pode ser um dia que já passou. |

### Com erro

Como em `referencias/03-erros.png`:

- A tarefa **não** entra na lista.
- Cada campo com problema fica com a borda vermelha (`aria-invalid="true"`) e
  a mensagem aparece embaixo dele (ligada pelo `aria-describedby`).
- O que a pessoa digitou **continua** nos campos.
- Quando a pessoa altera um campo com erro, a mensagem **daquele** campo some.
  As outras continuam até serem corrigidas ou até um novo envio.

### Sem erro

- A tarefa entra na lista com:
  - a descrição **sem** os espaços do começo e do fim;
  - a categoria, o prazo (ou `""`) e se é prioritária;
  - um `id` novo e `concluida: false`.
- **Onde ela entra:**
  - **prioritária**: no **topo** da lista, acima de todas, inclusive das
    outras prioritárias (a mais recente fica em primeiro);
  - **não prioritária**: no **fim** da lista.
- O formulário volta ao começo: campos em branco, interruptor desligado,
  nenhum erro e o botão desativado.
- O resumo se atualiza.

## 4. A lista

Como em `referencias/02-com-tarefas.png`. Cada tarefa mostra:

- a caixinha de concluir, à esquerda;
- a descrição;
- o selo **"Prioritária"** (só nas prioritárias);
- a etiqueta da categoria, com o rótulo e a cor da categoria;
- o prazo no formato "até 18/11" (só se tiver prazo);
- o botão "×", à direita.

As prioritárias têm a **cor de destaque**: faixa coral à esquerda, fundo
rosado e a caixinha com borda coral.

### Concluir

Clicar na caixinha (ou no texto da tarefa) marca a tarefa como concluída: a
caixinha ganha o check, a descrição fica riscada e os detalhes ficam
apagados. Clicar de novo desmarca. A tarefa **não muda de lugar**.

### Excluir

Clicar no "×" tira a tarefa da lista na hora, sem pedir confirmação. Ao
excluir a última, volta o aviso de lista vazia.

## 5. O resumo

Sempre de acordo com a lista:

- **tarefas**: quantas existem;
- **concluídas**: quantas estão marcadas;
- **prioritárias**: quantas são prioritárias (concluídas ou não).

Singular só com 1: "1 tarefa", "1 concluída", "1 prioritária".

## 6. Regras comuns

- Nenhum `alert()`, `confirm()` ou `prompt()`.
- Nenhum `document.querySelector`, `innerHTML` ou `style={{ }}`.
- Funciona com teclado: Tab passa por todos os campos, pelas caixinhas e
  pelos "×"; Espaço liga o interruptor e marca a caixinha; Enter envia.
- Funciona em tela larga e no celular (`referencias/04-celular.png`): no
  celular, o formulário fica em cima e a lista embaixo.
- O console fica limpo, sem erros e sem o aviso de `key`.
