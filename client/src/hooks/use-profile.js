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

  const updateUser = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        throw new Error("Usuário não autenticado");
      }

      const parsedUser = JSON.parse(storedUser);

      const res = await fetch(`${apiUrl}/api/user/${parsedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao atualizar perfil");
      }

      const updatedUser = await res.json();

      setUser(updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (file) => {
    try {
      setLoading(true);
      setError(null);

      if (!file) {
        throw new Error("Nenhuma imagem selecionada");
      }

      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        throw new Error("Usuário não autenticado");
      }

      const parsedUser = JSON.parse(storedUser);

      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`${apiUrl}/api/user/${parsedUser.id}/avatar`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao enviar avatar");
      }

      const data = await res.json();

      const updatedUser = {
        ...user,
        avatar: data.avatar,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return data;
    } catch (err) {
      console.error("Erro ao enviar avatar:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
    uploadAvatar,
  };
}
