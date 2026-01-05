import User from "../models/user.js";

export const getUser = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findByPk(userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Usuário não encontrado" });
  }
};
