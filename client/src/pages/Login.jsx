import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../lib/schemas/auth-schema";
import { Lock, Mail, MessagesSquare } from "lucide-react";
import styles from "../styles/Login.module.css";
import InputForm from "../components/inputForm";

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
    <div className={styles.login}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.logo}>
          <MessagesSquare />
          <h1>ConnectChat</h1>
        </div>
        <div>
          <InputForm
            {...register("email")}
            type="email"
            placeholder="E-mail"
            icon={<Mail />}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <InputForm
            {...register("password")}
            type="password"
            placeholder="Senha"
            icon={<Lock />}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <button type="submit">Entrar</button>
          <Link to="/register">Registrar</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
