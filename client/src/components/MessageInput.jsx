import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export function MessageInput({ onSend, disabled }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        p: 2,
        borderTop: "1px solid #262626",
        bgcolor: "#0f0f0f",
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={3}
        placeholder="Digite uma mensagem..."
        value={message}
        disabled={disabled}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        sx={{
          "& .MuiInputBase-root": {
            bgcolor: "#171717",
            color: "#fff",
          },
        }}
      />

      <IconButton
        onClick={handleSend}
        disabled={disabled}
        sx={{ color: "primary.main" }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}
