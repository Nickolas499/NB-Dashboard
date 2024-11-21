import './App.css';
import {useRoutes, useNavigate} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import LoginLayout from './layouts/LoginLayout';
import Charts from './pages/charts/Charts';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoutes from './layouts/ProtectedRoute';
import {Login} from './pages/login/Login';
import {useAuth} from './context/AuthContext';
import {useEffect} from 'react';
import Production from './pages/production/Production';
import Admin from './pages/admin/Admin';
import AssignmentForm from "./components/assignForm/AssignmentForm";
const workers = ["Ezequiel Almonte","jose Antonio",];
  

const routes = [
  {
    path: '/',
    element: <ProtectedRoutes><RootLayout/></ProtectedRoutes>,
    children: [
      {
        path: '/',
        index: true,        
        element: <Dashboard/>
      },      
      {
        path: '/charts',
        element: <Charts/>
      },
      {
        path: '/profile',
        element: <h1>Profile</h1>
      },
      {
        path: '/admin',
        element: <Admin/>
      },
      {
        path: '/production',
        element: <Production/>
      },
      {
        path: '/test2',
        element: <Production/>
      },
      {
        path: '/assigments',
        element: <h1>Assigments</h1>
      }
    ]
    
  },
  {
    path: '/Login',
    element: <LoginLayout/>,
    children: [
      {
        path: '/Login',
        index: true,        
        element: <Login/>
      }
    ]
  },
  {
    path: '*',
    element: <h1>Not Found</h1>
  }
]

function App() {

  const {isAuthenticated} = useAuth();
  const Navigate = useNavigate();

  useEffect(() => {    
    
    if (isAuthenticated) {
      Navigate("/");
    }
  }, [isAuthenticated]);
  return (
    useRoutes(routes)
  );
}

export default App;
