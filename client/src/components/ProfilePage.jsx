import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import InputForm from "./inputForm";
import { LogOut, Mail, User } from "lucide-react";
import ButtonForm from "./buttonForm";

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
    return <p>Carregando</p>;
  }

  return (
    <div>
      <Box
        onClick={() => setIsOpen(!isOpen)}
        display="flex"
        alignItems="center"
        gap={1}
        padding={2}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={user ? user.avatar : ""}
                sx={{
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                }}
              />
              <InputForm
                type="text"
                placeholder="Nome"
                value={user.name}
                icon={<User size={18} />}
              />
              <InputForm
                type="email"
                placeholder={user.email}
                value={user.email}
                icon={<Mail size={18} />}
              />

              <ButtonForm
                text="Sair"
                variant="contained"
                onClick={() => signOut()}
                icon={<LogOut />}
              />
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  );
};

export default ProfilePage;
