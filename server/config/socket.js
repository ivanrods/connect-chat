import { Server } from "socket.io";
import "dotenv/config";

let io;

export function setupSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Usuário conectado:", socket.id);

    socket.on("joinUser", (userId) => {
      socket.join(`user_${userId}`);
      console.log(`Usuário ${userId} entrou na sala user_${userId}`);
    });

    socket.on("joinConversation", (conversationId) => {
      socket.join(`conversation_${conversationId}`);
    });

    socket.on("leaveConversation", (conversationId) => {
      socket.leave(`conversation_${conversationId}`);
    });

    socket.on("disconnect", () => {
      console.log("Usuário desconectado:", socket.id);
    });
  });
}

export function getIO() {
  if (!io) throw new Error("Socket não inicializado");
  return io;
}
