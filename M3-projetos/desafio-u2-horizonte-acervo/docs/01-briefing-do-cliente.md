# Briefing do cliente · Horizonte Acervo

Documento de entrada do projeto: o que a cliente pediu, os textos e as
mensagens aprovadas. A especificação de comportamento está em
`comportamento-interativo.md`, na raiz.

---

## A cliente

A **Horizonte** é uma mostra anual de fotografia de paisagem, organizada em
três eixos: **Litoral, Serra e Sertão**. A terceira edição acontece em 2026. A
equipe é pequena: uma curadora, uma produtora e uma designer.

Para montar a edição, a curadoria pesquisou o acervo aberto do **Cleveland
Museum of Art**, que publica dezenas de milhares de obras em domínio público
(licença CC0) e oferece uma API gratuita, sem cadastro e sem chave de acesso.

## O pedido

> "Quero que as pessoas façam o mesmo caminho que a gente fez: procurar, abrir
> a obra, olhar com calma e guardar as que tocaram. E, no fim, que dê vontade
> de mandar a própria foto para a quarta edição."

Na prática, a página precisa:

- mostrar o acervo do museu, com busca e filtro por tipo de obra;
- abrir cada obra em uma janela, com as informações completas;
- deixar a pessoa montar a própria seleção, sem precisar criar conta;
- receber inscrições para a próxima edição, sem deixar passar formulário
  incompleto.

## O que a cliente **não** quer

- Nenhuma janela do navegador pulando na tela (`alert`). "Parece site
  quebrado."
- Tela branca enquanto carrega. "A pessoa acha que travou e vai embora."
- "undefined", "null" ou campo vazio aparecendo para o público.
- Perder a seleção ao fechar o navegador.
- Animação chamativa. A mostra é sobre olhar com calma.

## Tom

O mesmo da capa: silencioso, escuro e com a fotografia em primeiro lugar. As
mensagens são curtas, em segunda pessoa e sem exclamação, com uma exceção: a
confirmação de inscrição, que é um momento de comemorar.

---

## Mensagens aprovadas

Use exatamente como está. `{entre chaves}` é o valor que muda.

### Acervo

| Onde | Texto |
| --- | --- |
| Contador, carregando | Buscando… |
| Contador, uma obra | 1 obra encontrada |
| Contador, várias | {total} obras encontradas |
| Estado vazio, título | Nada por aqui |
| Estado vazio, com busca | Nenhuma obra encontrada para “{busca}”. Tente outra palavra, em inglês. |
| Estado vazio, sem busca | Nenhuma obra encontrada com esse filtro. |
| Estado de erro, título | Não foi possível carregar o acervo |
| Estado de erro, texto | Confira sua conexão e tente de novo. |
| Botão do erro | Tentar de novo |
| Paginação | Página {atual} de {total} |
| Obra sem criador | Autoria desconhecida |

### Janela de detalhe

| Onde | Texto |
| --- | --- |
| Carregando | Carregando obra… |
| Erro | Não foi possível carregar esta obra. |
| Rótulos da lista de dados | Data · Técnica · Dimensões · Cultura |
| Link para o museu | Ver no site do museu |

### Seleção

| Onde | Texto |
| --- | --- |
| Botão, fora da seleção | Guardar |
| Botão, na seleção | Guardada |
| `aria-label`, fora da seleção | Guardar {título} na seleção |
| `aria-label`, na seleção | Remover {título} da seleção |
| Aviso ao guardar | Obra guardada na sua seleção. |
| Aviso ao remover | Obra removida da sua seleção. |
| Estado vazio, título | Sua seleção está vazia |
| Estado vazio, texto | Guarde obras do acervo para vê-las aqui. |

> No cartão, o botão de guardar é só o ícone (`botao-favorito--icone`): o texto
> fica no `aria-label`. Na janela de detalhe, o botão mostra o texto
> "Guardar" ou "Guardada".

### Inscrição

| Onde | Texto |
| --- | --- |
| Alerta, um erro | Corrija o campo marcado antes de enviar. |
| Alerta, vários erros | Corrija os {n} campos marcados antes de enviar. |
| Contador de caracteres | {n} de 300 caracteres |
| Aviso de sucesso | Inscrição enviada, {primeiro nome}! Você vai receber a confirmação por e-mail. |

As mensagens de erro de cada campo estão na tabela da seção 12 de
`comportamento-interativo.md`.

---

## Tipos de obra

A API devolve o tipo em inglês. Na tela, ele aparece em português:

| API | Na tela |
| --- | --- |
| Photograph | Fotografia |
| Painting | Pintura |
| Print | Gravura |
| Drawing | Desenho |
| Sculpture | Escultura |
| Textile | Têxtil |
| Ceramic | Cerâmica |
| Glass | Vidro |
| Book | Livro |
| Metalwork | Metal |

Tipo fora da tabela aparece como veio da API.

> Dica: uma tabela de tradução em JavaScript é um **objeto**, e não uma
> sequência de `if`.

## Sobre os textos das obras

Título, técnica, descrição e cultura chegam **em inglês**, como estão no museu,
e assim devem aparecer. Não traduza. A cliente prefere o texto original a uma
tradução automática.
