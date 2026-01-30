import User from "../models/user.js";
import { userSchema } from "../schemas/auth-schema.js";

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID do usuário é obrigatório",
    });
  }

  try {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "avatar", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);

    return res.status(500).json({
      message: "Erro interno ao buscar usuário",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID do usuário é obrigatório",
    });
  }

  try {
    const { name, email } = userSchema.parse(req.body);

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.update({ name, email });

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};
