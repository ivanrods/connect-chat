import { TextField, InputAdornment } from "@mui/material";

const InputForm = ({
  icon,
  type = "text",
  placeholder,
  label,
  error,
  helperText,
  ...rest
}) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      placeholder={placeholder}
      type={type}
      fullWidth
      margin="normal"
      error={!!error}
      helperText={helperText}
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
