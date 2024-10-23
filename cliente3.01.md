
    # Estructura del fichero:

src/
    App.module.css
    App.tsx
    index.css
    main.tsx
    vite-env.d.ts
    api/
        Auth.ts
        axios.ts
        jobAssignmets.tsx
    assets/
        icons/
            assign_icon.svg
            charts_icon.svg
            Dashboard_icon.svg
            icons.ts
            logo.svg
            logout_icon.svg
            profile_icon.svg
            settings_icon.svg
            test_icon.svg
    components/
        Butons/
            buton.module.css
            Buton.tsx
        Dropdowns/
            UserDropdown/
                UserDropdown.module.css
                UserDropdown.tsx
        Inputs/
            Input.tsx
            Inputs.module.css
        KPICards/
            kpi.module.css
            KPIcards.tsx
        Modal/
            Modal.module.css
            Modal.tsx
        NavLink/
            NavLink.tsx
        Tabs/
            Tab.module.css
            Tab.tsx
            Tabs.tsx
    context/
        assignContext.tsx
        AuthContext.tsx
    data/
        kpi_data.ts
    layouts/
        LoginLayout.tsx
        ProtectedRoute.tsx
        RootLayout.tsx
        header/
            Header.module.css
            Header.tsx
        sideNavbar/
            SideNavbar.module.css
            SideNavbar.tsx
    pages/
        Dashboard/
            Dashboard.tsx
            actionPlan/
                Actionplan.module.css
                ActionPlan.tsx
            assiments/
                Assignmets.tsx
                Assignmets/
                    assignment.module.css
            Kpi/
                Kpi.module.css
                Kpi.tsx
        Login/
            Login.module.css
            Login.tsx
    themes/
        ColorPallet.css

========================[ App.module.css ]========================
[Archivo binario o no legible]

========================[ App.tsx ]========================
```
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

```
========================[ index.css ]========================
[Archivo binario o no legible]

========================[ main.tsx ]========================
```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {AuthProvider} from './context/AuthContext.tsx'
import {AssignProvider} from './context/assignContext.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <AssignProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AssignProvider>
    </AuthProvider>
  </StrictMode>
)

```
========================[ vite-env.d.ts ]========================
```
/// <reference types="vite/client" />

```
========================[ Auth.ts ]========================
```
import axios from "./axios";

interface User {
  // Define las propiedades del objeto user según tus necesidades  
  username: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  access: string;
  color: string;
}

export const RegisterRequest = (user: User) => axios.post('/register', user);

export const LoginRequest = (user: User) => axios.post('/login', user);

export const verifyTokenRequest = () => axios.get('/verify');

export const Users = () => axios.get('/users');

console.log( Users)

```
========================[ axios.ts ]========================
```
import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://10.62.150.33:5000/api", withCredentials: true });

export default axiosInstance
```
========================[ jobAssignmets.tsx ]========================
```
import axios from "./axios";

// Define los tipos para los datos de trabajo si es necesario
interface WorkData {
    LS3:number,
    ZEISS:number,
    SHAPE:number,
    IBO_DESIGN:number,
    DIGI_ABUT:number,
    PHIS_ABUT:number,
    FULL_ARCH:number,
    DATE:string,     
}

export const getJobassignment = () => axios.get('/workasignment');

export const getJobassignmentById = (id: string | number) => axios.get(`/workasignment/${id}`);

export const createJobassignment = (Workdata: WorkData) => axios.post('/workasignment', Workdata);

export const updateJobassignment = (id: string | number, Workdata: WorkData) => axios.put(`/workasignment/${id}`, Workdata);

export const deleteJobassignment = (id: string | number) => axios.delete(`/workasignment/${id}`);

```


========================[ icons.ts ]========================
```

import dashboard_icon  from "./Dashboard_icon.svg"
import charts_icon  from "./charts_icon.svg"
import profile_icon from "./profile_icon.svg" 
import assign_icon  from "./assign_icon.svg"
import test_icon from "./test_icon.svg"
import logout_icon from "./logout_icon.svg"
import settings_icon from "./settings_icon.svg"


export {
	dashboard_icon,
	charts_icon,
	profile_icon,
	assign_icon,
	test_icon,
	logout_icon,
	settings_icon
}
```


