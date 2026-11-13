# Briefing do cliente · Nexo Literário

Documento de contexto para o projeto da M3U3. Os textos aprovados que precisam
aparecer nas telas estão em `comportamento-interativo.md`.

## A cliente

O **Nexo Literário** é um clube de leitura por assinatura, com curadoria
editorial independente. O slogan é **"Onde grandes histórias nos conectam"**.
A programação apresenta um livro por mês, doze por ano, organizados em
trimestres. Uma vez por mês, os assinantes se encontram on-line para conversar
sobre o livro e, depois, dão uma nota a ele.

## O que já existe

Na etapa anterior (M3U2), o site ganhou a Home com a programação do ano e a
página de Planos, montadas a partir dos dados. A editora gostou: ela troca um
livro ou um preço e o site muda sozinho.

## O pedido para esta etapa

> "Quero que a pessoa conheça cada livro com calma, veja o que a turma achou
> das leituras passadas, compare os planos e assine ali mesmo, sem precisar
> mandar mensagem."

O site completo precisa:

- manter a **programação do ano** na Início, de dois jeitos: o carrossel por
  trimestre e a linha do tempo, agora com um link para cada livro;
- ter uma **página para cada livro**, com sinopse, nota editorial, sobre o
  autor, ficha técnica e a navegação para o anterior e o próximo;
- ter a página **O Clube**, que apresenta a proposta, conta como são os
  encontros, mostra o **histórico das leituras já avaliadas** e traz os
  **planos**, com o mesmo cartão da página Planos da etapa anterior e um botão
  para assinar cada um;
- ter o **formulário de assinatura**, com a escolha do plano, da modalidade e
  da forma de pagamento, e um resumo que mostra quanto a pessoa vai pagar;
- nunca deixar a tela em branco: carregando, falha e lista vazia sempre têm
  um aviso.

## Os planos

| Plano | Livros | Valor por parcela | Desconto à vista | Destaque |
| --- | ---: | ---: | ---: | --- |
| Trimestral | 3 | R$ 69,90 | 5% | |
| Semestral | 6 | R$ 64,90 | 10% | Mais escolhido |
| Anual | 12 | R$ 59,90 | 15% | |

- Todo plano inclui os livros do ciclo, a nota editorial e os encontros
  mensais.
- **À vista** tem desconto e aceita cartão, Pix ou boleto.
- **Parcelado** não tem desconto e é feito só no cartão, com uma parcela por
  livro.
- Nenhum plano renova automaticamente.

Os valores são dados da API. A tabela acima é só para conferência: o site
calcula tudo a partir do que a API devolve.

## As notas

As notas são a média das avaliações dos assinantes, de 0 a 5. Por enquanto, as
notas no banco são **demonstrativas**, e o site precisa dizer isso. Livros que
ainda não tiveram encontro vêm sem nota e não entram no histórico.

## Segurança

> "Não quero o número do cartão de ninguém guardado no nosso sistema."

O pagamento de verdade será feito por uma empresa de pagamentos, que entra no
projeto depois. O site só **simula** a cobrança: os dados do cartão são
validados no formulário, mas **nunca** são enviados para a API.

## Tom

Calmo, editorial e acolhedor, como uma livraria pequena. Frases curtas, sem
pontos de exclamação além do "Bem-vindo ao clube!". Nunca exibir campos
vazios, `null` ou `undefined`.
