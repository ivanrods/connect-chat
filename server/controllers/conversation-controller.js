import {
  Conversation,
  User,
  ConversationUser,
  Message,
} from "../models/index.js";
import { Op } from "sequelize";

export const getConversations = async (req, res) => {
  const userId = req.user.id;

  try {
    const conversations = await Conversation.findAll({
      include: [
        {
          model: ConversationUser,
          where: { userId },
          attributes: ["favorite"],
        },
        {
          model: User,
          attributes: ["id", "name", "avatar"],
          through: { attributes: [] },
        },
        // 🔹 Última mensagem (continua igual)
        {
          model: Message,
          limit: 1,
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: User,
              as: "sender",
              attributes: ["id", "name"],
            },
          ],
        },
        // Mensagens não lidas
        {
          model: Message,
          as: "unreadMessages",
          attributes: ["id"],
          where: {
            isRead: false,
            senderId: { [Op.ne]: userId },
          },
          required: false,
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    const formatted = conversations.map((conv) => {
      const json = conv.toJSON();

      return {
        ...json,
        unreadCount: json.unreadMessages?.length || 0,
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erro ao buscar conversas.",
      error: err.message,
    });
  }
};

export const createConversation = async (req, res) => {
  const userId = req.user.id;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email é obrigatório" });
  }

  try {
    const otherUser = await User.findOne({ where: { email } });

    if (!otherUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (otherUser.id === userId) {
      return res
        .status(400)
        .json({ message: "Não é possível criar conversa consigo mesmo" });
    }

    const conversations = await Conversation.findAll({
      include: {
        model: User,
        where: { id: userId },
        through: { attributes: [] },
      },
    });

    for (const conversation of conversations) {
      const users = await conversation.getUsers({
        where: { id: otherUser.id },
      });

      if (users.length > 0) {
        const fullConversation = await Conversation.findByPk(conversation.id, {
          include: {
            model: User,
            attributes: ["id", "name", "avatar"],
            through: { attributes: [] },
          },
        });

        return res.status(200).json(fullConversation);
      }
    }

    const conversation = await Conversation.create();

    await ConversationUser.bulkCreate([
      { conversationId: conversation.id, userId },
      { conversationId: conversation.id, userId: otherUser.id },
    ]);

    const fullConversation = await Conversation.findByPk(conversation.id, {
      include: {
        model: User,
        attributes: ["id", "name", "avatar"],
        through: { attributes: [] },
      },
    });

    return res.status(201).json(fullConversation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao criar conversa" });
  }
};
