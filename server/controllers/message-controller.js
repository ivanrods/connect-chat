import { Message, Conversation, User } from "../models/index.js";
import { Op } from "sequelize";
import { getIO } from "../config/socket.js";

export const getMessages = async (req, res) => {
  const { id: conversationId } = req.params;
  const userId = req.user.id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

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

    const { rows, count } = await Message.findAndCountAll({
      where: { conversationId },
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "name", "avatar"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    await Message.update(
      { isRead: true },
      {
        where: {
          conversationId,
          senderId: { [Op.ne]: userId },
          isRead: false,
        },
      },
    );

    res.json({
      messages: rows.reverse(),
      page,
      totalPages: Math.ceil(count / limit),
      totalMessages: count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar mensagens." });
  }
};

export const createMessage = async (req, res) => {
  const { id: conversationId } = req.params;

  const { content } = req.body || {};

  const userId = req.user.id;

  let imageUrl = null;
  let imagePublicId = null;

  if (req.file) {
    imageUrl = req.file.path;
    imagePublicId = req.file.filename;
  }

  if (!content && !imageUrl) {
    return res.status(400).json({ message: "Mensagem vazia" });
  }

  try {
    const conversation = await Conversation.findOne({
      where: { id: conversationId },
      include: {
        model: User,
        where: { id: userId },
        attributes: ["id"],
      },
    });

    if (!conversation) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const message = await Message.create({
      conversationId,
      senderId: userId,
      content,
      imageUrl,
      imagePublicId,
      isRead: false,
    });

    conversation.changed("updatedAt", true);
    await conversation.save();

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
    io.emit("conversationUpdated", {
      conversationId,
      lastMessage: fullMessage,
    });

    const users = await conversation.getUsers({
      attributes: ["id"],
    });

    users.forEach((u) => {
      if (u.id !== userId) {
        io.to(`user_${u.id}`).emit("unreadMessage", {
          conversationId,
          senderId: userId,
        });
      }
    });

    return res.status(201).json(fullMessage);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao enviar mensagem." });
  }
};
