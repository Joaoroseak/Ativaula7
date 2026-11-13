const express = require("express");
const setupDatabase = require("./database/db");

const app = express();
app.use(express.json());

let db;

// Rota GET - Lista tudo o que está salvo no SQLite
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await db.all("SELECT * FROM tasks");
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Erro ao buscar:", error);
    return res.status(500).json({ error: "Erro interno ao buscar no banco." });
  }
});

// Rota POST - Salva um item novo no SQLite
app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "O campo title é obrigatório." });
  }

  try {
    const result = await db.run(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description || null],
    );

    return res.status(201).json({
      id: result.lastID,
      title,
      description: description || null,
      completed: 0,
    });
  } catch (error) {
    console.error("Erro ao salvar:", error);
    return res.status(500).json({ error: "Erro interno ao salvar no banco." });
  }
});

// Inicia o banco e depois liga o servidor
const PORT = 3000;
setupDatabase()
  .then((databaseInstance) => {
    db = databaseInstance;
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao iniciar o banco:", err);
    process.exit(1);
  });
