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

      if (!res.ok) {
        throw new Error("Erro ao criar conversa");
      }

      const conversation = await res.json();

      setConversations((prev) => {
        const exists = prev.some((c) => c.id === conversation.id);
        if (exists) return prev;
        return [conversation, ...prev];
      });

      return conversation;
    } catch (err) {
      console.error("Erro ao criar conversa:", err);
      setError(err.message);
      throw err;
    }
  };

  return {
    conversations,
    loading,
    error,
    createConversation,
    refetch: fetchConversations,
  };
}
