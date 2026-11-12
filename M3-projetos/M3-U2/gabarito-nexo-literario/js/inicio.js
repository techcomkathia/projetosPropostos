// Home: busca GET /livros e monta a grade de livros.

const listaDeLivros = document.getElementById("lista-livros");
const botaoTentarLivros = document.getElementById("livros-tentar-novamente");

const mostrarEstadoDosLivros = criarControleDeEstados({
  carregando: document.getElementById("livros-carregando"),
  erro: document.getElementById("livros-erro"),
  vazio: document.getElementById("livros-vazio"),
  lista: listaDeLivros,
});

const formatadorDeMes = new Intl.DateTimeFormat("pt-BR", { month: "long", timeZone: "UTC" });

// 3 → "Março". Devolve "" quando o mês não é um número de 1 a 12.
function formatarMes(mes) {
  if (!Number.isInteger(mes) || mes < 1 || mes > 12) return "";
  const nome = formatadorDeMes.format(new Date(Date.UTC(2026, mes - 1, 1)));
  return nome.charAt(0).toLocaleUpperCase("pt-BR") + nome.slice(1);
}

// Imagem da capa ou, sem caminho informado, o marcador "Capa indisponível".
function criarCapa(livro) {
  const textoAlternativo = `Capa de ${livro.titulo}`;
  if (!livro.capa) {
    const marcador = criarElemento("div", "capa capa-indisponivel inicio-livro__capa", "Capa indisponível");
    marcador.setAttribute("role", "img");
    marcador.setAttribute("aria-label", textoAlternativo);
    return marcador;
  }
  const imagem = criarElemento("img", "capa inicio-livro__capa");
  imagem.src = livro.capa;
  imagem.alt = textoAlternativo;
  imagem.loading = "lazy";
  imagem.width = 672;
  imagem.height = 992;
  return imagem;
}

function criarCartaoDoLivro(livro) {
  const artigo = criarElemento("article", "inicio-livro");
  const nomeDoMes = formatarMes(livro.mes);

  if (nomeDoMes) artigo.append(criarElemento("p", "sobretitulo inicio-livro__mes", nomeDoMes));
  artigo.append(criarCapa(livro), criarElemento("h3", "inicio-livro__titulo", livro.titulo));
  // Campos opcionais só entram no cartão quando têm conteúdo.
  if (livro.autor) artigo.append(criarElemento("p", "texto-suave inicio-livro__autor", livro.autor));
  if (livro.categoria) {
    artigo.append(criarElemento("p", "texto-suave inicio-livro__categoria", livro.categoria));
  }
  if (livro.sinopse) {
    artigo.append(criarElemento("p", "texto-suave inicio-livro__sinopse", livro.sinopse));
  }
  return artigo;
}

async function carregarLivros() {
  listaDeLivros.replaceChildren();
  mostrarEstadoDosLivros("carregando");

  try {
    const livros = await buscarColecao("livros");
    if (livros.length === 0) {
      mostrarEstadoDosLivros("vazio");
      return;
    }
    // Cópia ordenada: o array recebido não é alterado.
    const ordenados = [...livros].sort((a, b) => a.mes - b.mes);
    listaDeLivros.append(...ordenados.map(criarCartaoDoLivro));
    mostrarEstadoDosLivros("sucesso");
  } catch (erro) {
    console.error(erro);
    mostrarEstadoDosLivros("erro");
  }
}

botaoTentarLivros.addEventListener("click", carregarLivros);
carregarLivros();
