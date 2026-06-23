const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook/order-created', (req, res) => {
  const order = req.body;
  
  const firstName = order.customer?.first_name || 'Client';
  const locale = order.customer_locale || 'en';
  const lang = locale.split('-')[0];
  
  const messages = {
    fr: `Bonjour ${firstName}, merci pour votre commande ZEALANDE !`,
    en: `Hi ${firstName}, thank you for your ZEALANDE order!`,
    de: `Hallo ${firstName}, vielen Dank für Ihre ZEALANDE Bestellung!`,
    es: `Hola ${firstName}, ¡gracias por tu pedido ZEALANDE!`,
    it: `Ciao ${firstName}, grazie per il tuo ordine ZEALANDE!`,
  };
  
  const cardText = messages[lang] || messages['en'];
  
  console.log('Carte à imprimer:', cardText);
  
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Webhook actif sur le port 3000'));
