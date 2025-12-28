import { useState } from "react";
import { usePostChat } from "../hooks/use-chat";
import { Send } from "lucide-react";
import { Box, TextField, IconButton } from "@mui/material";
import FileUploader from "./fileUploader";
const InputMessage = () => {
  const { postMessage } = usePostChat();

  const [message, setMessage] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    await postMessage({ message });
    setMessage("");
  }
  return (
    <Box
      sx={{
        height: 100,
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1,
        boxShadow: "0px -2px 6px -1px rgba(0,0,0,0.25)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 750,
          display: "flex",
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: 2,
          px: 1,
          "&:focus-within": {
            border: "2px solid",
            borderColor: "primary.main",
          },
        }}
      >
        <FileUploader />

        <TextField
          variant="standard"
          placeholder="Digite uma mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          InputProps={{
            disableUnderline: true,
            sx: {
              px: 2,
              fontSize: 14,
              color: "text.primary",
            },
          }}
        />

        <IconButton type="submit">
          <Send style={{ color: "var(--mui-palette-primary-main)" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default InputMessage;
