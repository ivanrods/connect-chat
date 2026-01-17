import { TextField, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";

const InputForm = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Procurar"
      type="text"
      fullWidth
      margin="normal"
      sx={{
        "& .MuiInputBase-root": {
          color: "#747272",
          border: "1px solid #ddd",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ color: "#ddd" }}>
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputForm;
