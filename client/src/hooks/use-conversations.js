import { useEffect, useState, useCallback } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export function useConversations() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET conversations
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${apiUrl}/api/conversations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar conversas");
      }

      const data = await res.json();
      setConversations(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // CREATE conversation
  const createConversation = async (email) => {
    try {
      setError(null);

      const res = await fetch(`${apiUrl}/api/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao criar conversa");
      }

      const conversation = data;

      setConversations((prev) => {
        const exists = prev.some((c) => c.id === conversation.id);
        if (exists) return prev;
        return [conversation, ...prev];
      });

      return conversation;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateConversation = (newMessage) => {
    setConversations((prev) => {
      const updated = prev.map((conv) =>
        conv.id === newMessage.conversationId
          ? {
              ...conv,
              Messages: [newMessage],
              updatedAt: newMessage.createdAt,
            }
          : conv,
      );

      return updated.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
      );
    });
  };

  return {
    conversations,
    setConversations,
    loading,
    error,
    createConversation,
    refetch: fetchConversations,
    updateConversation,
  };
}
