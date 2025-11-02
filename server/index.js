import express from "express";
import User from "./models/user.js";
import sequelize from "./config/database.js";

const app = express();

app.use(express.json());

const PORT = 3333;

await sequelize.sync({});

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Banco de dados sincronizado");
  } catch (err) {
    console.error("Erro ao sincronizar o banco:", err);
  }
})();

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});
app.post("/login", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
