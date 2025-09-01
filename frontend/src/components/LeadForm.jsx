import React, { useState } from 'react';
import axios from 'axios';
import './LeadForm.css';

const LeadForm = () => {
  // Estado para guardar os dados do formulário
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '' });

  // Estado para as mensagens de feedback (sucesso/erro)
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Estado para controlar o loading durante o envio
  const [isLoading, setIsLoading] = useState(false);

  // Função para atualizar o estado quando o usuário digita
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função chamada quando o formulário é enviado
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setIsLoading(true);
    setFeedback({ message: '', type: '' }); // Limpa feedbacks antigos

    try {
      // A URL do back-end
      const apiUrl = 'http://localhost:5000/api/leads';
      const response = await axios.post(apiUrl, formData);

      // Deu tudo certo!
      setFeedback({ message: response.data.message, type: 'success' });
      setFormData({ nome: '', email: '', telefone: '' }); // Limpa os campos
    } catch (error) {
      // Deu erro!
      // Se o status do erro for 409 (Conflito), que definimos no back-end...
    if (error.response && error.response.status === 409) {
      // ...mostramos como uma mensagem de 'informação', não de erro.
      setFeedback({ message: error.response.data.message, type: 'info' });
    } else {
      // Para todos os outros erros, mostramos a mensagem de erro vermelha.
      const errorMessage = error.response?.data?.message || 'Erro ao conectar ao servidor. Tente novamente.';
      setFeedback({ message: errorMessage, type: 'error' });
    }
    } finally {
      // Executa sempre, dando certo ou errado
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Captura de Leads</h2>
      <p>Preencha os campos para receber nossas novidades e promoções.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome Completo</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Seu Melhor Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone / WhatsApp</label>
          <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Cadastrar'}
        </button>
      </form>
      {/* Mostra a mensagem de feedback apenas se ela existir */}
      {feedback.message && (
        <div className={`feedback-message ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default LeadForm;