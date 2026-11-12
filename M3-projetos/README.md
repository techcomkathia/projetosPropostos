# M3 · Projetos

Material dos projetos maiores do Módulo 3, no mesmo modelo dos projetos do
Módulo 2: briefing, especificação de comportamento, documentos de apoio e
imagens de referência. A diferença é que **o CSS vem pronto**: o aluno usa as
classes e gasta o tempo no JavaScript e no React.

| Pasta | O que é | Para quem |
| --- | --- | --- |
| `estilo-base/` | folha de estilo com os três temas do M2, a vitrine dos componentes e o guia das classes | professora (a vitrine) e alunos (o CSS e o guia vão em cada projeto) |
| `desafio-u2-horizonte-acervo/` | projeto desafio da M3U2 (JS puro, DOM, API pública) | vira um repositório para fork |
| `projeto-final-u3-raiz-e-cia/` | projeto final da M3U3 (React, rotas, contexto, json-server) | vira um repositório para fork |
| `M3-U2/projeto-nexo-literario/` | atividade da M3U2 (JS puro, DOM, formulário, fetch em API própria) | vira um repositório para fork |
| `M3-U2/gabarito-nexo-literario/` | solução de referência do Nexo Literário | só a professora |

Cada pasta de projeto é **autossuficiente**: já tem a cópia do CSS e do guia
das classes. Basta subir o conteúdo da pasta como um repositório (como os do
M2) e passar o link.

---

## Estilo base

- **Um arquivo**, `estilo-base.css`, com o tema Artesano como padrão e os temas
  Raiz e Horizonte ativados por `<html data-tema="…">`.
- Toda a aparência sai de **variáveis**. O aluno personaliza em um arquivo
  próprio, sem tocar no estilo base.
- **Estados por classe e atributo**: o JS e o React só ligam `hidden`,
  `aria-pressed`, `aria-expanded`, `aria-invalid`, `.com-erro`, `.carregando`
  etc. Isso reforça a regra "JS não escreve estilo" e já ensina acessibilidade
  de quebra.
- Compatível com o React sem ajuste: `NavLink` marca o link ativo com a classe
  `active`, e o CSS já entende essa classe.
- `vitrine.html` mostra todos os componentes, com um seletor de tema. Vale
  publicar no GitHub Pages e passar o link aos alunos.

Se o CSS mudar, copie de novo para `desafio-u2-horizonte-acervo/css/` e
`projeto-final-u3-raiz-e-cia/recursos/` (os três arquivos hoje são idênticos).

## Desafio U2 · Horizonte Acervo

- **Tema**: a mostra Horizonte (do componente-hero do M2) abre o acervo de
  referência ao público: busca, filtro, paginação, detalhe em janela, seleção
  salva no `localStorage` e formulário de inscrição com validação.
- **API**: Cleveland Museum of Art Open Access, sem chave e com CORS liberado.
  Testada em 14/10/2026: busca, filtro por tipo, paginação, detalhe, 404 e
  imagens carregando no navegador.
  - Descartei a API do Art Institute of Chicago, que é mais conhecida, porque
    as imagens dela voltaram **403** nos testes.
- **O aluno recebe** o `index.html` pronto e escreve só o JS, em módulos.
- **Etapas casadas com as aulas**:
  - **Aulas 1 e 2**: menu e aviso flutuante.
  - **Aula 3**: grade e detalhe a partir de um JSON de exemplo, antes de ligar a API.
  - **Aula 4**: formulário.
  - **Aula 5**: localStorage e módulos.
  - **Aula 6**: API de verdade.
  - **Aula 7**: componentes e acabamento.
- **Armadilhas de propósito** (todas reais, vindas da própria API):
  - obra sem autoria (`creators: []`);
  - descrição `null`;
  - descrição com tags HTML, o que justifica a regra de não usar `innerHTML`;
  - datas em texto ("c. 1900");
  - lista vazia que não é erro;
  - 404 que o `fetch` não rejeita.
- **Publicação**: GitHub Pages, que funciona porque é tudo estático.

## Atividade U2 · Nexo Literário

- **Tema**: site de um clube de leitura por assinatura: início, clube,
  assinar e uma página para cada um dos 12 livros.
- **Dados**: o início e o clube usam `js/livros.js`, uma constante global. As
  páginas dos livros buscam o livro em uma **API hospedada** que devolve o
  mesmo formato (`GET /livros/{id}`). O aluno recebe os HTMLs, o CSS próprio
  do projeto (`css/style.css`, não o estilo base) e os dados, e escreve o JS
  que os HTMLs já chamam.
