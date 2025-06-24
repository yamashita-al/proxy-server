const express = require('express');
const fetch = require('node-fetch');
const app = express();

const username = 'n8ntest';
const password = 'OZLoxtGdEgyz8yJY7p8dZ5Fv';
const token = Buffer.from(`${username}:${password}`).toString('base64');

app.get('/', async (req, res) => {
  const slug = req.query.slug || 'a4468';
  const wpUrl = `https://lapuri.site/wp-json/wp/v2/pages?slug=${slug}`;

  try {
    const response = await fetch(wpUrl, {
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from WordPress' });
  }
});

// ✅ Renderに必要：PORTを使って起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
