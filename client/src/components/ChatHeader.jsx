import { Box, Avatar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

export function ChatHeader({
  conversation,
  userId,
  onMenuClick,
  onToggleFavorite,
}) {
  if (!conversation) return null;

  const otherUser = conversation.users.find((user) => user.id !== userId);
  const isFavorite = conversation.conversation_users?.[0]?.favorite;

  return (
    <Box
      padding={1.5}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      borderBottom={"1px solid #ddd"}
    >
      <Box display="flex" alignItems="center" gap={2}>
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

      <IconButton
        size="small"
        onClick={() => {
          onToggleFavorite(conversation.id);
        }}
      >
        {isFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
      </IconButton>
    </Box>
  );
}
