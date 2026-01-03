import User from "../models/user.js";
import { loginSchema, registerSchema } from "../schemas/auth-schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

export const register = async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const avatarUrl = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(
      name
    )}`;

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: avatarUrl,
    });

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

export const login = async (req, res) => {
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
};
