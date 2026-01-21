import { useState } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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
      alignItems="center"
      padding={2}
      gap={1}
      sx={{
        borderTop: "1px solid #ddd",
      }}
    >
      <TextField
        fullWidth
        size="small"
        multiline
        maxRows={3}
        placeholder="Digite uma mensagem..."
        value={message}
        disabled={disabled}
        onChange={(e) => setMessage(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSend}
                  disabled={disabled}
                  color="primary"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
    </Box>
  );
}
