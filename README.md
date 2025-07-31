# 📘 Documentação Técnica - API Node.js com CQRS, DDD e Express

## 📖 Visão Geral

Este projeto é um **template de arquitetura Node.js** com os seguintes padrões:

- ✅ DDD (Domain-Driven Design)
- ✅ CQRS (Command Query Responsibility Segregation)
- ✅ Arquitetura Vertical Slices
- ✅ Express.js como framework principal
- ✅ TypeScript
- ✅ SQL Server como banco relacional principal
- ✅ MongoDB, Redis, Kafka e RabbitMQ como integrações opcionais
- ✅ JWT para autenticação
- ✅ Log centralizado com MongoDB
- ✅ Validações, respostas padronizadas e mensagens consistentes

---

## 🏗 Estrutura do Projeto

```bash
nodejs.template.api/
└── src/
    ├── api/
    │   ├── AuthController.ts
    │   ├── GithubController.ts
    │   ├── LogController.ts
    │   ├── MessageController.ts
    │   ├── MessagingTestController.ts
    │   ├── RedisPostController.ts
    │   └── UserController.ts
    ├── application/
    │   ├── Auth/         # Login, Esqueci e Redefinir senha
    │   ├── Github/       # GitHub Integration
    │   ├── Log/          # Gerenciamento de logs
    │   ├── Message/      # CRUD MongoDB
    │   └── User/         # Usuários com eventos e mensageria
    ├── core/
    │   ├── domain/
    │   ├── env/
    │   ├── response/     # ApiResult, ExceptionHandler
    │   ├── security/     # JWT e criptografia
    │   └── util/
    ├── domain/
    │   ├── entities/
    │   ├── enums/
    │   ├── interfaces/
    │   └── valueobjects/
    ├── infrastructure/
    │   ├── database/     # Conexão e repositórios SQL
    │   ├── integration/github/
    │   ├── logging/
    │   ├── messaging/User/Pub/
    │   ├── repositories/
    │   └── service/
    ├── worker/
    │   ├── User/
    │   └── index.ts
    └── main.ts
```

---

## 🗄 Conexões com Bancos de Dados

O projeto já está configurado para se conectar com os seguintes bancos:

| Banco        | Classe               | Teste                    | Status        |
|--------------|----------------------|--------------------------|---------------|
| SQL Server   | `SqlServerDatabase`  | `SqlServerDatabase.test.ts` | ✅ OK |
| Oracle       | `OracleDatabase`     | `OracleDatabase.test.ts`    | ✅ OK |
| MySQL        | `MySqlDatabase`      | `MySqlDatabase.test.ts`     | ✅ OK |

### 📂 Localização

```bash
src/infrastructure/database/
├── SqlServerDatabase.ts
├── OracleDatabase.ts
├── MySqlDatabase.ts
└── __tests__/
    ├── SqlServerDatabase.test.ts
    ├── OracleDatabase.test.ts
    └── MySqlDatabase.test.ts
```

### 🔧 Variáveis no `.env.development`

**SQL Server**

```env
SQLSERVER_HOST=localhost
SQLSERVER_PORT=1433
SQLSERVER_DB=your_database
SQLSERVER_USER=sa
SQLSERVER_PASSWORD=your_password
```

**Oracle**

```env
ORACLE_HOST=localhost
ORACLE_PORT=1521
ORACLE_SID=xe
ORACLE_USER=hr
ORACLE_PASSWORD=oracle
ORACLE_LIB_DIR=F:\Work\oracle\instantclient_19_27\instantclient_19_27
```

