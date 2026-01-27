import { useEffect } from "react";
import { useSocket } from "../context/socket-context";

export function useUnreadSocket(onUnread) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !onUnread) return;

    socket.on("unreadMessage", onUnread);

    socket.on("unreadMessage", (data) => {
      console.log("📩 unread recebido:", data);
    });

    return () => {
      socket.off("unreadMessage", onUnread);
    };
  }, [socket, onUnread]);
}
