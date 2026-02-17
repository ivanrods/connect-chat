import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import LoadingPage from "../components/LoadingPage";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
