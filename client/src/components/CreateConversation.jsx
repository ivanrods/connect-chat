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
    try {
      setLoading(true);
      await onCreate(email);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setEmail("");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Nova conversa</DialogTitle>

      <DialogContent>
        <Box component="form" display="flex" gap={2} mt={1}>
          <TextField
            size="small"
            type="email"
            placeholder="Email do usuário"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            size="large"
            variant="contained"
            onClick={handleCreate}
            disabled={loading}
          >
            Criar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
