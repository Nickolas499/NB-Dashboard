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
import Test from './pages/test/Test';
import Admin from './pages/admin/Admin';
import AssignmentForm from "./components/assignForm/AssignmentForm";
const workers = ["Ezequiel Almonte","jose Antonio",];
  const jobs = {
    LS3: 5,
    ZEISS: 6,
    SHAPE: 7,
    PHIS_ABUT: 8,
    DIGI_ABUT: 9,
    FULL_ARCH: 11,
    IBO_DESIGN: 10
  };

    const assignWork = (worker, job, quantity) => {
    // Lógica para guardar los datos de asignación
    const assignmentData = {
      worker,
      job,
      quantity
    };
    // Guardar los datos de asignación en otro documento llamado 'asignacion'
    // Código para guardar los datos en el documento 'asignacion' aquí
    // console.log("Asignación guardada:", assignmentData);
  };

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
        path: '/test',
        element: <Test/>
      },
      {
        path: '/test2',
        element: <AssignmentForm workers={workers} jobs={jobs} assignWork={assignWork} />
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
