export function useCreateConversation() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const createConversation = async (email) => {
    const res = await fetch(`${apiUrl}/api/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }

    return res.json();
  };

  return { createConversation };
}
