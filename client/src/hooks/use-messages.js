import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export function useMessages(conversationId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${apiUrl}/api/conversations/${conversationId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (!res.ok) throw new Error("Erro ao buscar mensagens");

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  return { messages, setMessages, loading, error };
}

export function useSendMessage(conversationId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${apiUrl}/api/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content }),
        },
      );

      if (!res.ok) throw new Error("Erro ao enviar mensagem");

      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
}
