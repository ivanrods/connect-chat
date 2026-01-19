import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#22c55e",
    },
    secondary: {
      main: "#ddd",
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
  typography: {
    h4: {
      color: "#22c55e",
    },
    subtitle1: {
      color: "#737373",
    },
  },
});
