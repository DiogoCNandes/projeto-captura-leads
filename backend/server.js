// 1. Importações
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// 2. Configuração do App
const app = express();
const PORT = 5000;

// 3. Middlewares
app.use(cors());
app.use(express.json());

// 4. A Rota Principal da API 
app.post('/api/leads', async (req, res) => {
  const { nome, email, telefone } = req.body;
  const apiKey = process.env.BREVO_API_KEY; // Pega a nova chave do .env

  // 1. URL da API do Brevo
  const brevoApiUrl = 'https://api.brevo.com/v3/contacts';

  // 2. Formato de dados que o Brevo espera
  const contactData = {
    email: email,
    attributes: {
      FIRSTNAME: nome, // Atributo padrão para Nome
      SMS: telefone,   // Atributo padrão para Telefone
    },
  };

  // 3. Cabeçalho de autenticação do Brevo
  const headers = {
    'accept': 'application/json',
    'api-key': apiKey,
    'content-type': 'application/json',
  };

  try {
    // Envia a requisição para o Brevo
    await axios.post(brevoApiUrl, contactData, { headers });
    res.status(201).json({ message: 'Lead cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar contato no Brevo:', error.response?.data || error.message);
    res.status(500).json({ message: 'Ocorreu um erro ao cadastrar o lead.' });
  }
});

// 6. Iniciando o Servidor
app.listen(PORT, () => console.log(`Servidor back-end rodando em http://localhost:${PORT}`));