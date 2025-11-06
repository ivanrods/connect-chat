import { useEffect, useState } from "react";

export function useChat() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await fetch("http://localhost:3333/chat", {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();

        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChat();
  }, []);
  return { messages };
}
