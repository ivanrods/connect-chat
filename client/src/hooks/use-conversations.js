import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export function useConversations() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Conversations = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/conversations`,

          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        setConversations(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    Conversations();
  }, []);
  return { conversations, loading };
}
