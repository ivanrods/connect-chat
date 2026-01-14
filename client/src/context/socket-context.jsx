import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/auth-context";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const socketRef = useRef(null);
  const { user, token } = useAuth();

  useEffect(() => {
    if (!user || socketRef.current) return;

    socketRef.current = io("http://localhost:3333", {
      auth: {
        token,
      },
    });

    socketRef.current.on("connect", () => {
      console.log("🔌 Socket conectado:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Socket desconectado");
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [user, token]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
