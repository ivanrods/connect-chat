import User from "../models/user.js";

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
