import express from "express";
import User from "./models/user.js";
import sequelize from "./config/database.js";
import cors from "cors";
import jwt, { verify } from "jsonwebtoken";
import "dotenv/config";

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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "7d" });

    return res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido ou expirado." });
  }
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