========================[ Buton.tsx ]========================
```
import React from 'react';
import styles from './buton.module.css';

interface SquareBtnProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const SquareBtn: React.FC<SquareBtnProps> = ({ onClick, children }) => {
  return (
    <button className={styles.sqbtn} onClick={onClick}>
      {children}
    </button>
  );
};

```

========================[ UserDropdown.tsx ]========================
```
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./UserDropdown.module.css";
import { dashboard_icon, charts_icon, profile_icon, test_icon, logout_icon } from '../../../assets/icons/icons';

interface DropdownProps {
  username: string;
  color: string;
  initials: string;
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { Logout } = useAuth();

  const handleSelectClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutsideMenu = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  return (
    <div>
      <div className={`${styles.dropdown}`} ref={menuRef}>
        <div className={`${styles.username}`} onClick={handleSelectClick}>
          <span className={`${styles.name}`}>{props.username}</span>
          <div className={`${styles.userIcon}`} style={{ backgroundColor: props.color, boxShadow: `0 0 5px ${props.color}` }}>
            <div className={`${styles.circle}`}>{props.initials}</div>
          </div>
        </div>
        <ul className={isMenuOpen ? `${styles.menu} ${styles.menuOpen}` : `${styles.menu}`}>
          <li>
            <Link to="/" onClick={handleSelectClick}>
              <div><img src={dashboard_icon}/></div>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/charts" onClick={handleSelectClick}>
              <div><img src={charts_icon} /></div>
              <span>Charts</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={handleSelectClick}>
              <div><img src={profile_icon} /></div>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/test" onClick={handleSelectClick}>
              <div><img src={test_icon}/></div>
              <span>Test</span>
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => Logout()}>
              <div><img  src={logout_icon} /></div>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

```
========================[ Input.tsx ]========================
```
import React from "react";
import styles from "./Inputs.module.css";

interface TextInputProps {
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <div className={styles.inputText}>
      <label htmlFor={props.label}>{props.label}</label>
      <input 
        type={props.type} 
        id={props.label} 
        name={props.label} 
        onChange={props.onChange} 
      />
    </div>
  );
};

```


========================[ KPIcards.tsx ]========================
```
import React from "react";
import kpi from "./kpi.module.css";

interface KpicardsProps {
  color: string;
  shadow: string;
  symbol: React.ReactNode;
  title: string;
  data: Array<{ [key: string]: string | number }>; // Cambia según tus necesidades
}

export const Kpicards: React.FC<KpicardsProps> = (props) => {
  return (
    <div className={kpi.Kpicards}>
      <div className={kpi.CardContainer}>
        <div
          className={kpi.Symbol}
          style={{ backgroundColor: props.color, boxShadow: props.shadow }}
        >
          <div className={kpi.circle}>{props.symbol}</div>
        </div>
        <div className={kpi.CardTitle}>{props.title}</div>
        <div className={kpi.CardInfo}>
          <ul>
            {props.data.map((data, index) => {
              const key = Object.keys(data)[0];
              const value = data[key];
              return (
                <li className={kpi.li_card} key={index}>
                  <span className={kpi.span_key}>{key}</span>
                  <span className={kpi.span_value}>{value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

```

========================[ Modal.tsx ]========================
```
import React from 'react';
import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalTitle}>{title}</div>
            {children}
            <button className={styles.close_button} onClick={onClose}></button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

```
========================[ NavLink.tsx ]========================
```
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import React from 'react';

interface NavLinkPropsExtended extends NavLinkProps {
  styles: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkPropsExtended> = ({ to, children, styles, ...props }) => {
  return (
    <RouterNavLink 
      {...props}
      className={({ isActive }) => (isActive ? styles : undefined)}
      to={to}
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;

```

