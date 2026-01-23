import { Conversation, User, ConversationUser } from "../models/index.js";
import { Op, Sequelize } from "sequelize";

//Criar ou recuperar uma conversa 1–1

export const getOrCreateConversation = async (req, res) => {
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

    //  Buscar todas as conversas do usuário logado
    const conversations = await Conversation.findAll({
      include: {
        model: User,
        where: { id: userId },
        through: { attributes: [] },
      },
    });

    // Verificar se alguma conversa já tem o outro usuário
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

    // Criar nova conversa
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

//Listar todas as conversas do usuário logado

export const getUserConversations = async (req, res) => {
  const userId = req.user.id;

  try {
    const conversations = await Conversation.findAll({
      include: [
        {
          model: ConversationUser,
          where: { userId },
          attributes: [],
        },
        {
          model: User,
          attributes: ["id", "name", "avatar"],
          through: { attributes: [] },
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erro ao buscar conversas.",
      error: err.message,
    });
  }
};
