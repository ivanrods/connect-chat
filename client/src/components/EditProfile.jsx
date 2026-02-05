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
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../lib/schemas/auth-schema";
import { useAlert } from "../context/alert-context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function EditProfile({
  open,
  onClose,
  updateProfile,
  updateAvatar,
  user,
  refetchUser,
  deleteUser,
  loading,
  onOpenImage,
}) {
  const { showAlert } = useAlert();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const navigate = useNavigate();

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

  function handleAvatarChange(e) {
    const file = e.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      showAlert("Imagem muito grande (máx 2MB)", "warning");
      return;
    }

    if (!file) return;

    setAvatarFile(file);

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  }

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      if (avatarFile) {
        await updateAvatar(avatarFile);
      }
      await refetchUser();
      onClose();
      showAlert("Perfil atualizado", "success");
    } catch (error) {
      showAlert(error?.message || "Erro ao atualiz perfil", "error");
    }
  };
  const handleDeleteUser = () => {
    deleteUser();
    navigate("/login");
    showAlert("Usuário deletado com sucesso", "success");
  };

  useEffect(() => {
    if (!open) {
      setAvatarFile(null);
      setAvatarPreview(user.avatar);
    }
  }, [open, user.avatar]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Editar Perfil</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          <Box position="relative">
            <Avatar
              src={avatarPreview}
              sx={{ width: 130, height: 130 }}
              onClick={() => onOpenImage(avatarPreview)}
            />

            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 4,
                right: 4,
                backgroundColor: "white",
                boxShadow: 2,
                "&:hover": {
                  backgroundColor: "#ddd",
                },
              }}
            >
              <CameraAltIcon color="primary" fontSize="small" />

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </IconButton>
          </Box>

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
            <Box display="flex" justifyContent="space-between">
              <Button variant="text" color="error" onClick={handleDeleteUser}>
                Deletar conta
              </Button>
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
