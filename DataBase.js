import * as SQLite from "expo-sqlite";

let db = null;

export async function getDatabase() {
  if (db) {
    return db;
  }

  try {
    // Mudando o nome do banco para refletir a doceria
    db = await SQLite.openDatabaseAsync("cacaudourado.db");

    // Criação das tabelas
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      
      CREATE TABLE IF NOT EXISTS usuarios (
        id TEXT PRIMARY KEY NOT NULL,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS produtos (
        id TEXT PRIMARY KEY NOT NULL,
        nome TEXT NOT NULL,
        preco TEXT NOT NULL,
        descricao TEXT,
        imagem TEXT,
        categoria TEXT NOT NULL
      );
    `);

    return db;
  } catch (error) {
    console.error("Erro ao inicializar banco de dados: ", error);
    throw error;
  }
}
