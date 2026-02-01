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
  Badge,
} from "@mui/material";
import { useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

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
  handleProfile,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { signOut } = useAuth();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("recent");

  const filteredConversations = conversations.filter((conversation) => {
    const otherUser = conversation.users.find((u) => u.id !== userId);
    const isFavorite = conversation.conversation_users?.[0]?.favorite;
    const userSearch =
      otherUser?.name?.toLowerCase().includes(search.toLowerCase()) ||
      otherUser?.email?.toLowerCase().includes(search.toLowerCase());

    if (!otherUser) return false;

    if (filter === "favorites") {
      return isFavorite && userSearch;
    }

    if (filter === "unread") {
      return conversation.unreadCount > 0 && userSearch;
    }

    return userSearch;
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
        width: isMobile ? "85%" : 400,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMobile ? "85%" : 400,
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
              <Box
                display="flex"
                gap={2}
                alignItems="center"
                justifyContent="center"
                onClick={() => handleProfile()}
              >
                <Avatar src={user ? user.avatar : "?"} />
                <Box>
                  <Box display="flex" gap={1}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      alignItems="center"
                      noWrap
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      maxWidth={isMobile ? 150 : 230}
                    >
                      {user.name}
                    </Typography>
                    <EditIcon fontSize="small" color="primary" />
                  </Box>

                  <Typography
                    variant="body2"
                    noWrap
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    width={isMobile ? 150 : 250}
                  >
                    {user.email}
                  </Typography>
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

              <IconButton
                onClick={() => onAddConversation()}
                color="primary"
                title="Adicionar nova conversa"
              >
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>

          <List>
            {filteredConversations.length === 0 && (
              <Typography variant="subtitle1" textAlign="center">
                Nenhuma conversa encontrada
              </Typography>
            )}
            {filteredConversations.map((conversation) => {
              const otherUser = conversation.users.find((u) => u.id !== userId);
              const isSelected = selectedConversation?.id === conversation.id;
              const lastMessage = conversation.messages?.[0];

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
                    <Badge
                      color="primary"
                      badgeContent={conversation.unreadCount}
                      invisible={!conversation.unreadCount}
                    >
                      <Avatar src={otherUser?.avatar} />
                    </Badge>

                    <Box
                      display="flex"
                      flexDirection="column"
                      width={isMobile ? 200 : 300}
                    >
                      <Typography
                        variant="subtitle1"
                        noWrap
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        width={isMobile ? 200 : 300}
                      >
                        {otherUser?.name || "Usuário"}
                      </Typography>
                      <Typography
                        variant="caption"
                        noWrap
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {lastMessage ? lastMessage.content : ""}
                      </Typography>
                    </Box>
                  </Box>
                </ListItemButton>
              );
            })}
          </List>
        </Box>
        <Box display="flex" justifyContent="center">
          <ToggleButtonGroup
            color="primary"
            value={filter}
            exclusive
            onChange={(_, value) => {
              if (value) setFilter(value);
            }}
            aria-label="Platform"
            sx={{ margin: 2, width: "100%" }}
          >
            <ToggleButton
              value="recent"
              sx={{ textTransform: "none", width: "100%" }}
            >
              Recentes
            </ToggleButton>
            <ToggleButton
              value="unread"
              sx={{ textTransform: "none", width: "100%" }}
            >
              Não Lidos
            </ToggleButton>
            <ToggleButton
              value="favorites"
              sx={{ textTransform: "none", width: "100%" }}
            >
              Favoritos
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Drawer>
  );
}
