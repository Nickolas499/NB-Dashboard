import{useAuth} from "./context/authContext";
import {Outlet,Navigate} from "react-router-dom";


function ProtectedRoutes() {
  
  const {loading, isAuthenticated } = useAuth();
  console.log(loading, isAuthenticated);
  

  if(loading) return <div>Loading...</div>;
  if (!loading && !isAuthenticated) Navigate("/login", { replace: true });
  
  return <Outlet />;
}

export default ProtectedRoutes