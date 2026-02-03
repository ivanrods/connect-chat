import { useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export function MessageInput({ onSend, disabled, loading }) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSend = () => {
    if (!message.trim() && !file) return;

    onSend({
      content: message,
      image: file,
    });
    setMessage("");
    setFile(null);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      padding={2}
      gap={1}
      borderTop={"1px solid #ddd"}
    >
      {file && (
        <Box position="relative">
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            style={{
              maxWidth: 50,
              maxHeight: 50,
              borderRadius: 8,
            }}
          />
          <IconButton
            size="small"
            onClick={() => setFile(null)}
            sx={{
              position: "absolute",
              top: -8,
              left: -8,
            }}
          >
            <DeleteOutlineIcon color="error" />
          </IconButton>
        </Box>
      )}

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
                  {loading ? <CircularProgress size={20} /> : <SendIcon />}
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleAttachClick} disabled={file}>
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
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
      />
    </Box>
  );
}