========================[ Tab.tsx ]========================
```
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tab.module.css';

interface TabProps {
  activeTab: string;
  label: string;
  onClick: (label: string) => void;
}

const Tab: React.FC<TabProps> = ({ activeTab, label, onClick }) => {
  const handleClick = () => {
    onClick(label);
  }

  let className = styles.tab_list_item;

  if (activeTab === label) {
    className += " " + styles.tab_list_active;
  }

  return (
    <li
      key={label}
      className={className}
      onClick={handleClick}
    >
      {label}
    </li>
  );
}

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;

```
========================[ Tabs.tsx ]========================
```
import React, { useState, ReactNode } from 'react';
import PropTypes from 'prop-types';
import styles from './Tab.module.css';
import Tab from './Tab';

interface TabsProps {
  title: string;
  children: ReactNode[];
}

const Tabs: React.FC<TabsProps> = ({ title, children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab);
  }

  return (
    <div>
      <div className={styles.tabs}>
        <ul className={styles.tab_list}>
          <div>
            {children.map((child: React.ReactElement) => {
              const { label } = child.props;
              return (
                <Tab
                  activeTab={activeTab}
                  key={label}
                  label={label}
                  onClick={onClickTabItem}
                />
              );
            })}
          </div>
        </ul>
        <div className={styles.tab_date}>{title}</div>
      </div>
      <div className={styles.tab_content}>
        {children.map((child: React.ReactElement) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default Tabs;

```
========================[ assignContext.tsx ]========================
```
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
    createJobassignment,
    getJobassignment,
    getJobassignmentById,
    updateJobassignment,
    deleteJobassignment
} from "../api/jobAssignmets";
interface WorkData {
    LS3:number,
    ZEISS:number,
    SHAPE:number,
    IBO_DESIGN:number,
    DIGI_ABUT:number,
    PHIS_ABUT:number,
    FULL_ARCH:number,
    DATE:string,     
}

interface AssignContextType {
    GetAssign: () => Promise<void>;
    assign: WorkData[]; // Cambia 'any' por un tipo más específico si es posible
    loading: boolean;
    CreateAssign: (data: WorkData) => Promise<void>; // Cambia 'any' por un tipo más específico si es posible
}

export const assignContext = createContext<AssignContextType | undefined>(undefined);

export const useAssign = () => {
    const context = useContext(assignContext);
    if (!context) {
        throw new Error("useAssign must be used within an AssignProvider");
    }
    return context;
}

interface AssignProviderProps {
    children: ReactNode;
}

export const AssignProvider: React.FC<AssignProviderProps> = ({ children }) => {
    const [assign, setAssign] = useState<WorkData[]>([]); // Cambia 'any' por un tipo más específico si es posible
    const [loading, setLoading] = useState<boolean>(true);

    const GetAssign = async () => {
        try {
            const res = await getJobassignment();
            setAssign(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const CreateAssign = async (data: WorkData) => { // Cambia 'any' por un tipo más específico si es posible
        try {
            await createJobassignment(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAssign();
    }, []);

    return (
        <assignContext.Provider value={{ GetAssign, assign, loading, CreateAssign }}>
            {children}
        </assignContext.Provider>
    )
}

```
========================[ AuthContext.tsx ]========================
```
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import {
  RegisterRequest,
  LoginRequest,
  verifyTokenRequest,
  Users
} from '../api/Auth';
import Cookies from "js-cookie";

interface User {
  // Define las propiedades del objeto user según tus necesidades
  username: string;
  password: string;
  // Añade otras propiedades si es necesario
}

interface AuthContextType {
  Signup: (user: User) => Promise<void>;
  Signin: (user: User) => Promise<void>;
  GetUsers: () => Promise<void>;
  user: User | null;
  usuarios: User[];
  isAuthenticated: boolean;
  errors: string[];
  loading: boolean;
  Logout: () => void;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const Signup = async (user: User) => {
    try {
      await RegisterRequest(user);
    } catch (error: any) {
      setErrors(error.response.data);
    }
  };

  const Signin = async (user: User) => {
    try {
      const res = await LoginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      setErrors(error.response.data);
    }
  };

  const Logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        Cookies.remove("token");
      }
    }
    checkLogin();
  }, []);

  const GetUsers = async () => {
    try {
      const res = await Users();
      setUsuarios(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{ Signup, Signin, GetUsers, user, usuarios, isAuthenticated, errors, loading, Logout }}>
      {children}
    </authContext.Provider>
  );
};

```
========================[ kpi_data.ts ]========================
```
export const kpi_data = [
    {
      symbol: "+",
      title: "Safety Incidents and Near Misses",
      color: "rgb(0, 255, 0)",
      shadow: "0 0 10px 0 rgba(0, 255, 0, 0.445)",
      data: [
        { "Safety Incidents": 0 },
        { "Kamishibai Misses": 0 },
        { Target: 0 },
      ],
    },
    {
      symbol: "Q",
      title: "Internal Remakes",
      color: "rgb(255, 0, 0)",
      shadow: "0 0 10px 0 rgba(255, 0, 0, 0.445)",
      data: [{ Actual: "0%" }, { Target: "0%" }],
    },
    {
      symbol: "Q",
      title: "FPY -- Redesign Rate",
      color: "rgb(255, 0, 0)",
      shadow: "0 0 10px 0 rgba(255, 0, 0, 0.445)",
      data: [
        { Actual: "97.8%" },
        { Target: "96.5%" },
        { "Designed Units": "231" },
        { "Redesign Requests": "5" },
      ],
    },
    {
      symbol: "Q",
      title: "Cases to Production Support",
      color: "rgb(0, 255, 0)",
      shadow: "0 0 10px 0 rgba(0, 255, 0, 0.445)",
      data: [{ Actual: "3%" }, { Target: "8%" }, { "Case Received": "3" }],
    },
    {
      symbol: "D",
      title: "On Time Delivery",
      color: "rgb(0, 255, 0)",
      shadow: "0 0 10px 0 rgba(0, 255, 0, 0.445)",
      data: [
        { Actual: "100%" },
        { Target: "99%" },
        { "Cases Received": "129" },
        { "Cases Delayed": "0" },
      ],
    },
    {
      symbol: "P",
      title: "Designs Per Designer", 
      color: "rgb(0, 255, 0)",
      shadow: "0 0 10px 0 rgba(0, 255, 0, 0.445)",     
      data: [
        { Actual: "26" },
        { "Lower Targe": "24" },
        { "Upper Target": "28" },
        { Designers: "9.0" },
        { "Total Designs": "231" },
      ],
    },
  ];



  export const user_data = [
    {
      initials: "EA",
      name: "Ezequiel Almonte",
      color: "rgb(0, 255, 0)",
      shadow: "0 0 10px 0 rgba(0, 255, 0, 0.445)",
      data: [
        { "LS3": 12 },
        { "ZEISS": 6 },
        { "COPY MILLS": 2 },
      ],
    },
    {
      initials: "ML",
      name: "Monica Lopez",
      color: "rgba(255, 0, 0, 1)",
      shadow: "0 0 10px 0 rgba(255, 0, 0, 0.5)",
      data: [
        { "3SHAPE": 12 },
        { "DESIGN": 6 },
        { "REGISTRATION": 2 },
      ],
    },
    {
      initials: "NV",
      name: "Noemie Villajuan",
      color: "rgb(245,198,82)",
      shadow: "0 0 10px 0 rgba(245,198,82, 0.5)",
      data: [
        { "DIGITAL ABUT": 12 },
        { "IBO DESIGN": 6 },
        
      ],
    },
    {
      initials: "MC",
      name: "Milka Cvetkovic",
      color: "rgba(1,174,240)",
      shadow: "0 0 10px 0 rgba(1,174,240, 0.5)",
      data: [
        { "DIGITAL ABUT": 12 },
        { "IBO DESIGN": 6 },
        
      ],
    },
    {
      initials: "LL",
      name: "Lauren LeGrand",
      color: "rgba(144,118,211)",
      shadow: "0 0 10px 0 rgba(144,118,211, 0.5)",
      data: [
        { "DIGITAL ABUT": 12 },
        { "FULL ARCH": 6 },
        
      ],
    },
    {
      initials: "BC",
      name: "Bung Su Choi",
      color: "rgb(52,181,149)",
      shadow: "0 0 10px 0 rgba(52,181,149, 0.5)",
      data: [
        { "DIGITAL ABUT": 12 },
        { "FULL ARCH": 6 },
        
      ],
    },
    {
      initials: "RT",
      name: "Roux Tadili",
      color: "rgb(72,132,211)",
      shadow: "0 0 10px 0 rgba(72,132,211, 0.5)",
      data: [
        { "DIGITAL ABUT": 12 },
        { "FULL ARCH": 6 },
        
      ],
    },
    {
      initials: "LC",
      name: "Lucia Coto",
      color: "rgb(208,108,166)",
      shadow: "0 0 10px 0 rgba(208,108,166, 0.5)",
      data: [
        { "DIGITAL ABUT": 12 },
        { "FULL ARCH": 6 },
        
      ],
    },
    {
      initials: "DR",
      name: "Daniel Romero",
      color: "rgb(163,171,182)",
      shadow: "0 0 10px 0 rgba(163,171,182, 0.5)",
      data: [
        { "DIGITAL ABUT": 12 },
        { "FULL ARCH": 6 },
        
      ],
    },
    {
      initials: "AV",
      name: "Arline Vargas",
      color: "rgba(135,65,166)",
      shadow: "0 0 10px 0 rgba(135,65,166, 0.5)",
      data: [
        { "DIGITAL ABUT": 12 },
        { "FULL ARCH": 6 },
        
      ],
    },
    {
      initials: "AU",
      name: "Adriana Ureña",
      color: "rgba(202,81,0)",
      shadow: "0 0 10px 0 rgba(202,81,0, 0.5)",
      data: [
        { "DIGITAL ABUT": 12 },
        { "FULL ARCH": 6 },
        
      ],
    },
    {
      initials: "YV",
      name: "Yanina Viquez",
      color: "rgba(217,175,139)",
      shadow: "0 0 10px 0 rgba(217,175,139, 0.5)",
      data: [
        { "DIGITAL ABUT": 12 },
        { "FULL ARCH": 6 },
        
      ],
    },
    {
      initials: "DA",
      name: "Desiree Alvarez",
      color: "rgba(98,203,231)",
      shadow: "0 0 10px 0 rgba(98,203,231, 0.5)",
      data: [
        { "DIGITAL ABUT": 12 },
        { "FULL ARCH": 6 },
        
      ],
    },

  ]
```
========================[ LoginLayout.tsx ]========================
```
import { Outlet } from "react-router-dom";


const LoginLayout = () => {
  return (
    <div>     
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default LoginLayout
```
========================[ ProtectedRoute.tsx ]========================
```
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

```
========================[ RootLayout.tsx ]========================
```
import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import SideNavbar from "./sideNavbar/SideNavbar";
import style from '../App.module.css'



const RootLayout = () => {
 
  return (
    <>
    <div className={style.AppContainer}>      
      <Header logout={function (): void {throw new Error("Function not implemented.");} } />
      <SideNavbar />
      <main className={style.appMain}>
        <Outlet />
      </main>
    </div>
    </>
  );
};

export default RootLayout;

```


