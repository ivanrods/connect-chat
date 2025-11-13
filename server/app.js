import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import sequelize from "./config/database.js";

const app = express();

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Banco de dados sincronizado");
  } catch (err) {
    console.error("Erro ao sincronizar o banco:", err);
  }
})();

app.use(cors());
app.use(express.json());
app.use(router);

export default app;
