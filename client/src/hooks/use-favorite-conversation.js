export function useFavoriteConversation() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const toggleFavorite = async (conversationId) => {
    const res = await fetch(
      `${apiUrl}/api/conversations/${conversationId}/favorite`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Erro ao favoritar conversa");
    }

    return res.json();
  };

  return { toggleFavorite };
}
