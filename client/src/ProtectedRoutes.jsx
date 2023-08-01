import{useAuth} from "./context/authContext";
import {Outlet} from "react-router-dom";

// function ProtectedRoutes() {
//    ;
//     const {isAuthenticated} = useAuth();
//     if(!isAuthenticated) return <navigate to="/login" replace/>;
//   return (
//     <Outlet/>
//   )
// }

// export default ProtectedRoutes

import { useNavigate } from "react-router-dom";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) navigate("/login", { replace: true });
  return <Outlet />;
}

export default ProtectedRoutes