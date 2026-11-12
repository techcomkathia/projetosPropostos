// Planos: busca GET /planos, calcula os valores e monta os cartões.

const listaDePlanos = document.getElementById("lista-planos");
const botaoTentarPlanos = document.getElementById("planos-tentar-novamente");

const mostrarEstadoDosPlanos = criarControleDeEstados({
  carregando: document.getElementById("planos-carregando"),
  erro: document.getElementById("planos-erro"),
  vazio: document.getElementById("planos-vazio"),
  lista: listaDePlanos,
});

// 64.9 → "R$ 64,90"
const emReais = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Contas em centavos inteiros para evitar erros de ponto flutuante.
// Trimestral: 6990 × 3 = 20970; 20970 × 95 / 100 = 19921,5 → 19922 (R$ 199,22).
function calcularValores(plano) {
  const totalEmCentavos = Math.round(plano.valorDaParcela * 100) * plano.meses;
  const aVistaEmCentavos = Math.round((totalEmCentavos * (100 - plano.descontoAVista)) / 100);
  return {
    totalParcelado: totalEmCentavos / 100,
    desconto: (totalEmCentavos - aVistaEmCentavos) / 100,
    valorAVista: aVistaEmCentavos / 100,
  };
}

function criarCartaoDoPlano(plano) {
  const valores = calcularValores(plano);
  const artigo = criarElemento("article", "precos__plano");

  if (plano.destaque === true) {
    artigo.classList.add("precos__plano--destaque");
    artigo.append(criarElemento("p", "sobretitulo", "Mais escolhido"));
  }

  const parcela = criarElemento("p", "precos__valor", emReais(plano.valorDaParcela));
  parcela.append(criarElemento("span", "precos__periodo", "por mês"));

  const aVista = criarElemento("p", "precos__valor", emReais(valores.valorAVista));
  aVista.append(criarElemento("span", "precos__periodo", "à vista"));

  artigo.append(
    criarElemento("p", "sobretitulo", `${plano.meses} livros`),
    criarElemento("h2", "precos__nome-plano", plano.nome),
    parcela,
    criarElemento(
      "p",
      "precos__detalhes",
      `${plano.meses} parcelas no cartão · total de ${emReais(valores.totalParcelado)}`,
    ),
    aVista,
    criarElemento(
      "p",
      "precos__detalhes",
      `${plano.descontoAVista}% de desconto · economia de ${emReais(valores.desconto)}`,
    ),
  );

  const beneficios = Array.isArray(plano.beneficios) ? plano.beneficios : [];
  if (beneficios.length > 0) {
    const lista = criarElemento("ul", "precos__beneficios");
    beneficios.forEach((beneficio) => lista.append(criarElemento("li", "", beneficio)));
    artigo.append(lista);
  }
  return artigo;
}

async function carregarPlanos() {
  listaDePlanos.replaceChildren();
  mostrarEstadoDosPlanos("carregando");

  try {
    const planos = await buscarColecao("planos");
    if (planos.length === 0) {
      mostrarEstadoDosPlanos("vazio");
      return;
    }
    listaDePlanos.append(...planos.map(criarCartaoDoPlano));
    mostrarEstadoDosPlanos("sucesso");
  } catch (erro) {
    console.error(erro);
    mostrarEstadoDosPlanos("erro");
  }
}

botaoTentarPlanos.addEventListener("click", carregarPlanos);
carregarPlanos();
