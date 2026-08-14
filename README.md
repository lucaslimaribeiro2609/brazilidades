# Brazilidades — Loja online

Projeto de loja responsiva no estilo marketplace, com:
- catálogo de camisas;
- seleção de tamanho P, M, G e GG;
- formulário com nome, CEP, telefone, endereço e complemento;
- prazo informado de até 7 dias úteis para o RJ;
- integração preparada para Mercado Pago Checkout Pro (Pix/cartão/parcelamento conforme opções habilitadas na conta).

## Rodar localmente

1. Instale Node.js 18 ou superior.
2. Abra o terminal nesta pasta.
3. Rode:
   npm install
4. Configure seu Access Token do Mercado Pago:
   Windows PowerShell:
   $env:MP_ACCESS_TOKEN="SEU_ACCESS_TOKEN"
   macOS/Linux:
   export MP_ACCESS_TOKEN="SEU_ACCESS_TOKEN"
5. Rode:
   npm start
6. Acesse:
   http://localhost:3000

## Colocar no ar

Você pode publicar em Render, Railway, Fly.io ou outro serviço Node.js.
No serviço escolhido, configure a variável de ambiente MP_ACCESS_TOKEN.

IMPORTANTE:
- Troque as URLs de `back_urls` no `server.js` para o domínio real da loja antes de publicar.
- Para produção, valide o valor do produto no servidor (não confie apenas no preço enviado pelo navegador).
- É recomendável salvar pedidos em banco de dados e configurar Webhooks do Mercado Pago para confirmar pagamento automaticamente.
- Não coloque o Access Token dentro do HTML/JavaScript do navegador.

## Produtos e imagens

Edite o array `products` dentro do `index.html` para alterar nome, preço e imagens.
As imagens de exemplo estão na pasta `assets/`.
