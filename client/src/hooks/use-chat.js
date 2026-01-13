import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import { io } from "socket.io-client";

const socket = io(`${apiUrl}`, {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export function useGetChat(page, limit) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/chat?page=${page}&limit=${limit}`,

          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        setMessages(data.messages || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getMessage();
    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [page, limit]);
  return { messages, loading };
}

export function usePostChat() {
  const postMessage = async ({ message, file }) => {
    try {
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message, file }),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  return { postMessage };
}
