import { ConversationUser } from "../models/index.js";
import { getIO } from "../config/socket.js";

export const toggleFavorite = async (req, res) => {
  const userId = req.user.id;
  const { id: conversationId } = req.params;

  try {
    const relation = await ConversationUser.findOne({
      where: { userId, conversationId },
    });

    if (!relation) {
      return res.status(404).json({ message: "Conversa não encontrada" });
    }

    relation.favorite = !relation.favorite;
    await relation.save();

    res.json({ favorite: relation.favorite });
    const io = getIO();

    io.emit("toggleFavorite", {
      conversationId,
      favorite: relation.favorite,
      userId,
    });

    return res.json({ favorite: relation.favorite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao favoritar conversa" });
  }
};
