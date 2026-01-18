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
} from "@mui/material";
import InputForm from "./SearchInput";
import { CirclePlus } from "lucide-react";
import ProfilePage from "./ProfilePage";
import { useAuth } from "../context/auth-context";
import { useUser } from "../hooks/use-profile";

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
      <Box display="flex" padding={2}>
        <InputForm />
        <IconButton onClick={() => onAddConversation()}>
          <CirclePlus size={35} />
        </IconButton>
      </Box>

      <List>
        {conversations.map((conversation) => {
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
                <Typography>{otherUser?.name || "Usuário"}</Typography>
              </Box>
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}
