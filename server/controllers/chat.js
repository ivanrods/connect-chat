import User from "../models/user.js";
import Chat from "../models/chat.js";
import { chatSchema } from "../schemas/chat-schema.js";
import { io } from "../index.js";
export const getChat = async (req, res) => {
  try {
    const data = await Chat.findAll();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar mensagens." });
  }
};

export const createChat = async (req, res) => {
  const { id } = req.user;
  const { message } = chatSchema.parse(req.body);

  try {
    const user = await User.findByPk(id);
    const newMessage = await Chat.create({ user: user.email, message });
    io.emit("newMessage", newMessage);
    res.status(201).json({ message: "Sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao salvar mensagem." });
  }
};
