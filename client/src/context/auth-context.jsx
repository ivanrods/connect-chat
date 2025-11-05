import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  async function signIn({ email, password }) {
    const response = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Erro no login");
    }
    const data = await response.json();

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    setUser(data.user);
  }

  function signOut() {}

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
