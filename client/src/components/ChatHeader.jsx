import {
  Box,
  Avatar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

export function ChatHeader({
  conversation,
  userId,
  onMenuClick,
  onToggleFavorite,
  onOpenImage,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

        <Avatar
          src={otherUser.avatar}
          onClick={() => onOpenImage(otherUser.avatar)}
        />
        <Typography
          variant="subtitle1"
          noWrap
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          maxWidth={isMobile ? 200 : "100%"}
        >
          {otherUser?.name || "Usuário"}
        </Typography>
      </Box>

      <IconButton
        size="small"
        title="Adicionar aos favitos"
        onClick={() => {
          onToggleFavorite(conversation.id);
        }}
      >
        {isFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
      </IconButton>
    </Box>
  );
}
