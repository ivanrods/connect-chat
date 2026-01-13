import sequelize from "../config/database.js";
import { Conversation, User } from "../models/index.js";

/**
 * Criar ou recuperar uma conversa 1–1
 */
export const getOrCreateConversation = async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.params;

  if (userId === otherUserId) {
    return res
      .status(400)
      .json({ message: "Não é possível criar conversa consigo mesmo." });
  }

  try {
    // Buscar conversas onde os dois usuários participam
    const conversations = await Conversation.findAll({
      include: {
        model: User,
        where: {
          id: [userId, otherUserId],
        },
        attributes: ["id"],
        through: { attributes: [] },
      },
    });

    // Verifica se existe conversa 1–1
    const existingConversation = conversations.find(
      (conv) => conv.users.length === 2
    );

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    // Criar nova conversa
    if (!otherUserId) {
      return res.status(400).json({
        message: "ID do outro usuário não informado",
      });
    }
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
