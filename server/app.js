import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import sequelize from "./config/database.js";
import routes from "./routes/index.js";

const app = express();

// middlewares globais
app.use(cors());
app.use(express.json());

//Limite de requisições
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 100,
  max: 60,
  message:
    "Muitas requisições a partir deste IP, por favor tente novamente após 15 minutos",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(apiLimiter);

// arquivos estáticos
app.use("/avatars", express.static("public/avatars"));

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
