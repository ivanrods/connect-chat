import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import routes from "./routes/index.js";

const app = express();

// middlewares globais
app.use(cors());
app.use(express.json());

// arquivos estáticos
app.use("/uploads", express.static("uploads"));

// rotas
app.use(routes);

// banco
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Banco de dados sincronizado");
  } catch (err) {
    console.error("Erro ao sincronizar o banco:", err);
  }
})();

export default app;
