import {
  Dialog,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function ImageViewer({ image, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog open={!!image} onClose={onClose} maxWidth="lg">
      <Box display="flex" justifyContent="center">
        <IconButton
          onClick={onClose}
          color="primary"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          component="img"
          src={image}
          width="100%"
          minHeight={isMobile ? null : 600}
        />
      </Box>
    </Dialog>
  );
}
