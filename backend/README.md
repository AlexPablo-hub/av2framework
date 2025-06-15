# Todo App - Backend

Uma aplicação completa de gerenciamento de tarefas com backend em **Express.js**, banco de dados **MySQL** e autenticação com **Firebase Authentication**.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Banco de dados relacional
- **Firebase Authentication** - Autenticação de usuários
- **mysql2** - Driver MySQL para Node.js
- **firebase-admin** - SDK Admin do Firebase

## 📋 Funcionalidades

### Autenticação
- ✅ Login e cadastro com Firebase Authentication
- ✅ Verificação de tokens JWT em todas as rotas protegidas
- ✅ Middleware de autenticação personalizado

### Usuários
- ✅ Criação automática de usuário no banco após autenticação

### Tarefas
- ✅ Criar, listar, atualizar e deletar tarefas
- ✅ Marcar como concluída/pendente
- ✅ Definir prioridades (baixa, média, alta)
- ✅ Data de vencimento
- ✅ Estatísticas das tarefas

## 🏗️ Estrutura do Projeto

```
backend/
├── config/
│   ├── database.js          # Configuração MySQL
│   └── firebase.js          # Configuração Firebase Admin
├── controllers/
│   ├── userController.js    # Controlador de usuários
│   └── taskController.js    # Controlador de tarefas
├── middleware/
│   └── auth.js              # Middleware de autenticação
├── routes/
│   ├── index.js             # Rotas principais
│   ├── userRoutes.js        # Rotas de usuários
│   └── taskRoutes.js        # Rotas de tarefas
├── services/
│   ├── userService.js       # Serviços de usuários
│   └── taskService.js       # Serviços de tarefas
├── .env.example             # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
├── README.md
└── server.js                # Servidor principal
```

## ⚙️ Configuração e Instalação

### 1. Pré-requisitos
- Node.js (versão 16 ou superior)
- MySQL Server
- Conta no Firebase

### 2. Clonagem e Instalação
```bash
# Clonar repositório
git clone <seu-repositorio>
cd backend

# Instalar dependências
npm install
```

### 3. Configuração do Banco de Dados
Execute o script SQL fornecido (`mysql_schema.sql`) para criar o banco e tabelas:

```sql
-- Executar no MySQL
source mysql_schema.sql
```

### 4. Configuração do Firebase
1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Vá em **Configurações do Projeto** > **Contas de Serviço**
3. Gere uma nova chave privada
4. Baixe o arquivo JSON e configure as variáveis no `.env`

### 5. Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
- Dados de conexão MySQL
- Credenciais do Firebase Admin SDK
- Configurações do servidor

### 6. Executar Aplicação
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📚 API Endpoints

### Autenticação
Todas as rotas (exceto `/api/health`) requerem header de autorização:
```
Authorization: Bearer <firebase_token>
```

### Usuários
- `GET /api/users/profile` - Obter perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil
- `GET /api/users/dashboard` - Dashboard com estatísticas
- `DELETE /api/users/account` - Deletar conta

### Tarefas
- `GET /api/tasks` - Listar tarefas do usuário
- `GET /api/tasks/:id` - Obter tarefa específica
- `POST /api/tasks` - Criar nova tarefa
- `PUT /api/tasks/:id` - Atualizar tarefa
- `PATCH /api/tasks/:id/toggle` - Alternar status de conclusão
- `DELETE /api/tasks/:id` - Deletar tarefa
- `GET /api/tasks/statistics` - Estatísticas das tarefas

### Utilitários
- `GET /api/health` - Health check da API

## 📊 Modelo de Dados

### Usuários (users)
- `id` - ID único
- `firebase_uid` - UID do Firebase
- `email` - Email do usuário
- `name` - Nome do usuário
- `created_at` - Data de criação
- `updated_at` - Data de atualização

### Tarefas (tasks)
- `id` - ID único
- `user_id` - ID do usuário (FK)
- `title` - Título da tarefa
- `description` - Descrição (opcional)
- `completed` - Status de conclusão
- `priority` - Prioridade (low/medium/high)
- `due_date` - Data de vencimento (opcional)
- `created_at` - Data de criação
- `updated_at` - Data de atualização

## 🔒 Segurança

- **Autenticação JWT** - Todas as rotas protegidas
- **CORS** configurado para origins específicos
- **Rate Limiting** - Máximo 100 requests por 15 minutos
- **Helmet** - Headers de segurança
- **Validação de dados** - Validação de entrada em todos os endpoints
- **SQL Injection Protection** - Uso de prepared statements

## 🚦 Status da API

A API inclui um endpoint de health check:
```bash
GET /api/health
```

Resposta:
```json
{
  "success": true,
  "message": "API Todo funcionando corretamente!",
  "timestamp": "2025-06-10T...",
  "version": "1.0.0"
}
```

## 🔄 Frontend

O frontend será desenvolvido em **Vue.js** e se conectará a esta API usando os tokens do Firebase Authentication.

## 📝 Notas de Desenvolvimento

- Todas as rotas retornam JSON
- Padrão de resposta consistente com `success` e `data`/`message`
- Logs detalhados para debugging
- Tratamento de erros global
- Validação de dados robusta

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request
