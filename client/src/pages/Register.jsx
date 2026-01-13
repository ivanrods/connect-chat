import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../lib/schemas/auth-schema";
import {
  Lock,
  Mail,
  MessagesSquare,
  SendHorizonalIcon,
  User,
} from "lucide-react";
import InputForm from "../components/inputForm";
import ButtonForm from "../components/buttonForm";
import { Box, Paper, Typography } from "@mui/material";

const apiUrl = import.meta.env.VITE_API_URL;

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
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.error || "Erro ao criar conta");
      }
      alert("Conta criada com sucesso!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#262626"
    >
      <Paper
        elevation={4}
        sx={{ p: 4, width: "100%", maxWidth: 400, margin: 2 }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          mb={3}
        >
          <MessagesSquare size={32} />
          <Typography variant="h5" fontWeight="bold">
            ConnectChat
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            label="Nome"
            type="text"
            placeholder="Nome"
            icon={<User size={18} />}
            {...register("name")}
            error={errors.name}
            helperText={errors.name?.message}
          />

          <InputForm
            label="E-mail"
            type="email"
            placeholder="E-mail"
            icon={<Mail size={18} />}
            {...register("email")}
            error={errors.email}
            helperText={errors.email?.message}
          />

          <InputForm
            label="Senha"
            type="password"
            placeholder="Senha"
            icon={<Lock size={18} />}
            {...register("password")}
            error={errors.password}
            helperText={errors.password?.message}
          />

          <ButtonForm
            text="Criar conta"
            variant="contained"
            icon={
              <SendHorizonalIcon sx={{ color: "white", display: "block" }} />
            }
          />

          <Typography variant="body2" textAlign="center" mt={2}>
            <Link to="/login" style={{ color: "#1d4ed8" }}>
              Entrar
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
