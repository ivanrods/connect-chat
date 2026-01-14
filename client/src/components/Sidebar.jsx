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

const drawerWidth = 280;

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
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#171717",
          color: "#fff",
        },
      }}
    >
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
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1,
                  width: "100%",
                }}
              >
                <Avatar src={otherUser?.avatar} />
                <Typography fontWeight="bold">
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
