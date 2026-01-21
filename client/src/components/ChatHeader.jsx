import { Box, Avatar, Typography, IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

export function ChatHeader({ conversation, userId, onMenuClick }) {
  if (!conversation) return null;

  const otherUser = conversation.users.find((user) => user.id !== userId);

  return (
    <Box
      padding={1.5}
      display="flex"
      alignItems="center"
      gap={2}
      borderBottom={"1px solid #ddd"}
    >
      {onMenuClick && (
        <IconButton onClick={onMenuClick} sx={{ display: { md: "none" } }}>
          <MenuIcon />
        </IconButton>
      )}
      <Avatar src={otherUser.avatar} />
      <Typography variant="subtitle1">
        {otherUser?.name || "Usuário"}
      </Typography>
    </Box>
  );
}
