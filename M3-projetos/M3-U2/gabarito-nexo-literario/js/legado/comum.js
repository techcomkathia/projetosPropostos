// LEGADO: solução antiga (clube, assinar, livro). Fora do escopo da M3-U2.
// Código compartilhado por todas as páginas.
// Deve ser carregado depois de js/livros.js.

// ===== Dados dos livros =====
const rotulosTrimestres = ["Jan – Mar", "Abr – Jun", "Jul – Set", "Out – Dez"];

const formatadorDeMes = new Intl.DateTimeFormat("pt-BR", { month: "long", timeZone: "UTC" });

// Transforma o número do mês (1 a 12) no nome do mês: 1 → "Janeiro"
function formatarMes(mes) {
  const nomeDoMes = formatadorDeMes.format(new Date(Date.UTC(2026, mes - 1, 1)));
  return nomeDoMes.charAt(0).toLocaleUpperCase("pt-BR") + nomeDoMes.slice(1);
}

// Lista de livros ordenada por mês, com o nome do mês e o trimestre de cada um
const livros = LIVROS.map((livro) => ({
  ...livro,
  nomeDoMes: formatarMes(livro.mes),
  trimestre: rotulosTrimestres[Math.floor((livro.mes - 1) / 3)] ?? "",
})).sort((primeiro, segundo) => primeiro.mes - segundo.mes);

// Livros agrupados por trimestre: [{ rotulo: "Jan – Mar", livros: [...] }, ...]
const trimestres = rotulosTrimestres
  .map((rotulo, indice) => ({
    rotulo,
    livros: livros.filter((livro) => Math.floor((livro.mes - 1) / 3) === indice),
  }))
  .filter((trimestre) => trimestre.livros.length > 0);

// ===== Funções auxiliares =====

// Cria um elemento HTML com classe e texto opcionais
function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

// Endereço da página de detalhes de um livro: livro.html?livro=capitaes-da-areia
function enderecoDoLivro(identificador) {
  return `livro.html?livro=${encodeURIComponent(identificador)}`;
}

// Capa do livro; quando não há imagem, mostra o aviso "Capa indisponível"
function criarCapaDoLivro(livro, classe) {
  const textoAlternativo = `Capa de ${livro.titulo}`;
  if (!livro.capa) {
    const aviso = criarElemento("div", `${classe} capa-indisponivel`, "Capa indisponível");
    aviso.setAttribute("role", "img");
    aviso.setAttribute("aria-label", textoAlternativo);
    return aviso;
  }
  const imagem = criarElemento("img", classe);
  imagem.src = livro.capa;
  imagem.alt = textoAlternativo;
  imagem.loading = "lazy";
  imagem.width = 672;
  imagem.height = 992;
  return imagem;
}

function criarLinkDeDetalhes(livro) {
  const link = criarElemento("a", "link-texto", "Ver detalhes");
  link.href = enderecoDoLivro(livro.identificador);
  return link;
}

// Ícones da biblioteca lucide, em SVG
function icone(desenho, tamanho = 20, atributosExtras = "") {
  return `<svg width="${tamanho}" height="${tamanho}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${atributosExtras}>${desenho}</svg>`;
}

const desenhosDosIcones = {
  setaEsquerdaCurta: '<path d="m15 18-6-6 6-6"/>',
  setaDireitaCurta: '<path d="m9 18 6-6-6-6"/>',
  setaEsquerda: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  setaDireita: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  estrela: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
};

// ===== Menu do celular =====
function configurarMenuCelular() {
  const botaoMenu = document.querySelector(".cabecalho__botao-menu");
  const menuCelular = document.getElementById("menu-celular");
  const iconeMenu = botaoMenu.querySelector(".icone-menu");
  const iconeFechar = botaoMenu.querySelector(".icone-fechar");

  function definirAberto(aberto) {
    menuCelular.hidden = !aberto;
    iconeMenu.hidden = aberto;
    iconeFechar.hidden = !aberto;
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
  }

  botaoMenu.addEventListener("click", () => definirAberto(menuCelular.hidden));
  menuCelular.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => definirAberto(false));
  });
}

// ===== Carrossel =====
// itens: [{ rotulo, conteudo }], em que conteudo é um elemento HTML.
function configurarCarrossel(recipiente, rotulo, itens) {
  if (itens.length === 0) return;
  let indiceAtivo = 0;

  const botaoAnterior = criarElemento("button", "carrossel__controle carrossel__controle--anterior");
  botaoAnterior.type = "button";
  botaoAnterior.setAttribute("aria-label", `Anterior: ${rotulo}`);
  botaoAnterior.innerHTML = `<span class="carrossel__icone-controle">${icone(desenhosDosIcones.setaEsquerdaCurta)}</span>`;

  const botaoProximo = criarElemento("button", "carrossel__controle carrossel__controle--proximo");
  botaoProximo.type = "button";
  botaoProximo.setAttribute("aria-label", `Próximo: ${rotulo}`);
  botaoProximo.innerHTML = `<span class="carrossel__icone-controle">${icone(desenhosDosIcones.setaDireitaCurta)}</span>`;

  const janela = criarElemento("div", "carrossel__janela");
  janela.setAttribute("aria-live", "polite");

  const paginacao = criarElemento("div", "carrossel__paginacao");
  paginacao.setAttribute("role", "group");
  paginacao.setAttribute("aria-label", `Selecionar ${rotulo}`);

  const elementosDosItens = itens.map((item) => {
    const elemento = criarElemento("div", "carrossel__item");
    elemento.append(item.conteudo);
    janela.append(elemento);
    return elemento;
  });

  const pontos = itens.map((item, indice) => {
    const ponto = criarElemento("button", "carrossel__ponto");
    ponto.type = "button";
    ponto.setAttribute("aria-label", `Mostrar ${item.rotulo}`);
    ponto.addEventListener("click", () => mostrar(indice));
    paginacao.append(ponto);
    return ponto;
  });

  function mostrar(indice) {
    // Faz o carrossel dar a volta: depois do último vem o primeiro
    indiceAtivo = (indice + itens.length) % itens.length;
    elementosDosItens.forEach((elemento, i) => {
      const ativo = i === indiceAtivo;
      elemento.classList.toggle("carrossel__item--ativo", ativo);
      elemento.setAttribute("aria-hidden", String(!ativo));
    });
    pontos.forEach((ponto, i) => {
      const ativo = i === indiceAtivo;
      ponto.classList.toggle("carrossel__ponto--ativo", ativo);
      if (ativo) ponto.setAttribute("aria-current", "true");
      else ponto.removeAttribute("aria-current");
    });
  }

  botaoAnterior.addEventListener("click", () => mostrar(indiceAtivo - 1));
  botaoProximo.addEventListener("click", () => mostrar(indiceAtivo + 1));

  recipiente.append(botaoAnterior, janela, botaoProximo, paginacao);
  mostrar(0);
}

configurarMenuCelular();