- **Sem parâmetros de URL**: cada livro tem a sua página
  (`livro-{identificador}.html`), com título, metas e anterior/próximo já
  escritos no HTML e o id do livro em `data-livro`. Assinar sempre abre em
  Semestral, à vista. Parâmetros de URL ficam para as rotas do React na U3.
- **Scripts comuns, sem módulos**: a ordem das tags `<script>` importa, o que
  prepara a conversa sobre módulos da aula 5 do Horizonte.
- **Etapas**: aulas 1 a 4 (menu, preparo dos dados, linha do tempo, carrossel
  reaproveitado em duas páginas, tabela de preços, formulário de assinatura
  com estado) e aula 6 (páginas dos livros com `fetch`).
- **Armadilhas de propósito**:
  - 404 que o `fetch` não rejeita, com mensagem diferente do erro de rede;
  - `nota` e `paginas` `null` em vários livros;
  - nota 0 tratada como "sem nota" se o aluno usar `if (livro.nota)`;
  - campos do cartão escondidos que ainda bloqueiam o envio pelo `required`;
  - desconto do trimestral que dá R$ 199,21 ou R$ 199,22 conforme a conta é
    feita em reais ou em centavos;
  - o mês do `Date` que começa em 0.
- **Gabarito** em `M3-U2/gabarito-nexo-literario/`, fora da pasta do aluno.
  O README de lá lista duas diferenças entre a solução e o enunciado.
- **Referências**: capturas de tela larga em `referencias/`. Falta a de
  celular (veja "Pontos para revisar").

## Projeto final U3 · Raiz & Cia Área do assinante

- **Tema**: continuação da landing page Raiz & Cia do M2.
- **Telas**: catálogo com filtros na URL, página do kit, cadastro e login,
  assinatura com ViaCEP e a área do assinante com pausar, retomar, trocar e
  cancelar.
- **API**: `json-server@0.17.4` com o `api/db.json` (8 kits, 2 usuários, 2
  assinaturas). Testei todas as rotas e filtros citados na documentação.
  - A versão está **fixada de propósito**: o json-server 1.0 tem outra sintaxe
    de filtros, e muitos tutoriais na internet misturam as duas.
- **Restrições alinhadas ao plano de aulas**:
  - só `fetch` e `async`/`await`;
  - sem axios;
  - sem hooks próprios;
  - hooks usados: `useState`, `useEffect`, `useContext` e os do React Router.
- **Ponte com o M4**: as rotas e o formato dos dados foram pensados para virar
  a API Express do M4 (tabelas `kits`, `usuarios` e `assinaturas`, com chaves
  estrangeiras). O login é simulado e inseguro de propósito, com aviso
  explícito no README e no guia da API. O M4U4 corrige com hash e JWT.
- **Armadilhas de propósito**:
  - POST sem `Content-Type`, que grava lixo sem dar erro;
  - `"erro": "true"` do ViaCEP vem como texto;
  - PATCH devolve a assinatura sem o `kit` expandido;
  - 404 do kit é diferente de erro de rede;
  - recarregar uma rota na Vercel sem o `vercel.json`.
- **Documentação do aluno**: a entrega inclui reescrever o README no modelo da
  seção "Documentação do seu projeto".
- **Publicação**: frontend na Vercel ou Netlify. API no Render, ou um vídeo de
  até 3 minutos se não der para publicar.

## Pontos para revisar

1. **Datas**: o formulário do Horizonte cita "inscrições até 30 de novembro". O
   README do U3 cita Node 20 ou maior. Ajuste à turma.
2. **Critérios de avaliação**: os pesos nos dois READMEs são uma proposta.
3. **Projeto guiado** (construído aula a aula na U2 e na U3): ainda não está
   aqui. A sugestão é usar o tema Artesano, para os três temas aparecerem no
   módulo, e um domínio igual ao da API do M4.
4. **Uso de IA**: as regras dos projetos citam "o prompt da unidade", que é a
   próxima etapa do planejamento.
5. **Nexo Literário**:
   - publicar a API e trocar `https://ENDERECO-DA-API/livros` no
     `docs/04-guia-da-api.md` e no `js/livro.js` do gabarito;
   - falta uma captura de celular em `referencias/` (a ferramenta de captura
     automática não reduz a tela abaixo de ~500px);
   - os pesos da avaliação e o encaixe nas aulas também são proposta.
