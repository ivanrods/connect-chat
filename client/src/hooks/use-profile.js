import { useEffect, useState, useCallback } from "react";

export function useProfile() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        setUser(null);
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      const res = await fetch(`${apiUrl}/api/user/${parsedUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Não autorizado");
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      setUser(null);
      setError(err.message);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const updateUser = async () => {};

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    refetchUser: fetchUser,
    setUser,
    updateUser,
  };
}