**MySQL**

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=your_database
MYSQL_USER=root
MYSQL_PASSWORD=your_password
```

### 🧪 Rodar todos os testes de conexão

```bash
npx vitest run
```

Ou adicione um script no `package.json`:

```json
"test:databases": "npx vitest run"
```

## 🚀 Como Executar o Projeto

### 🔧 Local com Node.js

```bash
npm install
npm run dev
```

Acesse:
- Swagger: http://localhost:3000/api-docs (caso configure com swagger-ui-express)

### 🐳 Com Docker

```bash
docker-compose up --build
```

Ou apenas o worker:

```bash
docker-compose run --rm worker
```

---

## 📦 Endpoints Disponíveis (Exemplos)

### 🔐 AuthController

| Método | Rota                      | Descrição                  |
|--------|---------------------------|----------------------------|
| POST   | /auth/login               | Login com e-mail e senha   |
| POST   | /auth/forgot-password     | Envia código por e-mail    |
| POST   | /auth/reset-password      | Redefine senha com código  |

### 👤 UserController

| Método | Rota           | Descrição         |
|--------|----------------|-------------------|
| GET    | /users         | Lista usuários    |
| GET    | /users/{id}    | Busca por ID      |
| POST   | /users         | Cria usuário      |
| PUT    | /users/{id}    | Atualiza usuário  |
| DELETE | /users/{id}    | Remove usuário    |

### 🧪 MessagingTestController

| Método | Rota                    |
|--------|-------------------------|
| POST   | /test-messaging/redis   |
| POST   | /test-messaging/rabbitmq|
| POST   | /test-messaging/kafka   |

### 📫 RedisPostController

| Método | Rota                     |
|--------|--------------------------|
| GET    | /redis-posts             |
| GET    | /redis-posts/{id}        |
| POST   | /redis-posts             |
| PUT    | /redis-posts/{id}        |
| DELETE | /redis-posts/{id}        |

### 📨 MessageController (MongoDB)

| Método | Rota                 |
|--------|----------------------|
| GET    | /messages            |
| GET    | /messages/{id}       |
| POST   | /messages            |
| PUT    | /messages/{id}       |
| DELETE | /messages/{id}       |

### 🐱 GithubController

| Método | Rota                        | Descrição                      |
|--------|-----------------------------|--------------------------------|
| GET    | /github/user                | Perfil GitHub (live)           |
| GET    | /github/repos               | Repositórios GitHub (live)     |
| POST   | /github/store/profile       | Armazena perfil no Mongo       |
| POST   | /github/store/repos         | Armazena repositórios no Mongo |
| GET    | /github/stored/profile      | Recupera perfil do Mongo       |
| GET    | /github/stored/repos        | Recupera repositórios do Mongo |

### 📜 LogController

| Método | Rota              | Descrição                         |
|--------|-------------------|-----------------------------------|
| GET    | /logs/?limit=100  | Lista logs                        |
| DELETE | /logs/?older_than=YYYY-MM-DDTHH:mm:ss | Remove logs antigos |

---

## 🧩 Validações e Responses Padronizados

Todas as respostas seguem o formato:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Mensagem de sucesso",
  "errors": [],
  "data": {}
}
```

Erros de validação:

```json
{
  "success": false,
  "statusCode": 422,
  "errors": [
    { "message": "Campo obrigatório" }
  ],
  "data": null
}
```

> 📍 Classes: `ApiResult`, `ExceptionHandler` em `core/response`

---

## 📫 Mensageria Assíncrona

### Redis

- Canais: `user-created`, `user-updated`, `user-deleted`
- Publisher: `RedisPublisher.ts`
- Subscriber: `RedisSubscriber.ts`

### RabbitMQ

- Fanout exchange
- Publisher: `RabbitMQPublisher.ts`
- Subscriber: `RabbitSubscriber.ts`
- Painel: http://localhost:15672

### Kafka

- Tópico: `user-topic`
- Publisher: `KafkaPublisher.ts`
- Subscriber: `KafkaSubscriber.ts`
- UI opcional: http://localhost:9100

---

## 🧪 Testes via Postman

Importe a coleção:

```
📁 API - NodeJS.postman_collection.json
```

Coleções separadas por: Auth, Messaging, MongoDB, Redis, GitHub, Logs e User.

---


## 🧰 Padrões de Código e Qualidade

O projeto utiliza **ESLint v9+ com Flat Config** e **Prettier** para manter um código limpo e padronizado.

### 📦 Scripts disponíveis

| Comando             | Descrição                                              |
|---------------------|--------------------------------------------------------|
| `npm run lint`      | Analisa o código com ESLint                            |
| `npm run lint:fix`  | Corrige automaticamente os problemas identificados     |
| `npm run format`    | Formata os arquivos com Prettier                       |

### 📂 Arquivos de configuração

- `eslint.config.cjs`: Configuração moderna do ESLint com suporte a TypeScript
- `.prettierrc`: Regras de formatação do Prettier
- `.vscode/settings.json`: Configuração de editor para formatação automática
- `.gitignore`, `tsconfig.json`, `nodemon.json`: arquivos auxiliares

### 📦 Dependências instaladas

```bash
npm install --save-dev \
  eslint prettier \
  eslint-config-prettier eslint-plugin-prettier \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  typescript-eslint js
```


## 📫 Como me encontrar
- [![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCjy19AugQHIhyE0Nv558jcQ)
- [![Linkedin Badge](https://img.shields.io/badge/-Guilherme_Figueiras_Maurila-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/guilherme-maurila)](https://www.linkedin.com/in/guilherme-maurila)
- [![Gmail Badge](https://img.shields.io/badge/-gfmaurila@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:gfmaurila@gmail.com)](mailto:gfmaurila@gmail.com)
- 📧 Email: gfmaurila@gmail.com