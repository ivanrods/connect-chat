import {
  Drawer,
  List,
  ListItemButton,
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  TextField,
  LinearProgress,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

import { useAuth } from "../context/auth-context";

export function Sidebar({
  open,
  onClose,
  conversations,
  loading,
  selectedConversation,
  setSelectedConversation,
  user,
  userId,
  onAddConversation,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { signOut } = useAuth();

  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((conversation) => {
    const otherUser = conversation.users.find((u) => u.id !== userId);

    if (!otherUser) return false;

    const searchLower = search.toLowerCase();

    return (
      otherUser.name?.toLowerCase().includes(searchLower) ||
      otherUser.email?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={onClose}
      sx={{
        width: 400,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 400,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Box>
          <Box display="flex" flexDirection="column" gap={2} padding={2}>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              justifyContent="space-between"
            >
              <Box display="flex" gap={2}>
                <Avatar src={user ? user.avatar : "?"} />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {user.name}
                  </Typography>
                  <Typography variant="body2">{user.email}</Typography>
                </Box>
              </Box>
              <IconButton onClick={() => signOut()} title="Sair">
                <LogoutIcon />
              </IconButton>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Busque por nome ou email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <IconButton onClick={() => onAddConversation()} color="primary">
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>

          <List>
            {filteredConversations.map((conversation) => {
              const otherUser = conversation.users.find((u) => u.id !== userId);

              const isSelected = selectedConversation?.id === conversation.id;

              return (
                <ListItemButton
                  key={conversation.id}
                  onClick={() => {
                    setSelectedConversation(conversation);
                    if (isMobile) onClose();
                  }}
                  sx={{
                    bgcolor: isSelected ? "#ddd" : "transparent",
                  }}
                >
                  <Box gap={2} display="flex" alignItems="center">
                    <Avatar src={otherUser?.avatar} />
                    <Typography variant="subtitle1" z>
                      {otherUser?.name || "Usuário"}
                    </Typography>
                  </Box>
                </ListItemButton>
              );
            })}
          </List>
        </Box>
        <Box display="flex" justifyContent="center">
          <ToggleButtonGroup
            color="primary"
            value="recentes"
            exclusive
            onChange={null}
            aria-label="Platform"
            sx={{ margin: 2 }}
          >
            <ToggleButton
              value="recentes"
              sx={{ textTransform: "none", px: 3 }}
            >
              Recentes
            </ToggleButton>
            <ToggleButton value="antigos" sx={{ textTransform: "none", px: 3 }}>
              Mais antigos
            </ToggleButton>
            <ToggleButton
              value="favoritos"
              sx={{ textTransform: "none", px: 3 }}
            >
              Favoritos
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Drawer>
  );
}
