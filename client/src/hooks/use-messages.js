import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export function useMessages(conversationId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${apiUrl}/api/conversations/${conversationId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Erro ao buscar mensagens:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  return { messages, setMessages, loading };
}
