import express from "express";
import sequelize from "./config/database.js";
import cors from "cors";
import router from "./routes/index.js";

import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3333;

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Banco de dados sincronizado");
  } catch (err) {
    console.error("Erro ao sincronizar o banco:", err);
  }
})();

app.use(router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Usuário conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

export { io };

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
