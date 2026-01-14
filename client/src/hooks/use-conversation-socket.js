import { useEffect } from "react";
import { useSocket } from "../context/socket-context";

export function useConversationSocket(conversationId, onMessage) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !conversationId) return;

    const room = `conversation_${conversationId}`;

    socket.emit("joinConversation", conversationId);

    socket.on("newMessage", onMessage);

    return () => {
      socket.off("newMessage", onMessage);
      socket.emit("leaveConversation", conversationId);
    };
  }, [socket, conversationId]);
}
