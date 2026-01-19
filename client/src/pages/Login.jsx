import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../lib/schemas/auth-schema";
import { Lock, Mail, MessagesSquare, SendHorizonalIcon } from "lucide-react";

import InputForm from "../components/inputForm";
import ButtonForm from "../components/buttonForm";
import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Login = () => {
  const { signIn } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      sx={{
        height: "100vh",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", maxWidth: 600, padding: 4 }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button>
                <MessagesSquare size={32} />
              </Button>

              <Typography variant="h4" fontWeight="bold">
                ConnectChat
              </Typography>
            </Box>
            <Typography variant="body1" textAlign="center">
              Envie mensagem em tempo real de forma facil
            </Typography>
          </Box>

          <Typography variant="h5" fontWeight="bold">
            Faça seu login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              type="email"
              placeholder="E-mail"
              icon={<Mail size={18} />}
              {...register("email")}
              error={errors.email}
              helperText={errors.email?.message}
            />

            <InputForm
              type="password"
              placeholder="Senha"
              icon={<Lock size={18} />}
              {...register("password")}
              error={errors.password}
              helperText={errors.password?.message}
            />

            <ButtonForm
              text="Entrar"
              variant="contained"
              icon={
                <SendHorizonalIcon sx={{ color: "white", display: "block" }} />
              }
            />
          </form>
          <Typography variant="body2" textAlign="center" mt={2}>
            <Link to="/register" style={{ color: "#22c55e" }}>
              Registrar
            </Link>
          </Typography>
        </Paper>
      </Box>
      {!isMobile && (
        <Box
          component="img"
          src="background.jpg"
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "none",
            width: "100%",
          }}
        />
      )}
    </Box>
  );
};

export default Login;
