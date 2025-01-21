const { Pool } = require("pg");

let pool;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";
const DB_NAME = process.env.DB_NAME || "defaultDB";
const CONNECTION_STRING = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

async function connect() {
  if (!pool) {
    pool = new Pool({
      connectionString: CONNECTION_STRING,
    });
    console.log("Criou pool de conexão!");
  }
  return pool;
}

async function selectLogs() {
  const pool = await connect();
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM efficiency_log");
    return res.rows;
  } catch (err) {
    console.error("Erro ao buscar logs:", err);
    throw new Error("Erro ao buscar logs");
  } finally {
    client.release();
  }
}

async function insertLog(log) {
  const pool = await connect();
  const client = await pool.connect();

  await createTableJson(client);

  const { localization, ...logWithoutLocalization } = log; 

  const sql =
    "INSERT INTO efficiency_log(data_time, temperature, efficiency) VALUES ($1, $2, $3)";
  const values = [
    logWithoutLocalization.data_time,
    logWithoutLocalization.temperature,
    logWithoutLocalization.efficiency,
  ];

  try {
    console.log("Inserindo log de temperatura:", logWithoutLocalization);
    await client.query(sql, values);
  } catch (err) {
    console.error("Erro ao inserir log:", err);
    throw new Error("Erro ao inserir log de temperatura");
  } finally {
    client.release();
  }
}

async function createTableJson(client) {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS efficiency_log (
            id SERIAL PRIMARY KEY,
            data_time TIMESTAMPTZ NOT NULL,
            temperature REAL NOT NULL,
            efficiency REAL NOT NULL
        );
    `;
  try {
    await client.query(createTableQuery);
    console.log("Tabela 'efficiency_log' verificada ou criada.");
  } catch (err) {
    console.error("Erro ao criar a tabela:", err);
  }
}

module.exports = {
  selectLogs,
  insertLog,
};
