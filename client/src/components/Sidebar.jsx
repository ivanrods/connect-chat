import {
  Drawer,
  List,
  ListItemButton,
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InputForm from "./SearchInput";

export function Sidebar({
  open,
  onClose,
  conversations,
  loading,
  selectedConversation,
  setSelectedConversation,
  userId,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      <InputForm />
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
                <Typography
                  fontWeight="bold"
                  sx={{
                    borderBottom: "1px solid #ddd",
                    width: "100%",
                    padding: 2,
                  }}
                >
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
