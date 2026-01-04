import { Box, IconButton, Paper } from "@mui/material";
import { useState } from "react";
import InputForm from "./inputForm";
import { useAuth } from "../context/auth-context";
import { LogOut, Mail, User } from "lucide-react";
import ButtonForm from "./buttonForm";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();

  return (
    <div>
      <Box
        component="img"
        position="relative"
        onClick={() => setIsOpen(!isOpen)}
        src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=teste"
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
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=teste"
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
                icon={<User size={18} />}
              />
              <InputForm
                label="E-mail"
                type="email"
                placeholder="E-mail"
                icon={<Mail size={18} />}
              />

              <ButtonForm onClick={() => signOut()}>Sair</ButtonForm>
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  );
};

export default Profile;
