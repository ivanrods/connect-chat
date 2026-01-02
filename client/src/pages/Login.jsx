import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../lib/schemas/auth-schema";
import { Lock, Mail, MessagesSquare } from "lucide-react";

import InputForm from "../components/inputForm";
import ButtonForm from "../components/buttonForm";
import { Box, Paper, Typography } from "@mui/material";

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
    } catch (error) {
      return alert(error.message);
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
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
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

          <ButtonForm text="Entrar" />

          <Typography variant="body2" textAlign="center" mt={2}>
            <Link to="/register" style={{ color: "#1d4ed8" }}>
              Registrar
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
