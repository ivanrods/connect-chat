import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const drawerWidth = 280;

export function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
      {/* HEADER */}

      {/* LISTA DE CHATS */}
      <List>
        {["Maria", "João", "Carlos", "Ana"].map((chat) => (
          <ListItemButton
            key={chat}
            sx={{
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
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                width: "100%",
              }}
            >
              <Avatar />
              <Typography fontWeight="bold">{chat}</Typography>
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
