import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";

export function EditProfile({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Perfil</DialogTitle>

      <DialogContent>
        <Box>Perfil</Box>
      </DialogContent>
    </Dialog>
  );
}
