import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#22c55e",
    },
    secondary: {
      main: "#737373",
    },
    background: {
      paper: "#ffff",
    },
    text: {
      primary: "#737373",
      secondary: "#ffffff",
    },
  },
  shape: {
    borderRadius: 10,
  },
});
