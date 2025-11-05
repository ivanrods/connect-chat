import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const PrivateRoute = () => {
  const { user } = useAuth();
  console.log(user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
