import { Button } from "@mui/material";

const ButtonForm = ({ text, variant, icon, onClick }) => {
  return (
    <Button
      type="submit"
      variant={variant}
      endIcon={icon}
      onClick={onClick}
      sx={{
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "10px",
        textTransform: "none",
        fontWeight: "600",
        mt: 2,
        color: "white",
      }}
    >
      {text}
    </Button>
  );
};

export default ButtonForm;