========================[ Header.tsx ]========================
```
import { Dropdown } from "../../components/Dropdowns/UserDropdown/UserDropdown";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  logout: () => void;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { user } = useAuth();
  const fname = user.fname;
  const lname = user.lname;
  const userColor = user.color;
  const Username = `${fname} ${lname}`;
  const location = useLocation();

  const getTitle = (): string => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/profile":
        return "Profile";
      case "/charts":
        return "Charts";
      case "/admin":
        return "Admin";
      case "/test":
        return "Test";
      case "/test2":
        return "Test2";
      case "/assignments":
        return "Assignments";
      default:
        return "Dashboard";
    }
  };

  const getInitials = (firstName: string, lastName: string): string => {
    const initials = `${firstName[0]}${lastName[0]}`;
    return initials.toUpperCase();
  };

  return (
    <header>
      <div className={`${styles.date}`}></div>
      <div className={`${styles.title}`}>
        <h1>{getTitle()}</h1>
      </div>
      <div className={`${styles.dropbox}`}>
        <Dropdown
          logout={props.logout}
          username={Username}
          initials={getInitials(fname, lname)}
          color={userColor}
        />
      </div>
    </header>
  );
};

```


========================[ SideNavbar.tsx ]========================
```
import Logo from "../../assets/icons/logo.svg";
// import { useAuth } from "../../context/AuthContext";
import styles from "./SideNavbar.module.css";
import { dashboard_icon, charts_icon, profile_icon, assign_icon, test_icon } from '../../assets/icons/icons';
import NavLink from "../../components/NavLink/NavLink";

const SideNavbar: React.FC = () => {
//   const { user } = useAuth();

  return (
    <aside>
      <div className={`${styles.logo}`}>
        <img src={Logo} alt="Nobel Biocare" />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" styles={styles.active}>
              <div><img src={dashboard_icon} alt="" /><span>Dashboard</span></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/charts" styles={styles.active}>
              <div><img src={charts_icon} alt="" /><span>Charts</span></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" styles={styles.active}>
              <div><img src={profile_icon} alt="" /><span>Profile</span></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/test" styles={styles.active}>
              <div><img src={test_icon} alt="" /><span>Test</span></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/test2" styles={styles.active}>
              <div><img src={test_icon} alt="" /><span>Test2</span></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/assignments" styles={styles.active}>
              <div><img src={assign_icon} alt="" /><span>Assign</span></div>
            </NavLink>
          </li>
          {/* {user.access === "admin" && (
            <li>
              <NavLink to="/admin" styles={styles.active}>
                <div>{settings_icon}<span>Admin</span></div>
              </NavLink>
            </li>
          )} */}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavbar;

```
========================[ Dashboard.tsx ]========================
```
import React from 'react';
import Tabs from "../../components/Tabs/Tabs";
import Assignmets from "./assiments/Assignmets";
import ActionPlan from "./actionPlan/ActionPlan";
import KPI from "./Kpi/Kpi";
import moment from 'moment';

const today = moment().format('MM/DD/YYYY');
const yesterday = moment().subtract(1, 'days').format('MM/DD/YYYY');

const Dashboard: React.FC = () => {
  return (
    <Tabs title={today}>
      <div label="DASHBOARD KPI">
        <KPI />
      </div>
      <div label="ASSIGMENTS">
        <Assignmets />
      </div>
      <div label="ACTION PLAN">
        <ActionPlan />
      </div>
    </Tabs>
  );
}

export default Dashboard;

```


