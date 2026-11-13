# API com Persistência em SQLite

## Como rodar o projeto

1. Instale as dependências: `npm install`
2. Inicie o servidor: `node src/server.js`

O arquivo `database.sqlite` será criado automaticamente na raiz ao iniciar.

## Rotas

- `GET /tasks` - Lista todas as tarefas salvas.
- `POST /tasks` - Cria uma nova tarefa (enviar JSON com `title` e `description`).
