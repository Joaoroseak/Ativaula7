const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

async function setupDatabase() {
  const db = await open({
    filename: path.resolve(__dirname, "../../database.sqlite"),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      completed INTEGER DEFAULT 0
    );
  `);

  return db;
}

module.exports = setupDatabase;
