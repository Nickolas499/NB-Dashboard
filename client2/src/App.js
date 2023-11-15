import './App.css';
import {useRoutes} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import LoginLayout from './layouts/LoginLayout';

import {Login} from './pages/login/Login';


const routes = [
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        path: '/',
        index: true,        
        element: <h1>Home</h1>
      },
      {
        path: '/dashboard',
        element: <h1>Dashboard</h1>
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
