import { useEffect, useState } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:3333", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export function useGetChat(page, limit) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/chat?page=${page}&limit=${limit}`,

          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        setMessages(data.messages || []);
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
  return { messages };
}

export function usePostChat() {
  const postMessage = async (message) => {
    try {
      const response = await fetch("http://localhost:3333/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };
  return { postMessage };
}
