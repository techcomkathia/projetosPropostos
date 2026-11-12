// LEGADO: solução antiga (clube, assinar, livro). Fora do escopo da M3-U2.
// Página O Clube

// Cinco estrelas; a última fica parcialmente apagada conforme a nota (ex.: 4,8)
function criarEstrelas(nota) {
  const estrelas = criarElemento("span", "historico-clube__estrelas");
  estrelas.setAttribute("aria-hidden", "true");
  for (let indice = 0; indice < 5; indice++) {
    // Arredonda para evitar 0.7999999999999998 (4.8 - 4)
    const opacidade = Math.round(Math.min(1, Math.max(0, nota - indice)) * 100) / 100;
    estrelas.insertAdjacentHTML(
      "beforeend",
      icone(desenhosDosIcones.estrela, 16, `fill="currentColor" opacity="${opacidade}"`),
    );
  }
  return estrelas;
}

function criarItemDoHistorico(trimestre) {
  const fragmento = document.createDocumentFragment();
  fragmento.append(criarElemento("p", "sobretitulo rotulo-trimestre", trimestre.rotulo));

  const grade = criarElemento("div", "historico-clube__grade");
  trimestre.livros.forEach((livro) => {
    const artigo = criarElemento("article", "historico-clube__livro");
    const detalhe = criarElemento("div", "historico-clube__detalhe-livro");
    const texto = criarElemento("div", "historico-clube__texto-livro");

    const avaliacao = criarElemento("div", "historico-clube__avaliacao");
    const valor = criarElemento("span", "historico-clube__valor-avaliacao", `${livro.nota.toFixed(1)} / 5`);
    valor.setAttribute("aria-label", `Nota ${livro.nota.toFixed(1)} de 5 estrelas`);
    avaliacao.append(criarEstrelas(livro.nota), valor);

    texto.append(
      criarElemento("h3", "historico-clube__titulo-livro", livro.titulo),
      criarElemento("p", "texto-suave historico-clube__autor", livro.autor),
      criarElemento("p", "texto-suave historico-clube__categoria", livro.categoria),
      avaliacao,
      criarElemento("p", "texto-suave historico-clube__legenda-avaliacao", "Média dos assinantes"),
      criarLinkDeDetalhes(livro),
    );
    detalhe.append(criarCapaDoLivro(livro, "capa historico-clube__capa"), texto);
    artigo.append(criarElemento("p", "sobretitulo texto-suave", livro.nomeDoMes), detalhe);
    grade.append(artigo);
  });
  fragmento.append(grade);
  return fragmento;
}

// Só os trimestres que têm livros já avaliados
const trimestresAvaliados = trimestres
  .map((trimestre) => ({
    ...trimestre,
    livros: trimestre.livros.filter((livro) => livro.nota !== null),
  }))
  .filter((trimestre) => trimestre.livros.length > 0);

const carrosselDoHistorico = document.getElementById("carrossel-historico");
const avisoDoHistorico = document.getElementById("aviso-historico");

if (trimestresAvaliados.length > 0) {
  configurarCarrossel(
    carrosselDoHistorico,
    "histórico de leituras avaliadas",
    trimestresAvaliados.map((trimestre) => ({
      rotulo: trimestre.rotulo,
      conteudo: criarItemDoHistorico(trimestre),
    })),
  );
} else {
  carrosselDoHistorico.hidden = true;
  avisoDoHistorico.textContent = "As avaliações dos livros ainda não foram registradas.";
}

configurarTabelaDePrecos(document.getElementById("investimento"));
