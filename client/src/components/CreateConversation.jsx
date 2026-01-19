import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";

export function CreateConversation({ open, onClose, onCreate }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!email) return;

    setLoading(true);
    await onCreate(email);
    setEmail("");
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nova conversa</DialogTitle>

      <DialogContent>
        <Box display="flex" gap={2} mt={1}>
          <TextField
            fullWidth
            label="Email do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={loading}
            sx={{ textTransform: "none", fontWeight: "bold", color: "white" }}
          >
            Criar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
