import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../lib/schemas/auth-schema";

const Login = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signIn(data);
      navigate("/chat");
    } catch (err) {
      console.error(err);
      return alert("Erro ao entrar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <input {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Entrar</button>
      <Link to="/register">Registrar</Link>
    </form>
  );
};

export default Login;
