import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useProfile } from "../hooks/use-profile";

const apiUrl = import.meta.env.VITE_API_URL;
const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { user } = useProfile();

  // 1️⃣ Conecta o socket
  useEffect(() => {
    const socketInstance = io(apiUrl, {
      withCredentials: true,
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // 2️⃣ Entra na sala do usuário (ESSENCIAL)
  useEffect(() => {
    if (!socket || !user?.id) return;

    socket.emit("joinUser", user.id);
    console.log("🟢 joinUser emitido:", user.id);
  }, [socket, user?.id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSocket() {
  return useContext(SocketContext);
}
