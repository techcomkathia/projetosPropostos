// LEGADO: solução antiga (clube, assinar, livro). Fora do escopo da M3-U2.
// Página de detalhes do livro
// Uma página só (livro.html) para todos os livros. O livro vem do endereço:
// livro.html?livro=capitaes-da-areia. O identificador é procurado na lista
// local (js/livros.js) para descobrir o id, e o livro é buscado na API pelo id.

// Para testar localmente: npx json-server db.json (sobe em http://localhost:3000).
// Troque pelo endereço real da API do clube quando for usar com a turma.
const ENDERECO_DA_API = "http://localhost:3000/livros";

const carregando = document.getElementById("livro-carregando");
const conteudo = document.getElementById("livro-conteudo");
const erro = document.getElementById("livro-erro");
const botaoTentarDeNovo = document.getElementById("livro-tentar-de-novo");
const navegacao = document.getElementById("livro-navegacao");

// O livro pedido no endereço (undefined se o identificador não existe)
const identificador = new URLSearchParams(window.location.search).get("livro");
const posicao = livros.findIndex((livro) => livro.identificador === identificador);
const livroDaLista = livros[posicao];

// Escreve um texto dentro do elemento com o id informado
function preencher(id, texto) {
  document.getElementById(id).textContent = texto;
}

// Busca um livro na API; devolve null quando o livro não existe (404)
async function buscarLivro(id) {
  const resposta = await fetch(`${ENDERECO_DA_API}/${id}`);
  if (resposta.status === 404) return null;
  if (!resposta.ok) throw new Error(`Erro ${resposta.status} ao buscar o livro`);
  return resposta.json();
}

// Mostra só um dos três estados: "carregando", "conteudo" ou "erro"
function mostrarEstado(nome) {
  carregando.hidden = nome !== "carregando";
  conteudo.hidden = nome !== "conteudo";
  erro.hidden = nome !== "erro";
}

function mostrarErro(titulo, mensagem, podeTentarDeNovo) {
  preencher("livro-erro-titulo", titulo);
  preencher("livro-erro-mensagem", mensagem);
  botaoTentarDeNovo.hidden = !podeTentarDeNovo;
  document.title = `${titulo} — Nexo Literário`;
  mostrarEstado("erro");
}

function mostrarLivroNaoEncontrado() {
  mostrarErro("Livro não encontrado", "Este livro não está mais na programação do clube.", false);
}

function mostrarLivro(livro) {
  const capa = criarCapaDoLivro(livro, "capa pagina-livro__capa");
  capa.id = "livro-capa";
  document.getElementById("livro-capa").replaceWith(capa);

  preencher("livro-paginas", livro.paginas ?? "Não informado");
  preencher("livro-ano", livro.ano);
  preencher("livro-idioma", livro.idioma);
  preencher("livro-avaliacao", livro.nota === null ? "Sem avaliações" : `${livro.nota.toFixed(1)} / 5`);

  preencher("livro-mes", formatarMes(livro.mes));
  preencher("livro-titulo", livro.titulo);
  preencher("livro-autor", livro.autor);
  preencher("livro-categoria", livro.categoria);
  preencher("livro-sinopse", livro.sinopse);
  preencher("livro-nota-editorial", livro.notaEditorial);
  preencher("livro-sobre-autor", livro.sobreAutor);

  document.title = `${livro.titulo} — Nexo Literário`;
  mostrarEstado("conteudo");
}

// Link para o livro anterior ou o próximo da programação
function criarLinkDeNavegacao(livro, direcao) {
  const link = criarElemento("a", "pagina-livro__link-navegacao");
  link.href = enderecoDoLivro(livro.identificador);
  const seta = icone(direcao === "anterior" ? desenhosDosIcones.setaEsquerda : desenhosDosIcones.setaDireita, 16);
  link.append(livro.titulo);
  link.insertAdjacentHTML(direcao === "anterior" ? "afterbegin" : "beforeend", seta);
  return link;
}

// Anterior à esquerda e próximo à direita; o <span> vazio segura o lugar no primeiro e no último
function mostrarNavegacao() {
  const anterior = livros[posicao - 1];
  const proximo = livros[posicao + 1];
  navegacao.append(
    anterior ? criarLinkDeNavegacao(anterior, "anterior") : document.createElement("span"),
    proximo ? criarLinkDeNavegacao(proximo, "proximo") : document.createElement("span"),
  );
  navegacao.hidden = false;
}

async function carregarLivro() {
  mostrarEstado("carregando");
  try {
    const livro = await buscarLivro(livroDaLista.id);
    if (livro === null) {
      mostrarLivroNaoEncontrado();
    } else {
      mostrarLivro(livro);
    }
  } catch (falha) {
    console.error(falha);
    mostrarErro(
      "Não foi possível carregar o livro",
      "Confira a sua conexão e tente de novo em alguns instantes.",
      true,
    );
  }
}

// Sem ?livro= ou com um identificador que não existe: nem chega a chamar a API
if (livroDaLista === undefined) {
  mostrarLivroNaoEncontrado();
} else {
  botaoTentarDeNovo.addEventListener("click", carregarLivro);
  mostrarNavegacao();
  carregarLivro();
}
