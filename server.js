// Brazilidades - servidor simples para Mercado Pago Checkout Pro
// Requer Node.js 18+
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/create-preference", async (req, res) => {
  try {
    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) return res.status(500).json({ error: "MP_ACCESS_TOKEN não configurado." });

    const { product, size, customer } = req.body;
    if (!product || !size || !customer) return res.status(400).json({ error: "Dados incompletos." });

    const preference = {
      items: [{
        id: product.id,
        title: `${product.name} - Tam. ${size}`,
        quantity: 1,
        currency_id: "BRL",
        unit_price: Number(product.price)
      }],
      payer: { name: customer.name },
      metadata: {
        tamanho: size,
        nome: customer.name,
        telefone: customer.phone,
        cep: customer.cep,
        endereco: customer.address,
        complemento: customer.complement || "",
        prazo_entrega: "até 7 dias úteis - RJ"
      },
      statement_descriptor: "BRAZILIDADES",
      back_urls: {
        success: "http://localhost:3000/?pagamento=sucesso",
        failure: "http://localhost:3000/?pagamento=falha",
        pending: "http://localhost:3000/?pagamento=pendente"
      },
      auto_return: "approved"
    };

    const mp = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(preference)
    });

    const data = await mp.json();
    if (!mp.ok) return res.status(mp.status).json({ error: data.message || "Erro no Mercado Pago", details: data });

    res.json({ id: data.id, init_point: data.init_point, sandbox_init_point: data.sandbox_init_point });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro interno ao criar pagamento." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Brazilidades em http://localhost:${port}`));
