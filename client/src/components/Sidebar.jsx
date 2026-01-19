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
} from "@mui/material";
import InputForm from "./SearchInput";
import { CirclePlus } from "lucide-react";
import ProfilePage from "./ProfilePage";
import { useAuth } from "../context/auth-context";
import { useUser } from "../hooks/use-profile";
import { useState } from "react";

export function Sidebar({
  open,
  onClose,
  conversations,
  loading,
  selectedConversation,
  setSelectedConversation,
  userId,
  onAddConversation,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { signOut } = useAuth();
  const { user } = useUser();

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
    return <div>Carregando...</div>;
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
      <ProfilePage signOut={signOut} user={user} />
      <Box display="flex" padding={2} sx={{ alignItems: "center" }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Busque por nome ou email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <IconButton onClick={() => onAddConversation()}>
          <CirclePlus size={35} color="#22c55e" />
        </IconButton>
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
                bgcolor: isSelected ? "rgba(255,255,255,0.12)" : "transparent",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Avatar src={otherUser?.avatar} />
                <Typography variant="subtitle1">
                  {otherUser?.name || "Usuário"}
                </Typography>
              </Box>
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}
