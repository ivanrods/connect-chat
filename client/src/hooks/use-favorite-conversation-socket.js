import { useEffect } from "react";
import { useSocket } from "../context/socket-context";

export function useFavoriteSocket(onFavoriteUpdate) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("toggleFavorite", onFavoriteUpdate);

    return () => {
      socket.off("toggleFavorite", onFavoriteUpdate);
    };
  }, [socket, onFavoriteUpdate]);
}