========================[ ActionPlan.tsx ]========================
```
import React from 'react';
import style from './Actionplan.module.css';

const ActionPlan: React.FC = () => {
  return (
    <div className={style.container}>
      <h1>ASSIGMENTS</h1>
    </div>
  );
};

export default ActionPlan;

```
========================[ Assignmets.tsx ]========================
```
import React from 'react';
import style from './Assignmets/assignment.module.css';

const Assignmets: React.FC = () => {
  return (
    <div className={style.container}>
      <h1>ASSIGMENTS</h1>
    </div>
  );
};

export default Assignmets;

```

========================[ Kpi.tsx ]========================
```
import React, { useEffect, useState } from "react";
import kpi from "./kpi.module.css";
import { kpi_data } from "../../../data/kpi_data.ts";
import { Kpicards } from "../../../components/KPICards/KPIcards.tsx";
import { SquareBtn } from "../../../components/Butons/Buton";
import { useAuth } from "../../../context/AuthContext";
import Modal from "../../../components/Modal/Modal.tsx";
import { TextInput } from "../../../components/Inputs/Input.tsx";
import { useAssign } from "../../../context/assignContext";
// import Assing from "../../../components/assignTest/assing.jsx";
// import AssignJobs from "../../../components/assignTest/assignJob2.jsx";

interface Products {
  LS3?: number;
  ZEISS?: number;
  SHAPE?: number;
  PHIS_ABUT?: number;
  DIGI_ABUT?: number;
  FULL_ARCH?: number;
  IBO_DESIGN?: number;
}

const KPI: React.FC = () => {
  const { user } = useAuth();
  const { assign, GetAssign, CreateAssign } = useAssign();
  const { usuarios, GetUsers } = useAuth();

  useEffect(() => {
    GetAssign();
    GetUsers();
  }, []);  

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [products, setProducts] = useState<Products>({}); 

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openModal2 = () => setIsOpen2(true);
  const closeModal2 = () => setIsOpen2(false);

  const handleCreateNewData = async () => {
    const newAssignData = {
      LS3: products.LS3, 
      ZEISS: products.ZEISS,
      SHAPE: products.SHAPE, 
      PHIS_ABUT: products.PHIS_ABUT, 
      DIGI_ABUT: products.DIGI_ABUT, 
      FULL_ARCH: products.FULL_ARCH,
      IBO_DESIGN: products.IBO_DESIGN
    };

    await CreateAssign(newAssignData);
    GetAssign();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducts((prevProducts) => ({
      ...prevProducts,
      [name]: parseInt(value), // Asegúrate de convertir el valor a entero si es necesario
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(products);
    handleCreateNewData();
    closeModal();
  };

  return (
    <>
      {/* =====================================(ASSIGMENT CARDS)=============================================== */}
      <section className={kpi.Dashboard_Asigment}>
        <div className={kpi.container}>
          {Object.entries(assign).slice(0, 7).map(([key, value]) => (
            <h2 key={key}>
              {key}
              <span>{value}</span>
            </h2>
          ))}
        </div>
        {user.access === "admin" && (
          <>
            <SquareBtn onClick={openModal}>Assign</SquareBtn>
            <SquareBtn onClick={openModal2}>Job</SquareBtn>
          </>
        )}
      </section>
      {/* =====================================(KPI CARDS)=============================================== */}
      <section className={kpi.Dashboard_KPI}>
        {kpi_data.map((card, index) => (
          <Kpicards
            key={index}
            symbol={card.symbol}
            color={card.color}
            shadow={card.shadow}
            title={card.title}
            data={card.data}
          />
        ))}
      </section>
      {/* ====================================(ASSIGMENT MODAL)================================================ */}
      <Modal isOpen={isOpen} onClose={closeModal} title="Assign">
        <section className={kpi.assigmentContainer}>
          <form onSubmit={handleSubmit} className={kpi.formAssigment}>
            <TextInput label="LS3" type="text" name="LS3" onChange={handleChange} />
            <TextInput label="ZEISS" type="text" name="ZEISS" onChange={handleChange} />
            <TextInput label="SHAPE" type="text" name="SHAPE" onChange={handleChange} />
            <TextInput 
              label="PHIS_ABUT"
              type="text"
              name="PHIS_ABUT"
              onChange={handleChange}
            />
            <TextInput
              label="DIGI_ABUT"
              type="text"
              name="DIGI_ABUT"
              onChange={handleChange}
            />
            <TextInput label="IBO_DESIGN" type="text" name="IBO_DESIGN" onChange={handleChange} />
            <TextInput label="FULL_ARCH" type="text" name="FULL_ARCH" onChange={handleChange} />
            <button type="submit" className={kpi.btnSubmit}>
              Submit
            </button>
          </form>
        </section>
      </Modal>
      {/* =========================================(JOB MODAL)============================================== */}
      {/* Aquí puedes agregar el contenido del modal de "Job" */}
    </>
  );
};

export default KPI;
```


========================[ Login.tsx ]========================
```
import Logo from "../../assets/icons/logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import style from "./Login.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { Signin, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    Signin(data);
    navigate("/");
  };

  return (
    <div className={style.container}>
      <div className={style.login}>
        <div className={style.logo}>
          <img src={Logo} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          {signinErrors.map((error, index) => (
            <p className="error" key={index}>
              {error}
            </p>
          ))}
          <input
            {...register("username", { required: true })}
            className={style.input_text}
            type="text"
            placeholder="username"
            autoComplete="true"
          />
          {errors.username && <p className="error">This field is required</p>}
          <input
            {...register("password", { required: true })}
            className={style.input_text}
            type="password"
            placeholder="password"
          />
          {errors.password && <p className="error">This field is required</p>}
          <button className={style.btn}>Login</button>
        </form>
      </div>
    </div>
  );
};

```


