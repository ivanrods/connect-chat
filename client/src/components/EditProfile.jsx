import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  CircularProgress,
  InputAdornment,
  Avatar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../lib/schemas/auth-schema";
import { useAlert } from "../context/alert-context";

export function EditProfile({ open, onClose, updateProfile, user, loading }) {
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      showAlert("Perfil atualizado", "success");
      onClose();
    } catch (error) {
      showAlert(error?.message || "Erro ao atualiz perfil", "error");
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Editar Perfil</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          <Avatar sx={{ width: 130, height: 130 }} src={user.avatar} />

          <Box
            component="form"
            display="flex"
            flexDirection="column"
            width="100%"
            gap={2}
            mt={1}
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
            <Typography variant="caption">
              Seu perfil ajuda as pessoas a reconhecerem você
            </Typography>
            <Box display="flex" justifyContent="end">
              <Button
                type="submit"
                size="large"
                variant="contained"
                disabled={loading}
                sx={{
                  fontWeight: "600",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
