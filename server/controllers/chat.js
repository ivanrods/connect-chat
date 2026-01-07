import User from "../models/user.js";
import Chat from "../models/chat.js";
import { chatSchema } from "../schemas/chat-schema.js";
import { getIO } from "../config/socket.js";

export const getChat = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  try {
    const { rows, count } = await Chat.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    rows.reverse();
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      messages: rows,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        perPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar mensagens." });
  }
};

export const createChat = async (req, res) => {
  const { id } = req.user;
  const { message, file } = chatSchema.parse(req.body);

  try {
    const user = await User.findByPk(id);
    const newMessage = await Chat.create({
      user: user.email,
      avatar: user.avatar,
      message,
      file,
    });

    const io = getIO();
    io.emit("newMessage", newMessage);
    res.status(201).json({ message: "Sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao salvar mensagem." });
  }
};

export const createUpload = async (req, res) => {
  const { id } = req.user;
  if (req.file) {
    const { message } = req.body;
    const filename = req.file.filename;

    try {
      const user = await User.findByPk(id);
      const newMessage = await Chat.create({
        user: user.email,
        message,
        file: filename,
        avatar: user.avatar,
      });

      const io = getIO();
      io.emit("newMessage", newMessage);
      res.status(201).json({ message: "Sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao salvar mensagem." });
    }

    console.log(`Arquivo enviado: ${filename}`);
  } else {
    res.status(400).json({ error: "Nenhum arquivo enviado" });
  }
};
