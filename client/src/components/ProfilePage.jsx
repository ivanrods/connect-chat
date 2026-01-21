import {
  Avatar,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import InputForm from "./inputForm";

import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfilePage = ({ signOut, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const profileRef = useRef("");

  //fecha ao clicar fora do componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return <LinearProgress />;
  }

  return (
    <div>
      <Box
        onClick={() => setIsOpen(!isOpen)}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <Avatar
          src={
            user
              ? user.avatar
              : "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=user"
          }
        />
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Box>
      </Box>

      {isOpen && (
        <Box position="absolute" left={8} ref={profileRef} zIndex={2}>
          <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar src={user ? user.avatar : ""} />
              <InputForm
                type="text"
                placeholder="Nome"
                value={user.name}
                icon={<PersonIcon size={18} />}
              />
              <InputForm
                type="email"
                placeholder={user.email}
                value={user.email}
                icon={<MailIcon size={18} />}
              />

              <Button
                type="submit"
                size="large"
                variant="contained"
                fullWidth
                endIcon={<LogoutIcon />}
                onClick={() => signOut()}
                sx={{
                  fontWeight: "600",
                  mt: 2,
                  color: "white",
                }}
              >
                Sair
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  );
};

export default ProfilePage;
