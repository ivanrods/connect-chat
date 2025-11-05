import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    <div>Carregando...</div>;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
