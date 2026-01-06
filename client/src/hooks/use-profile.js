import { useEffect, useState } from "react";

export function useUser(id) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `http://localhost:3333/user/${id}`,

          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, [id]);

  return { user, loading };
}
