import { Box, IconButton, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import InputForm from "./inputForm";
import { useAuth } from "../context/auth-context";
import { LogOut, Mail, User } from "lucide-react";
import ButtonForm from "./buttonForm";
import { useUser } from "../hooks/use-profile";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  const { user, loading } = useUser(userId);
  if (loading) {
    <div>carregando</div>;
  }

  return (
    <div>
      <Box
        component="img"
        position="relative"
        onClick={() => setIsOpen(!isOpen)}
        src={
          user
            ? user.avatar
            : "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=user"
        }
        sx={{
          borderRadius: "50%",
          width: 30,
          height: 30,
          mx: 1,
        }}
      />

      {isOpen && (
        <Box position="absolute" right={4}>
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
                label="Nome"
                type="text"
                placeholder="Nome"
                value={user.name}
                icon={<User size={18} />}
              />
              <InputForm
                label="E-mail"
                type="email"
                placeholder={user.email}
                value={user.email}
                icon={<Mail size={18} />}
              />

              <ButtonForm
                text="Sair"
                variant="outlined"
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

export default Profile;
