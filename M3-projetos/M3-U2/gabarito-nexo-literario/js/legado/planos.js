// LEGADO: solução antiga (clube, assinar, livro). Fora do escopo da M3-U2.
// Planos de assinatura

const planos = [
  { id: "trimestral", nome: "Trimestral", meses: 3, valorDaParcela: 69.9, descontoAVista: 5 },
  {
    id: "semestral",
    nome: "Semestral",
    meses: 6,
    valorDaParcela: 64.9,
    descontoAVista: 10,
    destaque: true,
  },
  { id: "anual", nome: "Anual", meses: 12, valorDaParcela: 59.9, descontoAVista: 15 },
];

const buscarPlano = (id) => planos.find((plano) => plano.id === id);

/** Total do ciclo parcelado em uma parcela por livro. */
const totalParcelado = (plano) => Math.round(plano.valorDaParcela * plano.meses * 100) / 100;

/** Valor único à vista, com desconto aplicado sobre o total do ciclo. */
const valorAVista = (plano) =>
  Math.round((Math.round(totalParcelado(plano) * 100) * (100 - plano.descontoAVista)) / 100) / 100;

/** Parcelado aceita só cartão; à vista aceita cartão, Pix ou boleto. */
const formasDePagamento = (modalidade) =>
  modalidade === "parcelado" ? ["cartao"] : ["cartao", "pix", "boleto"];

// Formata um número como dinheiro: 69.9 → "R$ 69,90"
const emReais = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ===== Tabela de preços (usada na página do clube) =====

// Cria o preço de um plano conforme a modalidade (dois parágrafos)
function criarPrecoDoPlano(plano, modalidade) {
  const valor = criarElemento("p", "precos__valor");
  const detalhes = criarElemento("p", "precos__detalhes");

  if (modalidade === "avista") {
    valor.textContent = emReais(valorAVista(plano));
    detalhes.append(
      "pagamento único · ",
      criarElemento("s", "", emReais(totalParcelado(plano))),
      ` · ${plano.descontoAVista}% off`,
    );
  } else {
    valor.append(emReais(plano.valorDaParcela), criarElemento("span", "precos__periodo", "por parcela"));
    detalhes.textContent = `${plano.meses} parcelas no cartão · total de ${emReais(
      totalParcelado(plano),
    )} · sem renovação`;
  }
  return [valor, detalhes];
}

function criarCartaoDoPlano(plano, modalidade) {
  const artigo = criarElemento("article", "precos__plano");
  artigo.classList.toggle("precos__plano--destaque", Boolean(plano.destaque));

  const beneficios = criarElemento("ul", "precos__beneficios");
  beneficios.append(
    criarElemento("li", "", `· ${plano.meses} livros, um por mês`),
    criarElemento("li", "", "· Nota editorial exclusiva"),
    criarElemento("li", "", "· Encontros mensais de leitura"),
  );

  const acao = criarElemento("a", "precos__acao", `Assinar ${plano.nome.toLowerCase()}`);
  acao.href = "assinar.html";

  artigo.append(
    criarElemento("p", "sobretitulo", plano.destaque ? "Mais escolhido" : `${plano.meses} livros`),
    criarElemento("h3", "precos__nome-plano", plano.nome),
    ...criarPrecoDoPlano(plano, modalidade),
    beneficios,
    acao,
  );
  return artigo;
}

function criarAba(modalidade, texto) {
  const aba = criarElemento("button", "precos__aba", texto);
  aba.type = "button";
  aba.setAttribute("role", "tab");
  aba.dataset.modalidade = modalidade;
  return aba;
}

function configurarTabelaDePrecos(recipiente) {
  let modalidade = "avista";

  // Cabeçalho, abas e observação: criados uma vez só
  const precos = criarElemento("div", "precos");
  const cabecalho = criarElemento("div", "precos__cabecalho");
  const containerDasAbas = criarElemento("div", "precos__abas");
  containerDasAbas.setAttribute("role", "tablist");

  const abas = [
    criarAba("avista", "À vista com desconto"),
    criarAba("parcelado", "Parcelado no cartão"),
  ];
  containerDasAbas.append(...abas);
  cabecalho.append(criarElemento("h2", "precos__titulo", "Escolha seu ciclo de leitura"), containerDasAbas);

  const grade = criarElemento("div", "precos__grade");
  const observacao = criarElemento(
    "p",
    "precos__observacao",
    "À vista: cartão, Pix ou boleto, com desconto. Parcelado: parcelas fixas no cartão, " +
      "limitadas ao ciclo escolhido. O plano não renova automaticamente.",
  );

  precos.append(cabecalho, grade, observacao);
  recipiente.append(precos);

  // A cada troca de aba, só a grade é redesenhada
  function atualizar() {
    abas.forEach((aba) => {
      const ativa = aba.dataset.modalidade === modalidade;
      aba.classList.toggle("precos__aba--ativa", ativa);
      aba.setAttribute("aria-selected", String(ativa));
    });
    grade.replaceChildren(...planos.map((plano) => criarCartaoDoPlano(plano, modalidade)));
  }

  abas.forEach((aba) => {
    aba.addEventListener("click", () => {
      modalidade = aba.dataset.modalidade;
      atualizar();
    });
  });

  atualizar();
}
