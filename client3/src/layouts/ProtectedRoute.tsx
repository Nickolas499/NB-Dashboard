import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!loading && !isAuthenticated) return <Navigate to="/Login" replace />;

  return <>{children}</>;
};

export default ProtectedRoutes;
