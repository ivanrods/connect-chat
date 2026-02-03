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

  const sendMessage = async ({ content = "", image = null }) => {
    if (!content.trim() && !image) return;

    const formData = new FormData();
    if (content) formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${apiUrl}/api/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        },
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erro ao enviar mensagem");
      }

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
