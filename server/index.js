import express from "express";
import sequelize from "./config/database.js";
import cors from "cors";
import router from "./routes/index.js";

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

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
