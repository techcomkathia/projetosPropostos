// Código compartilhado pela Home e pela página Planos.

const ENDERECO_DA_API = "http://localhost:3000";

// Busca uma coleção da API (ex.: "livros") e devolve o array recebido.
// Lança erro em falha de rede, em resposta HTTP inválida (404, 500...) ou
// quando o corpo não for uma lista.
async function buscarColecao(nome) {
  const resposta = await fetch(`${ENDERECO_DA_API}/${nome}`);
  if (!resposta.ok) {
    throw new Error(`Falha ao buscar ${nome}: ${resposta.status}`);
  }
  const dados = await resposta.json();
  if (!Array.isArray(dados)) {
    throw new Error(`A rota /${nome} não devolveu uma lista`);
  }
  return dados;
}

// Cria um elemento com classe e texto opcionais. O texto entra sempre por
// textContent, então dados da API nunca são interpretados como HTML.
function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined && texto !== null) elemento.textContent = texto;
  return elemento;
}

// Recebe os quatro blocos de uma página e mostra só o do estado informado:
// "carregando", "erro", "vazio" ou "sucesso" (a própria lista).
function criarControleDeEstados(elementos) {
  return function mostrarEstado(estado) {
    elementos.carregando.hidden = estado !== "carregando";
    elementos.erro.hidden = estado !== "erro";
    elementos.vazio.hidden = estado !== "vazio";
    elementos.lista.hidden = estado !== "sucesso";
  };
}

// ===== Menu do celular =====
function configurarMenuCelular() {
  const botaoMenu = document.querySelector(".cabecalho__botao-menu");
  const menuCelular = document.getElementById("menu-celular");
  if (!botaoMenu || !menuCelular) return;

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

configurarMenuCelular();
