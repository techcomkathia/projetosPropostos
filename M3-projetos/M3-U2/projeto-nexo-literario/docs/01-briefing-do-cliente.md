# Briefing do cliente · Nexo Literário

Documento de contexto para a atividade da M3-U2. O escopo de implementação é
intencionalmente limitado à Home e à página de Planos.

## A cliente

O **Nexo Literário** é um clube de leitura por assinatura, com curadoria
editorial independente. O slogan é **"Onde grandes histórias nos conectam"**.
A programação apresenta um livro por mês, com obras organizadas ao longo do
ano. Existem três ciclos de assinatura: Trimestral, Semestral e Anual.

## O pedido para esta unidade

> "Quero atualizar os livros e os planos sem editar o HTML. Quando os dados
> mudarem na API, as duas páginas devem mostrar a nova programação e os novos
> valores."

O site desta etapa precisa:

- apresentar na Home os livros recebidos da API, com mês, capa, título, autor,
  categoria e sinopse;
- apresentar na página Planos as opções recebidas da API, com duração,
  benefícios, valores parcelados e à vista;
- informar carregamento, falhas e listas vazias sem deixar a tela em branco.

## Fora do escopo

Páginas de detalhes de livros, parâmetros de URL, histórico de avaliações,
checkout e confirmação de assinatura não fazem parte deste pedido da M3-U2.
Esses fluxos serão retomados na M3-U3 com React.

## Planos de referência

| Plano | Livros | Valor por parcela | Desconto à vista | Destaque |
| --- | ---: | ---: | ---: | --- |
| Trimestral | 3 | R$ 69,90 | 5% | |
| Semestral | 6 | R$ 64,90 | 10% | Mais escolhido |
| Anual | 12 | R$ 59,90 | 15% | |

Todo plano inclui livros do ciclo, nota editorial e encontros mensais. Nenhum
plano renova automaticamente. Os valores são dados da API e devem ser
calculados e formatados pelo JavaScript.

## Tom

Calmo, editorial e acolhedor, como uma livraria pequena. Use frases curtas e
não exiba campos vazios, `null` ou `undefined`.
