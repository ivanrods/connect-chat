const apiUrl = import.meta.env.VITE_API_URL;

export function useSendMessage(conversationId, setMessages) {
  const sendMessage = async (content) => {
    if (!content.trim()) return;

    try {
      const res = await fetch(
        `${apiUrl}/api/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content }),
        }
      );

      const message = await res.json();

      //remover
      setMessages((prev) => [...prev, message]);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  return { sendMessage };
}
