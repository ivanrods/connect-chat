import { TextField, InputAdornment } from "@mui/material";

const InputForm = ({ icon, type = "text", placeholder, ...rest }) => {
  return (
    <TextField
      variant="outlined"
      type={type}
      placeholder={placeholder}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

export default InputForm;
