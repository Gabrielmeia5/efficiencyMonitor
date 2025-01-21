require("dotenv").config({ path: "./.env" });
const express = require("express");
const db = require("./db");
const { getTemperature } = require("./app");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = socketIo(server); // Define o Socket.IO

const port = process.env.PORT;
const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

app.use(express.json());

console.log("PORT:", process.env.PORT);
console.log("DB_HOST:", process.env.DB_HOST);

// Rota inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html")); // Define pasta public
});

// Rota para buscar logs
app.get("/logs", async (req, res) => {
  try {
    const logs = await db.selectLogs();
    res.status(200).json(logs);
  } catch (error) {
    console.error("Erro ao buscar logs:", error.message);
    res.status(500).json({ error: "Erro ao buscar logs." });
  }
});

const updateTemperatureLog = async () => {
  try {
    const log = await getTemperature(); // Obter o objeto de temperatura
    if (!log) {
      console.error("Erro ao obter temperatura.");
      return;
    }

    await db.insertLog(log); // Insere no banco de dados

    const logs = await db.selectLogs();
    io.emit("temperatureUpdate", log);
    io.emit("logsDB", logs);
  } catch (error) {
    console.error("Erro ao inserir log de temperatura:", error.message);
  }
};

updateTemperatureLog();

setInterval(updateTemperatureLog, 30 * 1000);

server.listen(port, () => {
  console.log(`Aplicação rodando em: http://localhost:${port}`);
});
