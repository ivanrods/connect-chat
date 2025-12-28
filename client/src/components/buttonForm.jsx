import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ButtonForm = ({ text }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      endIcon={<SendIcon sx={{ color: "white", display: "block" }} />}
      sx={{
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "10px",
        textTransform: "none",
        fontWeight: "600",
        mt: 2,
      }}
    >
      {text}
    </Button>
  );
};

export default ButtonForm;
