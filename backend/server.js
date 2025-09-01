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
  // 1. EXTRAÇÃO E PREPARAÇÃO DOS DADOS

  // Pega os dados de nome, email e telefone que o front-end enviou no corpo (body) da requisição.
  const { nome, email, telefone } = req.body;
  
  // Pega a chave secreta da API do Brevo que está guardada no arquivo .env.
  const apiKey = process.env.BREVO_API_KEY;

  // Define as configurações para a chamada à API do Brevo.
  const brevoApiUrl = 'https://api.brevo.com/v3/contacts'; // O endereço para criar contatos.
  const headers = { // O "crachá de identificação" para a API.
    'accept': 'application/json',
    'api-key': apiKey, // Nossa chave secreta.
    'content-type': 'application/json',
  };

  // 2. LÓGICA PRINCIPAL E TRATAMENTO DE ERROS

  try {
    // Monta o objeto 'contactData' no formato exato que a API do Brevo espera.
    const contactData = {
      email: email, // O e-mail é um campo principal.
      attributes: { // 'attributes' são informações extras do contato.
        FIRSTNAME: nome, // O nome do contato.
        SMS: telefone,   // O telefone do contato.
      },
    };

    await axios.post(brevoApiUrl, contactData, { headers });

    // Enviamos uma resposta de sucesso (status 201 - "Criado") de volta para o front-end.
    res.status(201).json({ message: 'Lead cadastrado com sucesso!' });

  } catch (error) {
    // Se chegamos aqui, algo deu errado na comunicação com o Brevo.

    // Criamos uma variável para acessar o objeto de erro do Brevo de forma mais segura.
    const brevoError = error.response?.data;

    // --- TRATAMENTO DE ERROS INTELIGENTE ---

    // Caso 1: O código de erro é 'duplicate_parameter'.
    if (brevoError?.code === 'duplicate_parameter') {
      
      // Se o código for de duplicidade, olhamos mais a fundo para ver QUAL campo foi duplicado.
      if (brevoError.metadata?.duplicate_identifiers?.includes('email')) {
        // Se foi o e-mail, enviamos uma resposta de erro específica (status 409 - "Conflito").
        return res.status(409).json({ message: 'Este e-mail já foi cadastrado em nossa lista!' });
      } else {
        // Se foi outro campo (como o telefone), enviamos outra mensagem específica.
        return res.status(409).json({ message: 'Este número de telefone já está em uso.' });
      }
    }
    
    // Caso 2: O código do erro é 'invalid_parameter' E a mensagem fala sobre 'phone number'.
    // Descobrimos que o Brevo usa este erro para telefones duplicados também.
    if (brevoError?.code === 'invalid_parameter' && brevoError?.message.includes('phone number')) {
      return res.status(409).json({ message: 'Este número de telefone já está em uso.' });
    }
    
    // Se o erro não for nenhum dos casos específicos acima, é um erro inesperado.
    // Mostramos o erro no console do nosso servidor (para o desenvolvedor ver).
    console.error('Erro ao criar contato no Brevo:', brevoError || error.message);
    // E enviamos uma resposta de erro genérica (status 500 - "Erro Interno do Servidor") para o front-end.
    res.status(500).json({ message: 'Ocorreu um erro ao processar sua solicitação.' });
  }
});

// 6. Iniciando o Servidor
app.listen(PORT, () => console.log(`Servidor back-end rodando em http://localhost:${PORT}`));