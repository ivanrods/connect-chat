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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

export function ChatHeader({
  conversation,
  userId,
  onMenuClick,
  onDelete,
  onToggleFavorite,
  onOpenImage,
  loadingFavorite,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  if (!conversation) return null;

  const otherUser = conversation.users.find((user) => user.id !== userId);
  const isFavorite = conversation.favorite ?? false;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

      <Box>
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  width: "20ch",
                },
              },
              list: {
                "aria-labelledby": "long-button",
              },
            }}
          >
            <MenuItem
              size="small"
              title="Adicionar aos favitos"
              disabled={loadingFavorite}
              onClick={() => {
                onToggleFavorite(conversation.id);
              }}
            >
              {isFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />}{" "}
              Favoritar
            </MenuItem>

            <MenuItem
              onClick={() => {
                onDelete(conversation.id);
              }}
            >
              <DeleteOutlineIcon color="error" /> Apagar
            </MenuItem>
          </Menu>
        </div>
      </Box>
    </Box>
  );
}
