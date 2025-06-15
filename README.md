# AV2 Framework

Este repositório contém dois projetos principais organizados em pastas separadas:

## 📦 Backend (Express.js + MySQL + Firebase)

A API backend está localizada na pasta [`/backend/`](./backend/), desenvolvida com **Express.js**, **MySQL** e **Firebase Authentication**.  
Ela fornece todos os endpoints para autenticação, gerenciamento de usuários e tarefas.

Mais detalhes técnicos, instruções de instalação e uso estão disponíveis em [`/backend/README.md`](./backend/README.md).

---

## 🎨 Frontend (Vue 3 + Vite + Firebase)

A aplicação frontend está na pasta [`/vue-todo-app/`](./vue-todo-app/), criada com **Vue 3**, **Vite** e integrada ao Firebase para autenticação.  
Consome a API do backend e permite o gerenciamento completo de tarefas via interface web.

Para informações sobre configuração, funcionalidades e estrutura, veja [`/vue-todo-app/README.md`](./vue-todo-app/README.md).

---

## 📁 Estrutura do Repositório

```
av2framework/
├── backend/          # API REST em Express
│   └── README.md
├── vue-todo-app/     # Frontend Vue 3
│   └── README.md
└── README.md         # Este arquivo
```

---
