# Connect Chat

## Descrição

O **Connect Chat** é uma aplicação **Full Stack** de chat em tempo real, desenvolvida para permitir que usuários façam **login**, **troquem mensagens instantâneas** e **enviem imagens** em uma única página.

O projeto foi pensado para demonstrar conceitos importantes de aplicações modernas, como autenticação com JWT, comunicação em tempo real com Socket.IO, validação de formulários, upload de arquivos e persistência de dados.

---

## Objetivo do Projeto

- Praticar comunicação em tempo real
- Implementar autenticação segura
- Trabalhar com upload de imagens
- Integrar Front-end e Back-end
- Aplicar boas práticas em projetos Full Stack

---

## Funcionalidades

- Login de usuário com autenticação JWT
- Chat em tempo real usando Socket.IO
- Envio de mensagens instantâneas
- Upload de imagens no chat
- Validação de formulários com React Hook Form + Zod
- Interface SPA (Single Page Application)
- Persistência de dados com SQLite

---

## Tecnologias Utilizadas

### Front-end

- React
- React Hook Form
- Zod
- Socket.IO Client
- JavaScript / TypeScript

### Back-end

- Node.js
- Express
- Socket.IO
- JSON Web Token (JWT)
- Multer (upload de imagens)
- Sequelize (ORM)
- SQLite3

---

## Como Rodar o Projeto Localmente

### 🔧 Pré-requisitos

- Node.js instalado
- npm ou yarn

---

### ▶ Back-end

```bash
# Acesse a pasta do backend
cd server

# Instale as dependências
npm install


# Inicie o servidor
npm run dev
```

O servidor será iniciado em:

```
http://localhost:3333
```

---

### ▶ Front-end

```bash
# Acesse a pasta do frontend
cd client

# Instale as dependências
npm install

# Inicie a aplicação
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

## Autenticação

- A autenticação é feita via **JWT**
- O token é gerado no login e enviado nas requisições protegidas

---

## Upload de Imagens

- O upload é feito utilizando **Multer**
- As imagens podem ser enviadas diretamente no chat
- O backend valida e armazena os arquivos

---

## Validação de Formulários

- React Hook Form para gerenciamento de formulários
- Zod para validações e tipagem segura
