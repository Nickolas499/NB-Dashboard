import './App.css';
import {useRoutes} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import LoginLayout from './layouts/LoginLayout';
import Charts from './pages/charts/Charts';
import Dashboard from './pages/dashboard/Dashboard';

import {Login} from './pages/login/Login';


const routes = [
  {
    path: '/',
    element: <RootLayout/>,
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
        element: <h1>Admin</h1>
      },
      {
        path: '/test',
        element: <h1>Test</h1>
      },
      {
        path: '/test2',
        element: <h1>Test2</h1>
      },
      {
        path: '/asign',
        element: <h1>Asign</h1>
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
  }
]

function App() {
  return (
    useRoutes(routes)
  );
}

export default App;
