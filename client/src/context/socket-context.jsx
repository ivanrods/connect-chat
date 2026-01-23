import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL;
const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

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

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSocket() {
  return useContext(SocketContext);
}
