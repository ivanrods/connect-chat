import { TextField, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";

const InputForm = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Procurar"
      type="text"
      fullWidth
      margin="dense"
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
