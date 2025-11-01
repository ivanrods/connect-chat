import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
const Login = () => {
  const { signIn } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    signIn();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="" id="" />
      <input type="password" name="" id="" />
      <button type="submit">Entrar</button>
      <Link to="/register">Registrar</Link>
    </form>
  );
};

export default Login;
