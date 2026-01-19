import { Box, Avatar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export function ChatHeader({ conversation, userId, onMenuClick }) {
  if (!conversation) return null;

  const otherUser = conversation.users.find((user) => user.id !== userId);

  return (
    <Box
      sx={{
        p: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Botão menu (mobile) */}
      {onMenuClick && (
        <IconButton
          onClick={onMenuClick}
          sx={{ color: "#737373", display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Avatar src={otherUser.avatar} />
      <Typography variant="body1" sx={{ color: "text.primary" }}>
        {otherUser?.name || "Usuário"}
      </Typography>
    </Box>
  );
}
