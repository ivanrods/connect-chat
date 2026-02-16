import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { AuthProvider } from "./context/auth-context";
import PrivateRoute from "./routes/PrivateRoute";
import { theme } from "./theme/theme.js";
import { SocketProvider } from "./context/socket-context.jsx";
import { AlertProvider } from "./context/alert-context.jsx";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LoadingPage from "./components/LoadingPage.jsx";

const root = document.getElementById("root");

const Chat = lazy(() => import("./pages/Chat"));

ReactDOM.createRoot(root).render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <AuthProvider>
          <SocketProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute />}>
                  <Route
                    path="*"
                    element={
                      <Suspense fallback={<LoadingPage />}>
                        <Chat />
                      </Suspense>
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </SocketProvider>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>,
);
