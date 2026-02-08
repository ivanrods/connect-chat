import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#22c55e",
      contrastText: "#fff",
    },
    secondary: {
      main: "#737373",
      contrastText: "#fff",
    },
    background: {
      paper: "#ffff",
    },
    border: {
      main: "#ddd",
    },
    text: {
      primary: "#737373",
      secondary: "#ffffff",
    },
  },
  shape: {
    borderRadius: 8,
  },

  typography: {
    h4: {
      color: "#22c55e",
    },
    subtitle1: {
      color: "#737373",
    },
    caption: {
      color: "#8f8f8f",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
