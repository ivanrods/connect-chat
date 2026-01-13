import sequelize from "../config/database.js";
import { Conversation, User } from "../models/index.js";

//Criar ou recuperar uma conversa 1–1

export const getOrCreateConversation = async (req, res) => {
  const userId = req.user.id;
  const { userId: otherUserId } = req.params;

  if (!otherUserId) {
    return res.status(400).json({
      message: "ID do outro usuário não informado",
    });
  }

  if (userId === otherUserId) {
    return res.status(400).json({
      message: "Não é possível criar conversa consigo mesmo",
    });
  }

  try {
    // 1️⃣ Buscar conversas do usuário logado
    const conversations = await Conversation.findAll({
      include: {
        model: User,
        where: { id: userId },
        through: { attributes: [] },
      },
    });

    // 2️⃣ Verificar se alguma conversa tem o outro usuário
    for (const conversation of conversations) {
      const users = await conversation.getUsers({
        where: { id: otherUserId },
      });

      if (users.length > 0) {
        return res.json(conversation);
      }
    }

    // 3️⃣ Criar nova conversa
    const conversation = await Conversation.create();

    await conversation.addUsers([userId, otherUserId]);

    res.status(201).json(conversation);
  } catch (err) {
    console.error("Erro ao criar conversa:", err);
    res.status(500).json({
      message: "Erro ao criar conversa.",
      error: err.message,
    });
  }
};

/**
 * Listar todas as conversas do usuário logado
 */
export const getUserConversations = async (req, res) => {
  const userId = req.user.id;

  try {
    const conversations = await Conversation.findAll({
      include: {
        model: User,
        where: { id: userId },
        attributes: ["id", "name", "avatar"],
        through: { attributes: [] },
      },
      order: [["updatedAt", "DESC"]],
    });

    res.status(200).json(conversations);
  } catch (err) {
    console.error("Erro ao buscar conversas:", err);
    res.status(500).json({
      message: "Erro ao buscar conversas.",
      error: err.message,
    });
  }
};
