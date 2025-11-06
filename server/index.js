import express from "express";
import User from "./models/user.js";
import Chat from "./models/chat.js";
import sequelize from "./config/database.js";
import { loginSchema, registerSchema } from "./schemas/auth-schema.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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
    const { name, email, password } = registerSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
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
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Token inválido ou expirado." });
  }
}

app.get("/chat", authenticateToken, async (req, res) => {
  try {
    const data = await Chat.findAll();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar mensagens." });
  }
});

app.post("/chat", authenticateToken, async (req, res) => {
  const { id } = req.user;
  const { message } = req.body;

  try {
    const user = await User.findByPk(id);
    await Chat.create({ user: user.email, message });
    res.status(201).json({ message: "Sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao salvar mensagem." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
