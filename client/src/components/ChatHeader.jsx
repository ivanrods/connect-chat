import { Box, Avatar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export function ChatHeader({ conversation, userId, onMenuClick }) {
  if (!conversation) return null;

  const otherUser = conversation.users.find((user) => user.id !== userId);

  return (
    <Box
      sx={{
        height: 64,
        px: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderBottom: "1px solid #262626",
        bgcolor: "#0f0f0f",
      }}
    >
      {/* Botão menu (mobile) */}
      {onMenuClick && (
        <IconButton
          onClick={onMenuClick}
          sx={{ color: "#fff", display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Avatar src={otherUser?.avatar} />

      <Typography fontWeight="bold">{otherUser?.name || "Usuário"}</Typography>
    </Box>
  );
}
