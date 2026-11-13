# Comportamento esperado · Jogo de Dados

Este documento é a especificação do jogo: o que aparece na tela e como ela
reage ao clique. A marcação de cada parte está em `docs/02-componentes.md`.

## 1. Ao abrir

Como em `referencias/01-inicio.png`:

- O título "Jogo de Dados" e o subtítulo "Três dados, uma soma. Boa sorte!".
- Os três dados mostrando **1**.
- No lugar da soma, a dica **"Clique no botão para rolar os dados."**
- O botão **"Rolar os dados"**.
- O contador: **"Nenhuma rolagem ainda"**.

## 2. A cada clique em "Rolar os dados"

Como em `referencias/02-depois-de-rolar.png`:

1. **Cada um** dos três dados sorteia uma face nova, de 1 a 6, independente
   dos outros. Pode repetir a face anterior, e os dados podem mostrar o mesmo
   número entre si: é sorte.
2. A dica dá lugar à **soma**: o rótulo "Soma" e o total dos três dados.
3. O contador sobe 1: "1 rolagem", "2 rolagens", "3 rolagens"...

A soma vai de **3** (1 + 1 + 1) a **18** (6 + 6 + 6) e está sempre certa para
os dados que aparecem na tela.

## 3. Os dados

- Cada dado desenha a face com os pontinhos na posição de um dado de verdade
  (o CSS cuida das posições, dos pontos quadrados e do ponto vermelho do 1;
  veja `docs/02-componentes.md`).
- Cada dado tem `role="img"` e `aria-label` com o valor: "Dado mostrando 5".

## 4. Regras comuns

- A tela muda **só** pelo estado: nenhum `document.querySelector`,
  `innerHTML`, `addEventListener` ou `style={{ }}`.
- Nenhum `alert()`.
- O jogo funciona em tela larga e no celular (`referencias/03-celular.png`).
- O console fica limpo, sem erros e sem o aviso de `key`.
