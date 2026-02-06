import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  InputAdornment,
  Avatar,
  Typography,
  IconButton,
  Backdrop,
  Card,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../lib/schemas/auth-schema";
import { useAlert } from "../context/alert-context";
import React, { useEffect, useState } from "react";
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
  const [openDeleteUser, setOpenDeleteUser] = React.useState(false);
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
      const res = await updateProfile(data);
      if (avatarFile) {
        await updateAvatar(avatarFile);
      }
      await refetchUser();
      onClose();
      showAlert(res.message, "success");
    } catch (error) {
      showAlert(error.message, "error");
    }
  };

  const handleDeleteUser = async (data) => {
    try {
      const res = await deleteUser(data);
      navigate("/login");
      showAlert(res.message, "success");
    } catch (error) {
      showAlert(error.message, "error");
    }
  };

  const handleCloseDeleteUser = () => {
    setOpenDeleteUser(false);
  };
  const handleOpenDeleteUser = () => {
    setOpenDeleteUser(true);
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
              <Button
                onClick={handleOpenDeleteUser}
                color="error"
                size="small"
                sx={{
                  textTransform: "none",
                }}
              >
                Deletar conta
              </Button>
              <Backdrop
                sx={(theme) => ({
                  zIndex: theme.zIndex.drawer + 1,
                })}
                open={openDeleteUser}
                onClick={handleCloseDeleteUser}
              >
                <Card>
                  <Box
                    padding={2}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    maxWidth="sm"
                  >
                    <Typography variant="h6">
                      Você tem certeza absoluta?
                    </Typography>
                    <Typography>
                      Esta ação não pode ser desfeita. Isso excluirá
                      permanentemente sua conta e removerá seus dados de nossos
                      servidores.
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleDeleteUser}
                      sx={{
                        fontWeight: "600",
                        color: "white",
                        textTransform: "none",
                      }}
                    >
                      Confirmar exclusão
                    </Button>
                  </Box>
                </Card>
              </Backdrop>

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
