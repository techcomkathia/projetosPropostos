// LEGADO: solução antiga (clube, assinar, livro). Fora do escopo da M3-U2.
// Página Assinar

const nomesDasFormasDePagamento = { cartao: "Cartão de crédito", pix: "Pix", boleto: "Boleto" };

// Escolhas atuais da pessoa no formulário; a página sempre abre no semestral, à vista
const estado = {
  idDoPlano: "semestral",
  modalidade: "avista",
  formaDePagamento: "cartao",
};

const formulario = document.getElementById("formulario-assinatura");
const opcoesDePlano = document.getElementById("opcoes-plano");
const camposDeModalidade = formulario.querySelectorAll('input[name="modo"]');
const opcoesDePagamento = document.getElementById("opcoes-pagamento");
const camposDoCartao = document.getElementById("campos-cartao");
const ajudaPix = document.getElementById("ajuda-pix");
const ajudaBoleto = document.getElementById("ajuda-boleto");

// Escreve um texto dentro do elemento com o id informado
function preencher(id, texto) {
  document.getElementById(id).textContent = texto;
}

// Forma de pagamento válida: se a modalidade não aceita a escolhida, volta para cartão
function formaDePagamentoAtual() {
  return formasDePagamento(estado.modalidade).includes(estado.formaDePagamento)
    ? estado.formaDePagamento
    : "cartao";
}

// Cria um grupo de botões em que só um fica selecionado
function criarBotoesDeOpcao(recipiente, opcoes, idSelecionado, aoEscolher) {
  recipiente.replaceChildren(
    ...opcoes.map((opcao) => {
      const botao = criarElemento("button", "formulario-assinatura__opcao", opcao.rotulo);
      botao.type = "button";
      botao.classList.toggle("formulario-assinatura__opcao--selecionada", opcao.id === idSelecionado);
      botao.addEventListener("click", () => aoEscolher(opcao.id));
      return botao;
    }),
  );
}

// Redesenha a página de acordo com o estado atual
function atualizar() {
  const plano = buscarPlano(estado.idDoPlano);
  const formaDePagamento = formaDePagamentoAtual();

  criarBotoesDeOpcao(
    opcoesDePlano,
    planos.map((p) => ({ id: p.id, rotulo: p.nome })),
    estado.idDoPlano,
    (id) => {
      estado.idDoPlano = id;
      atualizar();
    },
  );

  // À vista ou parcelado
  camposDeModalidade.forEach((campo) => {
    const selecionado = campo.value === estado.modalidade;
    campo.checked = selecionado;
    campo
      .closest(".formulario-assinatura__modalidade")
      .classList.toggle("formulario-assinatura__modalidade--selecionada", selecionado);
  });
  preencher("modalidade-avista-texto", `À vista: ${emReais(valorAVista(plano))}`);
  preencher("modalidade-avista-dica", `${plano.descontoAVista}% de desconto · cartão, Pix ou boleto`);
  preencher("modalidade-parcelado-texto", `${plano.meses}x de ${emReais(plano.valorDaParcela)} no cartão`);
  preencher(
    "modalidade-parcelado-dica",
    `Total de ${emReais(totalParcelado(plano))} · parcelas fixas, sem renovação`,
  );

  criarBotoesDeOpcao(
    opcoesDePagamento,
    formasDePagamento(estado.modalidade).map((forma) => ({
      id: forma,
      rotulo: nomesDasFormasDePagamento[forma],
    })),
    formaDePagamento,
    (id) => {
      estado.formaDePagamento = id;
      atualizar();
    },
  );

  // Campos do cartão: escondidos e desativados para não bloquear o envio com Pix ou boleto
  camposDoCartao.hidden = formaDePagamento !== "cartao";
  camposDoCartao.querySelectorAll("input").forEach((campo) => {
    campo.disabled = formaDePagamento !== "cartao";
  });
  ajudaPix.hidden = formaDePagamento !== "pix";
  ajudaBoleto.hidden = formaDePagamento !== "boleto";

  // Resumo ao lado do formulário
  preencher("resumo-titulo", `Plano ${plano.nome}`);
  preencher("resumo-descricao", `${plano.meses} livros · um por mês`);
  preencher("resumo-ciclo", emReais(totalParcelado(plano)));
  document.getElementById("resumo-desconto").hidden = estado.modalidade !== "avista";
  preencher("resumo-desconto-rotulo", `Desconto à vista (${plano.descontoAVista}%)`);
  preencher("resumo-desconto-valor", `− ${emReais(totalParcelado(plano) - valorAVista(plano))}`);
  preencher(
    "resumo-total-rotulo",
    estado.modalidade === "avista" ? "Total à vista" : `${plano.meses} parcelas no cartão`,
  );

  const valorTotal = document.getElementById("resumo-total-valor");
  valorTotal.textContent =
    estado.modalidade === "avista"
      ? emReais(valorAVista(plano))
      : `${plano.meses}x de ${emReais(plano.valorDaParcela)}`;
  valorTotal.classList.toggle("resumo-assinatura__parcelas", estado.modalidade === "parcelado");

  preencher("resumo-forma-pagamento", `Forma de pagamento: ${nomesDasFormasDePagamento[formaDePagamento]}`);
}

camposDeModalidade.forEach((campo) => {
  campo.addEventListener("change", () => {
    estado.modalidade = campo.value;
    atualizar();
  });
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const plano = buscarPlano(estado.idDoPlano);
  const formaDePagamento = formaDePagamentoAtual();

  let mensagem = "";
  if (formaDePagamento === "pix") mensagem += "Seu código Pix foi gerado (simulação). ";
  if (formaDePagamento === "boleto") mensagem += "Seu boleto foi gerado (simulação). ";
  mensagem += `Plano ${plano.nome} confirmado`;
  mensagem += estado.modalidade === "parcelado" ? ` em ${plano.meses} parcelas no cartão` : " à vista";
  mensagem += ". Enviaremos os detalhes por e-mail.";

  preencher("mensagem-confirmacao", mensagem);
  document.getElementById("pagina-assinatura").hidden = true;
  document.getElementById("confirmacao").hidden = false;
  window.scrollTo(0, 0);
});

atualizar();
