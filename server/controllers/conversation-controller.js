import { Conversation, User } from "../models/index.js";

export const getOrCreateConversation = async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.params;

  try {
    const existing = await Conversation.findOne({
      include: {
        model: User,
        where: { id: [userId, otherUserId] },
      },
      group: ["conversation.id"],
      having: sequelize.literal("COUNT(user.id) = 2"),
    });

    if (existing) return res.json(existing);

    const conversation = await Conversation.create();

    await conversation.addUsers([userId, otherUserId]);

    res.status(201).json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar conversa." });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.findAll({
      include: {
        model: User,
        where: { id: req.user.id },
        attributes: ["id", "name", "avatar"],
      },
      order: [["updatedAt", "DESC"]],
    });

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar conversas." });
  }
};
