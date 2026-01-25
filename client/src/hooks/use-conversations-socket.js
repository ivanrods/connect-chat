import { useEffect } from "react";
import { useSocket } from "../context/socket-context";

export function useConversationsSocket(onConversationUpdate) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("conversationUpdated", onConversationUpdate);

    return () => {
      socket.off("conversationUpdated", onConversationUpdate);
    };
  }, [socket, onConversationUpdate]);
}
