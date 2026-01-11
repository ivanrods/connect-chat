import { Message, Conversation } from "../models/index.js";

export const getMessages = async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user.id;

  try {
    const conversation = await Conversation.findByPk(conversationId, {
      include: { model: User, where: { id: userId } },
    });

    if (!conversation)
      return res.status(403).json({ message: "Acesso negado" });

    const messages = await Message.findAll({
      where: { conversationId },
      include: [
        { model: User, as: "sender", attributes: ["id", "name", "avatar"] },
      ],
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar mensagens." });
  }
};

export const createMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const message = await Message.create({
      conversationId,
      senderId: userId,
      content,
    });

    const io = getIO();
    io.to(conversationId).emit("newMessage", message);

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Erro ao enviar mensagem." });
  }
};
