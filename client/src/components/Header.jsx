import { MessagesSquare } from "lucide-react";
import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import Profile from "./Profile";

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar sx={{ maxWidth: 750, width: "100%", mx: "auto" }} disableGutters>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          flexGrow={1}
          color="primary"
        >
          <IconButton>
            <MessagesSquare style={{ color: "#1d4ed8" }} />
          </IconButton>

          <Typography variant="h6" fontWeight="bold" color="primary">
            ConnectChat
          </Typography>
        </Box>

        <Profile />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
