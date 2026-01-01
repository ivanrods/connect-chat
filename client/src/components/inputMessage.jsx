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
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1,
        boxShadow: "0px -2px 6px -1px rgba(0,0,0,0.25)",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Digite uma mensagem"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        margin="normal"
        sx={{
          width: "750px",
        }}
        InputProps={{
          startAdornment: <FileUploader />,
          endAdornment: (
            <IconButton type="submit" color="primary" onClick={handleSubmit}>
              <Send />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default InputMessage;
