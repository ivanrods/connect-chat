import { useEffect } from "react";
import { useSocket } from "../context/socket-context";

export function useConversationSocket(conversationId, onNewMessage) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.emit("joinConversation", conversationId);

    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("newMessage", onNewMessage);
    };
  }, [socket, conversationId, onNewMessage]);
}
