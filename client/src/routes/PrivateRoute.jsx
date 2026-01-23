import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { LinearProgress } from "@mui/material";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    <LinearProgress />;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
