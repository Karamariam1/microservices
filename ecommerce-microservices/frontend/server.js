const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

// Afficher les produits
app.get('/', async (req, res) => {
    try {
        const products = await axios.get('http://products:5001/products');
        let html = '<h1>Liste des Produits</h1><ul>';
        products.data.forEach(p => {
            html += `<li>${p.name} - ${p.price}€ <button onclick="order(${p.id}, ${p.price})">Commander</button></li>`;
        });
        html += '</ul>';
        html += `
            <script>
                async function order(productId, price) {
                    const response = await fetch('/order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ product_id: productId, quantity: 1 })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        alert("Commande créée ! ID: " + data.id);
                        pay(data.id, price);
                    } else {
                        alert("Erreur lors de la commande");
                    }
                }

                async function pay(orderId, amount) {
                    const response = await fetch('/pay', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ order_id: orderId, amount: amount })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        alert("Paiement réussi ! ID: " + data.payment_id);
                    } else {
                        alert("Échec du paiement : " + data.message);
                    }
                }
            </script>
        `;
        res.send(html);
    } catch (error) {
        res.send('<h1>Erreur de connexion aux services</h1>');
    }
});

// Passer une commande
app.post('/order', async (req, res) => {
    try {
        const response = await axios.post('http://orders:5002/orders', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la commande" });
    }
});

// Effectuer un paiement
app.post('/pay', async (req, res) => {
    try {
        const response = await axios.post('http://payments:5003/pay', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erreur de paiement" });
    }
});

app.listen(PORT, () => {
    console.log(`Frontend running on http://localhost:${PORT}`);
});
