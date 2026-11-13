// Dados do Medida Certa.
// Não copie estas listas para o seu código: use as constantes direto.

// Medidas de cozinha. "ml" diz quantos mililitros cabem em 1 unidade.
// Gramas não é medida de volume, por isso o ml é null.
const UNIDADES = [
  { id: "xicara", singular: "xícara", plural: "xícaras", ml: 240 },
  { id: "colher-sopa", singular: "colher de sopa", plural: "colheres de sopa", ml: 15 },
  { id: "colher-cha", singular: "colher de chá", plural: "colheres de chá", ml: 5 },
  { id: "ml", singular: "ml", plural: "ml", ml: 1 },
  { id: "gramas", singular: "grama", plural: "gramas", ml: null }
];

// Quantos gramas cabem em 1 xícara (240 ml) de cada ingrediente.
// Valores aproximados: ingrediente solto e medida nivelada.
const INGREDIENTES = [
  { id: "farinha-de-trigo", nome: "farinha de trigo", gramasPorXicara: 120 },
  { id: "acucar-refinado", nome: "açúcar refinado", gramasPorXicara: 180 },
  { id: "acucar-mascavo", nome: "açúcar mascavo", gramasPorXicara: 150 },
  { id: "manteiga", nome: "manteiga", gramasPorXicara: 200 },
  { id: "leite", nome: "leite", gramasPorXicara: 240 },
  { id: "oleo", nome: "óleo", gramasPorXicara: 220 },
  { id: "agua", nome: "água", gramasPorXicara: 240 },
  { id: "arroz-cru", nome: "arroz cru", gramasPorXicara: 190 },
  { id: "chocolate-em-po", nome: "chocolate em pó", gramasPorXicara: 90 },
  { id: "aveia-em-flocos", nome: "aveia em flocos", gramasPorXicara: 80 },
  { id: "amido-de-milho", nome: "amido de milho", gramasPorXicara: 150 },
  { id: "fuba", nome: "fubá", gramasPorXicara: 130 },
  { id: "coco-ralado", nome: "coco ralado", gramasPorXicara: 80 },
  { id: "mel", nome: "mel", gramasPorXicara: 340 }
];
