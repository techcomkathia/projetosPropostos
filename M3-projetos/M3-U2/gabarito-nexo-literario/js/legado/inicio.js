// LEGADO: solução antiga (clube, assinar, livro). Fora do escopo da M3-U2.
// Página inicial

function criarItemDoTrimestre(trimestre) {
  const fragmento = document.createDocumentFragment();
  fragmento.append(criarElemento("p", "sobretitulo rotulo-trimestre", trimestre.rotulo));

  const grade = criarElemento("div", "inicio-grade-livros");
  trimestre.livros.forEach((livro) => {
    const artigo = criarElemento("article", "inicio-livro");
    artigo.append(
      criarElemento("p", "sobretitulo inicio-livro__mes", livro.nomeDoMes),
      criarCapaDoLivro(livro, "capa inicio-livro__capa"),
      criarElemento("h3", "inicio-livro__titulo", livro.titulo),
      criarElemento("p", "texto-suave inicio-livro__autor", livro.autor),
      criarElemento("p", "texto-suave inicio-livro__categoria", livro.categoria),
      criarLinkDeDetalhes(livro),
    );
    grade.append(artigo);
  });
  fragmento.append(grade);
  return fragmento;
}

function mostrarLinhaDoTempo(lista) {
  livros.forEach((livro) => {
    const item = criarElemento("li", "linha-tempo__item");
    const conteudo = criarElemento("div", "linha-tempo__conteudo");
    const texto = criarElemento("div");

    texto.append(
      criarElemento("p", "sobretitulo", livro.nomeDoMes),
      criarElemento("h3", "linha-tempo__titulo", livro.titulo),
      criarElemento("p", "linha-tempo__autor", livro.autor),
      criarElemento("p", "linha-tempo__categoria", livro.categoria),
      criarElemento("p", "texto-suave linha-tempo__sinopse", livro.sinopse),
      criarLinkDeDetalhes(livro),
    );
    conteudo.append(criarCapaDoLivro(livro, "capa linha-tempo__capa"), texto);
    item.append(criarElemento("span", "linha-tempo__marcador"), conteudo);
    lista.append(item);
  });
}

configurarCarrossel(
  document.getElementById("carrossel-trimestres"),
  "ciclo de leitura",
  trimestres.map((trimestre) => ({
    rotulo: trimestre.rotulo,
    conteudo: criarItemDoTrimestre(trimestre),
  })),
);
mostrarLinhaDoTempo(document.getElementById("linha-do-tempo"));
