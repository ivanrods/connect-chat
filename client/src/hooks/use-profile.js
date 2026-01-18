import { useEffect, useState } from "react";

export function useUser() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [load, setLoad] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (!parsedUser?.id) {
      setLoad(false);
      return;
    }

    fetch(`${apiUrl}/api/user/${parsedUser.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setUser)
      .finally(() => setLoad(false));
  }, []);

  return { user, load };
}
