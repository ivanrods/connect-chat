import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useState } from "react";
const Login = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    await signIn({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Entrar</button>
      <Link to="/register">Registrar</Link>
    </form>
  );
};

export default Login;
