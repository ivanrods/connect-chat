import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import "./index.css";
import { AuthProvider } from "./context/auth-context";
import PrivateRoute from "./routes/PrivateRoute";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme.js";
import { SocketProvider } from "./context/socket-context.jsx";
import { CssBaseline } from "@mui/material";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {" "}
        <SocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoute />}>
                <Route path="*" element={<Chat />} />
                <Route path="/chat" element={<Chat />} />
              </Route>
            </Routes>
          </BrowserRouter>{" "}
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
