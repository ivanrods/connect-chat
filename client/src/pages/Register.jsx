import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../lib/schemas/auth-schema";
import { MessagesSquare } from "lucide-react";
import styles from "../styles/Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3333/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao criar conta");
      }
      alert("Conta criada com sucesso!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.register}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.logo}>
          <MessagesSquare />
          <h1>ConnectChat</h1>
        </div>
        <div>
          <label>Nome:</label>
          <input {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label>Email:</label> <input {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Senha:</label> <input {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <button type="submit">Criar conta</button>
          <Link to="/login">Entrar</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
