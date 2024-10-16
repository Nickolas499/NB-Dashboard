import {useRoutes, useNavigate} from 'react-router-dom';
import ProtectedRoutes from './layouts/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginLayout from './layouts/LoginLayout';
import {Login} from './pages/Login/Login';
import { useEffect } from 'react';
import {useAuth} from './context/AuthContext';
import RootLayout from './layouts/RootLayout';




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
        // element: <Charts/>
      },
      {
        path: '/profile',
        // element: <h1>Profile</h1>
      },
      {
        path: '/admin',
        // element: <h1>Admin</h1>
      },
      {
        path: '/test',
        // element: <Test/>
      },
      {
        path: '/test2',
        // element: <AssignmentForm workers={workers} jobs={jobs} assignWork={assignWork} />
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
  }, [Navigate, isAuthenticated]);
  return (
    useRoutes(routes)
  );  
}

export default App
