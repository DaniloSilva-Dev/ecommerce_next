# Implementações do Ecommerce

## Catálogo de produtos

- Exibição de produtos em cards responsivos.
- Busca por nome, filtros por categoria e ordenação.
- Paginação da lista de produtos.
- Exibição de preço original, desconto, categoria e status de novidade.
- Adição de produtos ao carrinho.

## Carrinho

- Controle de quantidade dos itens.
- Indicador de quantidade de produtos no carrinho.
- Drawer para visualização e gerenciamento dos itens.
- Cálculo do subtotal e do total da compra.

## Checkout

- Formulário dividido em dados do comprador, endereço de entrega e forma de pagamento.
- Validação dos campos com React Hook Form, Zod e `zodResolver`.
- Suporte a pagamento via PIX e cartão de crédito.
- Botão de finalização desabilitado durante o envio ou quando o carrinho está vazio.
- Estado visual cinza para botões desabilitados.

## Preenchimento automático do CEP

- Consulta automática à API ViaCEP ao sair do campo com um CEP válido.
- Preenchimento dos campos de rua, bairro, cidade e UF.
- Foco automático no campo Número após o preenchimento.
- Indicador de carregamento nos campos preenchidos automaticamente.
- Tempo mínimo de exibição do carregamento para que a animação seja perceptível.
- Labels dos campos permanecem posicionados corretamente quando os valores são preenchidos pela API.

## Processamento do pedido

- Envio do pedido para a API interna de checkout.
- Montagem do endereço, dados do cliente, itens e método de pagamento no payload.
- Redirecionamento para a tela de conclusão após o pedido ser criado.
- Limpeza do carrinho após o processamento bem-sucedido.
- Consulta periódica do status do pedido para PIX e cartão.

## Tela de conclusão

- Exibição do status do pagamento.
- Exibição do ID da cobrança com destaque de cor apenas no valor do ID.
- Exibição dos dados do comprador e do endereço de entrega.
- Exibição do resumo do pedido, valor total e produtos comprados.
- Exibição do QR Code e código PIX quando aplicável.
- Botão para retornar à loja.
- Layout responsivo com painel centralizado e header ocupando toda a largura.


## Principais arquivos

- `src/app/page.tsx`: catálogo, busca, filtros, ordenação e paginação.
- `src/app/checkout/page.tsx`: formulário e fluxo visual do checkout.
- `src/app/conclusao/page.tsx`: confirmação e acompanhamento do pedido.
- `src/hooks/use_checkout.ts`: validação, consulta do CEP e envio do pedido.
- `src/components/primitives/card.tsx`: estrutura dos cards e tratamento das imagens.
- `src/components/primitives/card.module.css`: estilos dos cards e das imagens.
- `src/components/primitives/button.module.css`: estado visual dos botões desabilitados.
- `src/app/api/checkout/route.ts`: criação do pedido.
- `src/app/api/order_status/route.ts`: consulta do status do pedido.
