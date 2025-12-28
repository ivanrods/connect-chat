import { useAuth } from "../context/auth-context";
import { MessagesSquare, LogOut } from "lucide-react";
import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";

const Header = () => {
  const { signOut } = useAuth();

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar sx={{ maxWidth: 750, width: "100%", mx: "auto" }}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          flexGrow={1}
          color="primary"
        >
          <MessagesSquare style={{ color: "#1d4ed8" }} />
          <Typography variant="h6" fontWeight="bold" color="primary">
            ConnectChat
          </Typography>
        </Box>

        <IconButton onClick={signOut} color="default" aria-label="Sair">
          <LogOut />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
