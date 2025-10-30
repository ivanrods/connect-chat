import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
const Login = () => {
  const { signIn } = useAuth();

  return (
    <div>
      <input type="email" name="" id="" />
      <input type="password" name="" id="" />
      <Link to="/register">Registrar</Link>
    </div>
  );
};

export default Login;
