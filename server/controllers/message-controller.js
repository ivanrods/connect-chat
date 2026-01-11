import { Message, Conversation, User } from "../models/index.js";
import { getIO } from "../config/socket.js";

export const getMessages = async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user.id;

  try {
    const conversation = await Conversation.findOne({
      where: { id: conversationId },
      include: {
        model: User,
        where: { id: userId },
      },
    });

    if (!conversation) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const messages = await Message.findAll({
      where: { conversationId },
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "name", "avatar"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar mensagens." });
  }
};

export const createMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const conversation = await Conversation.findOne({
      where: { id: conversationId },
      include: {
        model: User,
        where: { id: userId },
      },
    });

    if (!conversation) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const message = await Message.create({
      conversationId,
      senderId: userId,
      content,
    });

    const fullMessage = await Message.findByPk(message.id, {
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "name", "avatar"],
        },
      ],
    });

    const io = getIO();
    io.to(`conversation_${conversationId}`).emit("newMessage", fullMessage);

    res.status(201).json(fullMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao enviar mensagem." });
  }
};
