import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../lib/schemas/auth-schema";

import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import ForumIcon from "@mui/icons-material/Forum";
import SendIcon from "@mui/icons-material/Send";

const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
    <Box display="flex" height="100vh">
      {!isMobile && (
        <Box
          component="img"
          src="background.jpg"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          width="100%"
          sx={{
            objectFit: "none",
          }}
        />
      )}
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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <ForumIcon fontSize="large" color="primary" />

              <Typography variant="h4" fontWeight="bold">
                ConnectChat
              </Typography>
            </Box>
            <Typography variant="body1" textAlign="center">
              Envie mensagem em tempo real de forma facil
            </Typography>
          </Box>

          <Typography variant="h5" fontWeight="bold">
            Faça seu registro
          </Typography>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            width="100%"
            gap={2}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              type="text"
              placeholder="Nome"
              error={errors.name}
              helperText={errors.name?.message}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                },
              }}
              {...register("name")}
            />
            <TextField
              type="email"
              placeholder="E-mail"
              error={errors.email}
              helperText={errors.email?.message}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                },
              }}
              {...register("email")}
            />

            <TextField
              type="password"
              placeholder="Senha"
              error={errors.password}
              helperText={errors.password?.message}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                },
              }}
              {...register("password")}
            />

            <Button
              type="submit"
              size="large"
              variant="contained"
              endIcon={<SendIcon />}
              fullWidth
              sx={{
                fontWeight: "600",

                color: "white",
              }}
            >
              Registrar
            </Button>
          </Box>
          <Typography variant="body2" textAlign="center" mt={2}>
            <Link to="/login" style={{ color: "#22c55e" }}>
              Entrar
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
