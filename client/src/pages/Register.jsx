import { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3333/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
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
      <button type="submit">Criar conta</button>
      <Link to="/login">Entrar</Link>
    </form>
  );
};

export default Register;
