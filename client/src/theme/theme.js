import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1d4ed8",
    },
    secondary: {
      main: "#262626",
    },
    background: {
      default: "#171717",
      paper: "#0a0a0a",
    },
    text: {
      primary: "#fafafa",
      secondary: "#78716c",
    },
    divider: "#3b82f6",
  },
  shape: {
    borderRadius: 10,
  },
});
