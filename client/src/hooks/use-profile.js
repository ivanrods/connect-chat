import { useEffect, useState } from "react";

export function useUser() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storedUser = localStorage.getItem("user");
  const userParsed = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const getUser = async () => {
      if (!userParsed?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/user/${userParsed.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, loading };
}
