import User from "../models/user.js";
import { loginSchema, registerSchema } from "../schemas/auth-schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

export const register = async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({
        message: "Este email já está em uso",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Usuário registrado com sucesso",
    });
  } catch (error) {
    console.error("Erro no registro:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao registrar usuário",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        message: "Email ou senha inválidos",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email ou senha inválidos",
      });
    }

    if (!process.env.SECRET) {
      throw new Error("JWT secret não configurado");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao realizar login",
    });
  }
};
