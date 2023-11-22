import{useAuth} from "../context/AuthContext";
import {Outlet,Navigate} from "react-router-dom";


function ProtectedRoutes({children}) {
  
  const {loading, isAuthenticated } = useAuth();
  console.log(loading, isAuthenticated);
  

  if(loading) return <div>Loading...</div>;
  if (!loading && !isAuthenticated) 
    return <Navigate to="/Login" replace />;
  
  return children;
}

export default ProtectedRoutes