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
      display="flex"
      sx={{
        alignItems: "center",
        p: 2,
        gap: 1,
        borderTop: "1px solid #ddd",
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
      />

      <IconButton
        onClick={handleSend}
        disabled={disabled}
        sx={{ color: "primary.main" }}
      >
        <SendIcon size={30} />
      </IconButton>
    </Box>
  );
}
