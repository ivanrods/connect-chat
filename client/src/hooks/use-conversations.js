import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export function useConversations() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  //  GET conversations
  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/conversations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setConversations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE conversation
  const createConversation = async (otherUserId) => {
    try {
      const res = await fetch(`${apiUrl}/api/conversations/${otherUserId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const conversation = await res.json();

      // evita duplicar conversa
      setConversations((prev) => {
        const exists = prev.find((c) => c.id === conversation.id);
        if (exists) return prev;
        return [conversation, ...prev];
      });

      return conversation;
    } catch (err) {
      console.error("Erro ao criar conversa:", err);
    }
  };

  return {
    conversations,
    loading,
    createConversation,
    refetch: fetchConversations,
  };
}
