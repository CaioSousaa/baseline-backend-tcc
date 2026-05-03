# Baseline Backend

API REST para gerenciamento de tarefas, desenvolvida como projeto de TCC. Construída com Node.js, Express e TypeScript, seguindo princípios de Clean Architecture.

## Funcionalidades

- **Autenticação** — Login com JWT (expira em 6h)
- **Gerenciamento de usuários** — Cadastro com senha criptografada via bcrypt
- **Tarefas** — CRUD completo com status, prioridade, data de vencimento e tags
- **Tags** — Categorização de tarefas com cores personalizadas
- **Notificações** — Alertas automáticos para tarefas com vencimento em menos de 24h (job agendado a cada 1h via Agenda)

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express 5 |
| Banco de dados | MongoDB Atlas (Mongoose) |
| Autenticação | JWT (jsonwebtoken) |
| Senhas | bcrypt |
| Jobs agendados | Agenda |
| Dev | Nodemon + ts-node |

## Pré-requisitos

- Node.js 18+
- Conta no MongoDB Atlas (ou instância local)

## Instalação

```bash
git clone https://github.com/CaioSousaa/baseline-backend-tcc.git
cd baseline-backend-tcc
npm install
```

Crie o arquivo `.env` na raiz do projeto:

```env
PORT=3333

MONGO_USER=root
MONGO_PASSWORD=sua_senha
MONGODB_URL=sua_url

JWT_SECRET_KEY=sua_chave_secreta
JWT_EXPIRES_IN=6h
```

## Executando

```bash
# Desenvolvimento (com hot-reload)
npm run dev
```

O servidor inicia na porta definida em `PORT` (padrão: `3333`).

## Endpoints

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/login` | Login — retorna token JWT |

### Usuários

| Método | Rota | Descrição |
|---|---|---|
| POST | `/user/create` | Cadastrar novo usuário |
| PUT | `/user/update` | Atualizar perfil do usuário `[JWT obrigatório]` |

### Tarefas `[JWT obrigatório]`

| Método | Rota | Descrição |
|---|---|---|
| POST | `/task/create` | Criar tarefa |
| GET | `/task/` | Listar tarefas do usuário autenticado |
| PUT | `/task/:id` | Atualizar tarefa |
| DELETE | `/task/:id` | Excluir tarefa |

### Tags `[JWT obrigatório]`

| Método | Rota | Descrição |
|---|---|---|
| POST | `/tag/create` | Criar tag |
| GET | `/tag/` | Listar tags do usuário autenticado |
| PUT | `/tag/:id` | Atualizar tag |
| DELETE | `/tag/:id` | Excluir tag |

### Notificações `[JWT obrigatório]`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/notification/` | Listar notificações do usuário |
| PATCH | `/notification/:id/read` | Marcar notificação como lida |

### Autenticação nas requisições

Inclua o header em todas as rotas protegidas:

```
Authorization: Bearer <token>
```

## Modelos de dados

### Task

```ts
{
  title: string           // obrigatório
  description: string     // obrigatório
  status: 'todo' | 'in_progress' | 'done'  // padrão: 'todo'
  priority: 'low' | 'medium' | 'high'      // padrão: 'low'
  dueDate: Date           // obrigatório (não pode ser no passado)
  owner: ObjectId         // referência ao usuário
  tags: ObjectId[]        // referências às tags
  alert?: string          // mensagem de alerta personalizada
}
```

### Tag

```ts
{
  name: string    // obrigatório
  color: string   // obrigatório
  owner: ObjectId
}
```

### Notification

```ts
{
  owner: ObjectId
  task: ObjectId
  message: string
  read: boolean   // padrão: false
}
```

## Estrutura do projeto

```
src/
├── main/            # Ponto de entrada da aplicação
├── routes/          # Definição de rotas por domínio
├── modules/         # Módulos de domínio (Clean Architecture)
│   ├── auth/
│   ├── user/
│   ├── task/
│   ├── tag/
│   └── notification/
├── infra/
│   └── mongo/schemas/  # Schemas do Mongoose
├── config/
│   ├── jwt/            # Configuração do JWT
│   └── agenda/         # Configuração e jobs do Agenda
├── shared/
│   └── http/           # Middlewares
└── adapters/           # Utilitários compartilhados
```

Cada módulo segue a estrutura: `dto/` → `port/` → `services/` → `infra/` → `factories/`.
