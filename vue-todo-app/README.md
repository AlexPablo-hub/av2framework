# Todo App - Frontend

Uma aplicação de gerenciamento de tarefas desenvolvida em **Vue 3** com **Vite**, integração com **Firebase Authentication** e consumo da API backend Express.js.

## 🚀 Tecnologias Utilizadas

- **Vue.js 3** - Framework JavaScript para interfaces reativas
- **Vite** - Ferramenta de build e desenvolvimento rápido
- **Vue Router** - Gerenciamento de rotas SPA
- **Pinia** - Gerenciamento de estado
- **Firebase Authentication** - Autenticação de usuários
- **Axios** - Requisições HTTP

## 📋 Funcionalidades

- ✅ Cadastro e login de usuários com Firebase Authentication
- ✅ Listagem, criação, edição e exclusão de tarefas
- ✅ Marcar tarefas como concluídas/pendentes
- ✅ Definir prioridade e data de vencimento
- ✅ Dashboard com estatísticas
- ✅ Integração total com backend Express.js

## 🏗️ Estrutura do Projeto

```
vue-todo-app/
├── public/                # Arquivos estáticos
├── src/
│   ├── components/        # Componentes Vue reutilizáveis
│   ├── views/             # Páginas principais
│   ├── router/            # Configuração de rotas
│   ├── store/             # Gerenciamento de estado (Pinia)
│   ├── firebase.js        # Configuração do Firebase
│   ├── lib/               # Funções utilitárias
│   └── App.vue            # Componente raiz
├── .env                   # Variáveis de ambiente
├── package.json           # Dependências e scripts
├── vite.config.js         # Configuração do Vite
└── README.md
```

## ⚙️ Configuração e Instalação

### 1. Pré-requisitos
- Node.js (versão 16 ou superior)
- Conta no Firebase
- Backend configurado e rodando (ver README do backend)

### 2. Clonagem e Instalação
```bash
# Clonar repositório
 git clone <seu-repositorio>
 cd vue-todo-app

# Instalar dependências
 npm install
```

### 3. Configuração do Firebase
1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Crie um novo projeto ou use um existente
3. Ative o **Authentication** (Email/Senha)
4. Copie as credenciais do app web e configure no arquivo `.env`:

```
VITE_API_KEY=xxxx
VITE_AUTH_DOMAIN=xxxx
VITE_PROJECT_ID=xxxx
VITE_APP_ID=xxxx
```

### 4. Configuração do Backend
- Certifique-se de que o backend está rodando e acessível.
- Configure a URL base da API no arquivo `.env`:
```
VITE_API_URL=http://localhost:3000/api
```

### 5. Executar Aplicação
```bash
# Desenvolvimento
npm run dev
```
Acesse: [http://localhost:5173](http://localhost:5173)

## 🔗 Integração com Backend
- Todas as requisições são autenticadas via token JWT do Firebase.
- O frontend consome os endpoints documentados no backend.
- Exemplo de requisição autenticada:
```js
axios.get('/tasks', { headers: { Authorization: `Bearer <firebase_token>` } })
```

## 📝 Notas de Desenvolvimento
- Estrutura modular de componentes
- Validação de formulários
- Feedback visual para erros e carregamento
- Responsivo e mobile-first
- Código comentado e organizado

## 🤝 Contribuição
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request