# Monitor de Eficiência com Base na Temperatura

Este projeto é um sistema de monitoramento que calcula a eficiência de uma máquina com base na temperatura de um local específico. O projeto utiliza Node.js, JavaScript, HTML, CSS e um banco de dados PostgreSQL para armazenar logs e apresentar informações ao usuário.

---

## 📝 Resumo do Projeto

O sistema monitora a temperatura de um local específico, utilizando a API [OpenWeatherMap](https://openweathermap.org/current). 
- Ele calcula a eficiência da máquina com base na fórmula:
  ```
  Eficiência = 75 + ((Temperatura - 24) / 4) * 25

As informações são atualizadas automaticamente a cada 30 segundos, sendo exibidas em uma interface interativa e armazenadas como logs no banco de dados.

Principais funcionalidades:
- Exibição da temperatura e da eficiência calculada.
- Gráfico dinâmico com os dados dos últimos logs, utilizando a biblioteca [Chart.js](https://www.chartjs.org/).
- Logs detalhados no banco de dados com data, hora, temperatura e eficiência.

---

## 🛠️ Tecnologias Utilizadas

- **Backend**: [Node.js](https://nodejs.org/) com [Express.js](https://expressjs.com/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) (hospedado localmente)
- **Frontend**: HTML, CSS, JavaScript
- **Gráfico**: [Chart.js](https://www.chartjs.org/) para visualização de dados
- **API de Temperatura**: [OpenWeather API](https://openweathermap.org/)
- **Bibliotecas Adicionais**:
  - `dotenv` (Gerenciamento de variáveis de ambiente)
  - `express` (Servidor backend)
  - `pg` (Conexão com PostgreSQL)
  - `socket.io` (Comunicação com frontend)

---

## 📋 Funcionalidades

- **Página Inicial**:
  - Exibição dos últimos dados: Data e hora, temperatura e eficiência da máquina.
  - Gráfico de linha com o histórico de temperatura e eficiência.
  - Atualização automática a cada 30 segundos.
  - Média de perda da eficiência segundo histórico de logs
  - Seleção de escopo de visualização de dados exibidos no gráfico.
  - Confirmação da localização de monitoramento.
- **Banco de Dados**:
  - Registro de data/hora, temperatura e eficiência da máquina no banco a cada 30 segundos.
- **Cálculo de Eficiência**:
  - Eficiência máxima (100%) ocorre a 28°C ou acima.
  - Eficiência mínima (75%) ocorre a 24°C ou abaixo.
  - Comportamento linear e diretamente proporcial entre 24°C e 28°C.
- **Extras**:
  - Interface responsiva e amigável.
---

## 🚀 Como Executar o Projeto

### 1️⃣ Pré-requisitos
- Certifique-se de ter instalado:
  - [Node.js](https://nodejs.org/)
  - [PostgreSQL](https://www.postgresql.org/)

- Clone o repositório
    ```
      git clone https://github.com/Gabrielmeia5/efficiencyMonitor.git

### 2️⃣ Configuração do Banco de Dados
- Crie um banco de dados PostgreSQL local.
- Atualize o arquivo .env na raiz do projeto com as configurações do PostgreSQL:   
   ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=nome_bancoDeDado
### 3️⃣  Configuração da API OpenWeather
 - Obtenha uma chave de API no site [OpenWeather](https://home.openweathermap.org/api_keys)
 - Adicione a chave no arquivo .env:
    ```
    API_KEY=XXXX

### 4️⃣  Executando o Projeto


- Instale as dependências:
    ```
    npm install
- Inicie o servidor
    ```
    node src/server.js
- Acesse a aplicação no navegador em:
    ```
    http://localhost:3000

### 🔄  Melhorias Possíveis
Embora o sistema já esteja funcional, há várias melhorias que podem ser implementadas para aprimorar a experiência do usuário e a flexibilidade do sistema. Algumas dessas melhorias incluem:

#### 1. **Interface de Login**
   - Sistema de autenticação para garantir que apenas usuários autorizados possam acessar e visualizar os dados da máquina.
   - Pode ser implementado com métodos simples de login como e-mail e senha.

#### 2. **Interface de Configuração Prévia**
   - Criar uma interface para que o usuário possa selecionar suas preferências e configurar os parâmetros iniciais, como:
     - **Período de Funcionamento**: Permitir que o usuário defina o intervalo de tempo durante o qual a máquina está em funcionamento.
     - **Localização**: Oferecer a opção de escolher a localização, permitindo ao usuário selecionar a localização. 
     - **Alerta de E-mails**: Permitir a configuração de alertas por e-mail, avisando o usuário quando a eficiência da máquina atingir o mínimo.
     - **Previsão de Eficiência**: Implementar uma funcionalidade que com base nas condições meteorológicas, forneça uma previsão de eficiência para as próximas horas.

#### 3. **Múltiplas Interfaces de Monitoramento para Diferentes Máquinas em Diferentes Locais**
   - Permitir que o sistema monitore várias máquinas, em diferentes locais, ao mesmo tempo. 
  
   

Essas melhorias podem tornar o sistema mais robusto e atender a uma variedade maior de necessidades, oferecendo uma experiência de usuário mais personalizada e interativa.







