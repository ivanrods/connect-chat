const apiUrl = import.meta.env.VITE_API_URL;

export function useSendMessage(conversationId) {
  const sendMessage = async (content) => {
    if (!content.trim()) return;

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

    return await res.json();
  };

  return { sendMessage };
}
