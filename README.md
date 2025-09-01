# Projeto de Captura de Leads - Processo Seletivo Vender Transforma

Aplicação web Full-Stack de "Captura de Leads" desenvolvida como parte do desafio prático para a vaga de Estágio em Desenvolvimento de Software na Vender Transforma.

O projeto consiste em um formulário de front-end construído em React que envia os dados de novos contatos para um servidor back-end em Node.js. O servidor, por sua vez, processa esses dados e os integra com a API do CRM Brevo para criar um novo contato na plataforma.

## Funcionalidades

-   **Formulário de Captura:** Interface com campos para Nome, E-mail e Telefone.
-   **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela (desktop e mobile).
-   **Feedback em Tempo Real:** O usuário recebe mensagens instantâneas de sucesso ou erro ao submeter o formulário.
-   **Integração com CRM:** Criação de novos contatos diretamente na plataforma do Brevo via API.
-   **Segurança:** A chave da API é gerenciada de forma segura através de variáveis de ambiente, não sendo exposta no código-fonte.

## Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

-   **Front-end:**
    -   React (com Vite)
    -   Axios
    -   CSS3

-   **Back-end:**
    -   Node.js
    -   Express.js
    -   Axios
    -   Dotenv

-   **Plataforma de CRM:**
    -   Brevo 

## Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação em seu ambiente local.

### **Pré-requisitos**

Antes de começar, você vai precisar ter instalado em sua máquina:
-   [Node.js](https://nodejs.org/en/) (v16 ou superior)
-   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
-   Uma conta gratuita no [Brevo](https://www.brevo.com/) para obter a chave da API.

### **1. Clone o Repositório**

```bash
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
cd seu-repositorio
```

### **2. Configure o Back-end**

O servidor back-end é responsável pela comunicação com o CRM.

```bash
# Navegue até a pasta do back-end
cd backend

# Instale as dependências
npm install
```

Crie um arquivo chamado `.env` na raiz da pasta `/backend` e adicione sua chave de API do Brevo:

```
# /backend/.env
BREVO_API_KEY=sua-chave-secreta-do-brevo-aqui
```

### **3. Configure o Front-end**

A interface do usuário é construída com React.

```bash
# A partir da pasta raiz, navegue até a pasta do front-end
cd ../frontend

# Instale as dependências
npm install
```

### **4. Execute a Aplicação**

Você precisará de **dois terminais** abertos para rodar a aplicação completa.

**Terminal 1 - Rodando o Back-end:**
```bash
# Na pasta /backend
npm start
# ou
node server.js
```
> O servidor estará rodando em `http://localhost:5000`.

**Terminal 2 - Rodando o Front-end:**
```bash
# Na pasta /frontend
npm run dev
```
> A aplicação estará disponível em `http://localhost:5173` (ou a porta indicada no terminal).

## Nota sobre a Escolha do CRM

Inicialmente, a integração seria com o HubSpot. No entanto, durante o período de desenvolvimento, a plataforma de criação de contas de desenvolvedor do HubSpot apresentou instabilidades e barreiras de acesso que inviabilizaram a conclusão da integração dentro do prazo. Como demonstração de adaptabilidade e foco na entrega, optei por pivotar para o CRM Brevo, que possui uma API igualmente robusta e permitiu a conclusão bem-sucedida do desafio.