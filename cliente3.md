

    ### Aqui te presento parte de la interfas de mi proyecto.  
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
```
@import './themes/ColorPallet.css';

.AppContainer {
  background: repeating-linear-gradient(
    -45deg,var(--transparent),
    var(--transparent) 40px,
    var(--whitetransparent) 0px,
    var(--whitetransparent) 80px
    );
  display: grid;
  z-index: 2;
  width: 100%;  
  min-height: calc(100vh - 0px);
  grid-template-columns: 100px repeat(1, 1fr);
  grid-template-rows: 80px repeat(1, 1fr);
  grid-template-areas: "aside header header header header header header header header" "aside main main main main main main main main" "aside main main main main main main main main" "aside main main main main main main main main";
}

.bg {
  position: fixed;
  width: 1500px;;
  height: 1500px;
  bottom: -750px;
  left: -750px;
  background: radial-gradient( circle, rgba(0, 0, 0, 0.562) 0%, rgba(0, 0, 0, 0.473) 10%, rgba(0, 213, 255, 0)60% );
  z-index: -1;
}

.bg2 {
  position: fixed;
  width: 2000px;;
  height: 2000px;
  top: -1000px;
  right: -100px;
  background: radial-gradient( circle, var(--background3) 20%,  rgba(0, 0, 0, 0.11) 70% );
  z-index: -1;
}

.Applogin{
  display: grid;
  width: 100vw;
  min-height: calc(100vh - 20px);    
  justify-content: center;
  align-items: center;
}

.appMain{
  grid-area: main;
  padding: 10px;
  height: calc(100dvh - 80px);   
}



```
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
```
@import url("https://fonts.googleapis.com/css2?family=Rajdhani&family=Sigmar");
@import "./themes/ColorPallet.css";

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(  135deg, var(--background) 60%,  var(--background2) );
  color: var(--Color);
  font-size: 1.1rem;
  font-family: rajdhani;
  

 
}

```
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
========================[ assign_icon.svg ]========================
```
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="64" height="64" viewBox="0 0 64 64" >
<path d="M18,17a7.46,7.46,0,1,0-7.45-7.46A7.46,7.46,0,0,0,18,17ZM18,4.07a5.46,5.46,0,1,1-5.45,5.45A5.46,5.46,0,0,1,18,4.07Z" ></path><path d="M6,31.89V25.77a16.13,16.13,0,0,1,12-5,16.61,16.61,0,0,1,8.71,2.33l1.35-1.51A18.53,18.53,0,0,0,18,18.74,17.7,17.7,0,0,0,4.21,24.8a1,1,0,0,0-.21.6v6.49A2.06,2.06,0,0,0,6,34H18.39l-1.9-2Z" ></path><path d="M30,31.89,30,32H26.85l-1.8,2H30a2.06,2.06,0,0,0,2-2.07V26.2l-2,2.23Z" ></path><path d="M34.76,18.62a1,1,0,0,0-1.41.08l-11.62,13-5.2-5.59A1,1,0,0,0,15.12,26a1,1,0,0,0-.06,1.42l6.69,7.2L34.84,20A1,1,0,0,0,34.76,18.62Z"></path>
<rect x="0" y="0" width="36" height="36" fillOpacity="0"/>
</svg>
```
========================[ charts_icon.svg ]========================
```
<svg fill="currentColor" height="64" width="64"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392.598 392.598" >
   <path d="M381.673,370.812h-71.434V83.846c0-6.012-4.849-10.925-10.925-10.925c-6.012,0-10.925,4.849-10.925,10.925v286.966
       h-50.295V138.408c0-6.012-4.849-10.925-10.925-10.925c-6.012,0-10.925,4.849-10.925,10.925v232.404h-50.295V192.84
       c0-6.012-4.849-10.925-10.925-10.925c-6.077,0-10.925,4.848-10.925,10.925v177.907H93.802V247.402
       c0-6.012-4.849-10.925-10.925-10.925c-6.012,0-10.925,4.849-10.925,10.925v123.41H21.786V10.925C21.786,4.913,16.937,0,10.861,0
       S0,4.913,0,10.925v370.747c0,6.012,4.849,10.925,10.925,10.925h370.747c6.012,0,10.925-4.848,10.925-10.925
       C392.533,375.661,387.685,370.812,381.673,370.812z"/>
</svg>
```
========================[ Dashboard_icon.svg ]========================
```
<svg  xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="64" height="64" viewBox="0 0 32 32">
<path  d="M24 21h2v5h-2zm-4-5h2v10h-2zm-9 10a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3v-2a5 5 0 0 1 0 10z"/>
<path  d="M28 2H4a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2h24a2.003 2.003 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2Zm0 9H14V4h14ZM12 4v7H4V4ZM4 28V13h24l.002 15Z"/>
</svg>

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
========================[ logo.svg ]========================
```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" > <defs > <style > .cls-1 {
    fill: rgba(255, 0, 0, 1);
}
</style> </defs> <g id="N"> <path class="cls-1" d="M28.16 4.63v23.09a.61.61 0 0 1-.61.61h-4.38c-1.42 0-1.9-.19-2.36-.83L10 12.54A.61.61 0 0 0 9 13v4.18a.78.78 0 0 0 .22.54l9.09 13a3.76 3.76 0 0 0 3.35 1.51h9.91a.61.61 0 0 0 .61-.61V.61a.61.61 0 0 0-.61-.61h-8.5a.61.61 0 0 0-.61.61v2.8a.61.61 0 0 0 .61.61h4.48a.61.61 0 0 1 .61.61z" /> <path class="cls-1" d="M4 27.55V4.47a.61.61 0 0 1 .61-.61H9c1.42 0 1.89.18 2.35.83l10.77 15a.62.62 0 0 0 1.05-.43V15a.78.78 0 0 0-.17-.5l-9.1-13A3.76 3.76 0 0 0 10.52 0H.61A.61.61 0 0 0 0 .61v31a.61.61 0 0 0 .61.61h8.5a.61.61 0 0 0 .61-.61v-2.8a.61.61 0 0 0-.61-.61H4.63a.61.61 0 0 1-.63-.65z" /> </g> </svg>

```
========================[ logout_icon.svg ]========================
```
<svg xmlns="http://www.w3.org/2000/svg" fill="#00ff00" height="64px" width="64px" viewBox="0 0 489.9 489.9" >
		<path d="M468.3,255.8c0.1-0.1,0.1-0.1,0.2-0.2c0.3-0.4,0.6-0.7,0.8-1.1c0.1-0.1,0.1-0.2,0.2-0.3c0.2-0.4,0.5-0.8,0.7-1.2 c0-0.1,0.1-0.2,0.1-0.2c0.2-0.4,0.4-0.8,0.6-1.3c0-0.1,0-0.1,0.1-0.2c0.2-0.4,0.3-0.9,0.5-1.4c0-0.1,0-0.2,0.1-0.2 c0.1-0.5,0.3-0.9,0.3-1.4c0-0.2,0-0.3,0.1-0.5c0.1-0.4,0.1-0.8,0.2-1.2c0.1-0.6,0.1-1.1,0.1-1.7c0-0.6,0-1.1-0.1-1.7 c0-0.4-0.1-0.8-0.2-1.2c0-0.2,0-0.3-0.1-0.5c-0.1-0.5-0.2-0.9-0.3-1.4c0-0.1,0-0.2-0.1-0.2c-0.1-0.5-0.3-0.9-0.5-1.4 c0-0.1,0-0.1-0.1-0.2c-0.2-0.4-0.4-0.9-0.6-1.3c0-0.1-0.1-0.2-0.1-0.2c-0.2-0.4-0.4-0.8-0.7-1.2c-0.1-0.1-0.1-0.2-0.2-0.3 c-0.3-0.4-0.5-0.8-0.8-1.1c-0.1-0.1-0.1-0.1-0.2-0.2c-0.4-0.4-0.7-0.9-1.2-1.3l-98.9-98.8c-6.7-6.7-17.6-6.7-24.3,0 c-6.7,6.7-6.7,17.6,0,24.3l69.6,69.6H136.8c-9.5,0-17.2,7.7-17.2,17.1c0,9.5,7.7,17.2,17.2,17.2h276.8l-69.1,69.1 c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5l98.3-98.3C467.5,256.6,467.9,256.2,468.3,255.8z"></path>
 		<path d="M110.7,34.3h128c9.5,0,17.2-7.7,17.2-17.1c0-9.5-7.7-17.2-17.2-17.2h-128C59.4,0,17.6,41.8,17.6,93.1v303.7 c0,51.3,41.8,93.1,93.1,93.1h125.9c9.5,0,17.2-7.7,17.2-17.1c0-9.5-7.7-17.2-17.2-17.2H110.7c-32.4,0-58.8-26.4-58.8-58.8V93.1 C52,60.6,78.3,34.3,110.7,34.3z"></path>
</svg>


```
========================[ profile_icon.svg ]========================
```
<svg xmlns="http://www.w3.org/2000/svg" fill="#00ff00" version="1.1" id="Ebene_1"   width="64px" height="64px" viewBox="0 0 64 64"  > <path d="M32,42c8.673,0,16-8.701,16-19S40.673,4,32,4s-16,8.701-16,19S23.327,42,32,42z M32,8c6.505,0,12,6.869,12,15 s-5.495,15-12,15s-12-6.869-12-15S25.495,8,32,8z"></path> <path d="M4.103,45.367l-4,12c-0.203,0.61-0.101,1.28,0.275,1.802C0.753,59.691,1.357,60,2,60h60c0.643,0,1.247-0.309,1.622-0.831 c0.376-0.521,0.479-1.191,0.275-1.802l-4-12c-0.209-0.626-0.713-1.108-1.348-1.29l-14-4c-0.482-0.139-0.996-0.09-1.444,0.134 L32,45.764l-11.105-5.553c-0.448-0.224-0.962-0.272-1.444-0.134l-14,4C4.815,44.259,4.312,44.741,4.103,45.367z M19.802,44.137 l11.304,5.652c0.562,0.281,1.227,0.281,1.789,0l11.304-5.652l12.238,3.496L59.226,56H4.774l2.789-8.367L19.802,44.137z"></path> </svg>

```
========================[ settings_icon.svg ]========================
```
<svg xmlns="http://www.w3.org/2000/svg" fill="#333333" width="64px" height="64px" viewBox="0 0 64 64" >

<path  d="M1468.436,32.467v188.211c-98.748,15.249-174.595,100.822-174.595,203.777s75.847,188.521,174.595,203.777
   v1139.302c0,17.453,14.146,31.608,31.607,31.608c17.454,0,31.609-14.155,31.609-31.608V628.232
   c98.748-15.257,174.59-100.822,174.59-203.777s-75.842-188.529-174.59-203.777V32.467c0-17.454-14.155-31.608-31.609-31.608
   C1482.581,0.858,1468.436,15.013,1468.436,32.467z M1643.029,424.455c0,67.979-47.703,124.986-111.377,139.423
   c-10.179,2.302-20.744,3.563-31.609,3.563s-21.43-1.261-31.607-3.563c-63.684-14.438-111.378-71.444-111.378-139.423
   c0-67.988,47.694-124.995,111.378-139.424c10.178-2.311,20.742-3.563,31.607-3.563s21.431,1.252,31.609,3.563
   C1595.326,299.46,1643.029,356.467,1643.029,424.455z"/>
<path  d="M331.574,1767.534V628.232c98.758-15.257,174.603-100.822,174.603-203.777s-75.845-188.529-174.603-203.777
   V32.467c0-17.454-14.146-31.608-31.608-31.608c-17.454,0-31.608,14.155-31.608,31.608v188.211
   C169.609,235.926,93.763,321.5,93.763,424.455s75.846,188.521,174.594,203.777v1139.302c0,17.453,14.155,31.608,31.608,31.608
   C317.428,1799.143,331.574,1784.987,331.574,1767.534z M156.98,424.455c0-67.988,47.703-124.995,111.377-139.424
   c10.178-2.311,20.752-3.563,31.608-3.563c10.865,0,21.431,1.252,31.608,3.563c63.684,14.429,111.387,71.436,111.387,139.424
   c0,67.979-47.703,124.986-111.387,139.423c-10.178,2.302-20.743,3.563-31.608,3.563c-10.856,0-21.431-1.261-31.608-3.563
   C204.683,549.441,156.98,492.434,156.98,424.455z"/>
<path  d="M931.617,1767.534V1419.51c98.748-15.257,174.594-100.822,174.594-203.777s-75.846-188.529-174.594-203.777
   V32.467c0-17.454-14.154-31.608-31.608-31.608c-17.462,0-31.608,14.155-31.608,31.608v979.488
   c-98.757,15.248-174.603,100.822-174.603,203.777s75.846,188.521,174.603,203.777v348.024c0,17.453,14.146,31.608,31.608,31.608
   C917.463,1799.143,931.617,1784.987,931.617,1767.534z M757.015,1215.732c0-67.986,47.703-124.995,111.386-139.424
   c10.177-2.309,20.743-3.563,31.608-3.563c10.865,0,21.431,1.254,31.608,3.563c63.676,14.429,111.378,71.438,111.378,139.424
   c0,67.979-47.702,124.986-111.378,139.424c-10.178,2.303-20.743,3.563-31.608,3.563c-10.865,0-21.431-1.26-31.608-3.563
   C804.717,1340.719,757.015,1283.711,757.015,1215.732z"/>

</svg>
```
========================[ test_icon.svg ]========================
```
<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001" >
<path fill='#E0DDDF' d="M380.829,250.79c-21.274-26.317-50.561-45.373-83-54.133V8.472c0-4.386-3.555-7.942-7.942-7.942
	h-72.008c-4.386,0-7.942,3.556-7.942,7.942v189.38C142.294,218.055,95.571,280.397,95.571,351.57
	c0,88.462,71.968,160.43,160.43,160.43c88.461,0,160.43-71.968,160.43-160.43C416.431,314.981,403.787,279.19,380.829,250.79z"/>
<path fill='#C1BCBF' d="M241.176,193.961V48.711c0-2.924,2.371-5.295,5.295-5.295h51.359V8.472
	c0-4.386-3.556-7.942-7.942-7.942h-40.769h-31.239c-4.386,0-7.942,3.556-7.942,7.942v34.945v154.434
	C142.294,218.055,95.571,280.397,95.571,351.57c0,88.462,71.968,160.43,160.43,160.43c5.269,0,10.478-0.263,15.619-0.762
	c-81.159-7.879-144.811-76.476-144.811-159.668c0-69.895,45.059-131.271,110.74-152.589
	C239.719,198.277,241.176,196.241,241.176,193.961z"/>
<path fill='#9FD25A' d="M416.424,350.853c-0.014-2.985-1.702-5.712-4.367-7.056c-2.666-1.344-5.861-1.08-8.269,0.685
	c-43.421,31.814-107.049,14.031-132.389,4.909c-0.059-0.021-0.119-0.042-0.178-0.062c-12.42-4.139-25.021-9.442-37.208-14.568
	c-31.705-13.337-64.488-27.128-100.477-23.931c-11.261,0.978-22.089,4.44-32.185,10.289c-2.078,1.203-3.499,3.282-3.867,5.654
	c-1.269,8.171-1.912,16.513-1.912,24.797c0,88.462,71.968,160.43,160.43,160.43c88.461,0,160.43-71.968,160.43-160.43
	L416.424,350.853z"/>

	<path fill='#6EAD32' d="M126.81,351.57c0-13.944,1.801-27.547,5.194-40.563c-10.71,1.15-21.018,4.531-30.654,10.113
		c-2.078,1.203-3.499,3.282-3.867,5.654c-1.269,8.171-1.912,16.513-1.912,24.797c0,88.462,71.968,160.43,160.43,160.43
		c5.269,0,10.478-0.263,15.619-0.762C190.462,503.359,126.81,434.762,126.81,351.57z"/>
	<path fill='#6EAD32' d="M167.579,388.633c-13.722,0-24.885-11.163-24.885-24.885c0-13.722,11.163-24.885,24.885-24.885
		s24.885,11.163,24.885,24.885C192.464,377.469,181.301,388.633,167.579,388.633z"/>
	<path fill='#6EAD32' d="M307.36,474.407c-16.057,0-29.121-13.063-29.121-29.121c0-16.058,13.064-29.121,29.121-29.121
		c16.057,0,29.121,13.063,29.121,29.121C336.481,461.344,323.417,474.407,307.36,474.407z"/>
	<path fill='#6EAD32' d="M208.878,464.877c-13.722,0-24.885-11.163-24.885-24.885c0-13.722,11.163-24.885,24.885-24.885
		c13.722,0,24.885,11.163,24.885,24.885C233.763,453.714,222.6,464.877,208.878,464.877z"/>

	<circle fill='#F9F8F9' cx="347.07" cy="304.976" r="35.475"/>
	<circle fill='#F9F8F9' cx="299.418" cy="242.498" r="23.297"/>

<path fill='#E0DDDF' d="M305.771,31.768H204.113c-8.772,0-15.884-7.112-15.884-15.884l0,0C188.229,7.112,195.34,0,204.113,0
	h101.659c8.772,0,15.884,7.112,15.884,15.884l0,0C321.656,24.656,314.544,31.768,305.771,31.768z"/>
<rect x="254.508" fill='#F9F8F9' width="28.59" height="31.768"/>

	<path fill='#837880' d="M246.329,84.186c5.049,0,9.143-3.556,9.143-7.942c0-4.386-4.094-7.942-9.143-7.942
		c0,0-35.668-0.16-36.392,0v15.884C210.661,84.346,246.329,84.186,246.329,84.186z"/>
	<path fill='#837880' d="M246.329,113.837c5.049,0,9.143-3.556,9.143-7.942c0-4.386-4.094-7.942-9.143-7.942
		c0,0-35.668-0.16-36.392,0v15.884C210.661,113.997,246.329,113.837,246.329,113.837z"/>
	<path fill='#837880' d="M246.329,143.487c5.049,0,9.143-3.556,9.143-7.942s-4.094-7.942-9.143-7.942
		c0,0-35.668-0.16-36.392,0v15.884C210.661,143.647,246.329,143.487,246.329,143.487z"/>
	<path fill='#837880' d="M246.329,173.138c5.049,0,9.143-3.556,9.143-7.942s-4.094-7.942-9.143-7.942
		c0,0-35.668-0.16-36.392,0v15.884C210.661,173.297,246.329,173.138,246.329,173.138z"/>

</svg>

```
========================[ buton.module.css ]========================
```
@import '../../themes/ColorPallet.css';

.btn{
    display: block;
    width: 100px;
    height: 40px;
    background-color: var(--terciary);
    color: var(--white);    
    border-radius: 10px;
    border: 2px solid var(--inactive);
    font-size: 1rem;
}

.btn:hover{
    background-color: var(--active);
}


.sqbtn{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background-color: var(--btn);
    color: var(--white);    
    border-radius: 10px;
    border: 2px solid var(--inactive);
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.sqbtn:hover{
    background-color: var(--btn_active);
}
.sqbtn:disabled{
    background-color: var(--inactive);
    cursor: not-allowed;
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
========================[ UserDropdown.module.css ]========================
```
@import '../../../themes/ColorPallet.css';
.dropdown {
    width: 200px;
    
    position: relative;
  }
  .dropdown .username {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    
  }
  .dropdown .name {
    font-size: 1.2rem;
    font-weight: bold;
    padding-right: 20px;
    
  }
  .dropdown .userIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    background-color: #01AEF0;
    box-shadow: 0 0 5px 0 #01AEF0;
    transition: box-shadow 0.3s ease-out;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 0px;
    background: #6FC308;
  }
  .dropdown .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background-color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 0px;
  }
  .dropdown .userName:hover .userIcon {
    box-shadow: 0 0 15px 0 #01AEF0;
  }
  .dropdown .select-clicked {
    border: 2px solid #6FC308;
    box-shadow: 0 0 10px 0 #6FC308;
  }
  .menu {
    width: 150px;
    list-style: none;
    padding: 5px;
    background-color: var(--primary);
    color: #b6b6b6;
    border-top-left-radius: 20px;
    border-top-right-radius: 0%;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 0%;
    position: absolute;
    top: 50px;
    left: 40%;
    transform: translateX(-50%);
    opacity: 0;
    display: none;
    transition: all 0.5s ease;
    border: 2px solid var(--assert);
    box-shadow: 0 0 5px 1px var(--assert);
    z-index: 2;
  }
  .menu li {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 5px;
    transition: background-color 0.5s ease;
    font-size: 0.8rem;
  }
  .menu li:hover,
  .menu li a:hover {
    color: var(--assert);
    background-color: #515257;
    font-size: 0.9rem;
    
  }
  .menu li a {
    display: flex;
    justify-content: left;
    align-items: center;
    color: #b6b6b6;
    text-decoration: none;
  }
  .menu li a div img{
    width: 30px;
    height: 30px;
    color: #b6b6b6;
  }
  .menu li a :nth-child(1) {
    padding-right: 10px;
  }
  .active {
    background-color: #01AEF0;
  }
  .menuOpen {
    opacity: 1;
    display: block;
  }

  img{
    width: 30px;
    height: 30px;    
  }
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
========================[ Inputs.module.css ]========================
```
@import '../../themes/ColorPallet.css';


.inputText{
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    width: 200px;
    height: 100px;
    font-size: 1.5rem;
    padding: 10px;
    
}


.inputText input[type="text"] {
    width: 100%;
    height: 30px;
    text-align: center;
    margin-top: 5px;
    margin-right: 10px;
    font-size: 1.5rem;
    border: none;
    outline: none;
}
```
========================[ kpi.module.css ]========================
```
@import '../../themes/ColorPallet.css';

.Kpicards {
    display: flex;
    width: 100%;
    height: 100%;    
    background-color: var(--terciary);
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border: 5px solid var(--inactive);
    color: var(--white);
}



.Symbol {
    position: absolute;
    top: -20px;
    left: -20px;
    display: flex;
    width: 60px;
    height: 60px;
    font-size: 2rem;
    font-weight: bold;
    background-color: var(--green);
    justify-content: center;
    align-items: center;
    font-family: Sigmar;
    color: var(--white);
    border-top-left-radius: 50%;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 50%;
    border-top-right-radius: 50%;
    box-shadow: 0 0 10px 0 rgba(0, 255, 0, 0.445);
}

.circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-top-left-radius: 50%;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 50%;
    border-top-right-radius: 50%;
    background-color: var(--white);
    color: var(--black);
}


.CardContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
}

.CardTitle {
    display: flex;
    width: 100%;
    height: 80px;
    padding: 12px 20px 0px 60px;
    justify-content: left;
    align-items: top;
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
    border-bottom-left-radius: 20px;
    
}

.CardInfo {
    display: flex;
    width: 100%;
    justify-content: center;
    border-bottom: 0px;
    border-bottom-left-radius: 20px;
}


.CardInfo ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: var(--PrimaryColor);
    list-style: none;
    border-bottom-left-radius: 20px;
}

.CardInfo ul li {
    display: flex;
    padding: 1px;
    
}

.CardInfo ul li:nth-child(odd) {
     /* background-color: var(--blacktransparent);  */
}

/* .CardInfo ul li:nth-child(1) {
    width: 100%;
    padding: 0 5px;
}

.CardInfo ul li:nth-child(2) {
    width: 50;
    font-weight: 700;
    padding: 0 5px;
} */

.li_card{
    width: 100%;
    
}

.CardInfo ul li .span_key{
    width: 80%;
    font-weight: 700;
    padding: 5px 0 5px 10px;
    text-align-last: left;
}
.CardInfo ul li .span_value{
    width: 20%;
    text-align: right;
    padding-right: 10px;
    
    font-weight: bold;
}
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
========================[ Modal.module.css ]========================
```
@import '../../themes/ColorPallet.css';
.modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    backdrop-filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.1);
  }

  .close_button {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 60px;
    height: 30px;    
    background-color: var(--assert);
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: var(--white);
  }
  
  .close_button::before {
    content: 'x';
    cursor: pointer;
  }
  .close_button:hover {
    color: var(--black);
    font-size: 1.5rem;
  }

  .modalContent{
    width: auto;
    height: auto;
    background-color: var(--background);
    position: relative;
  }
  .modalTitle{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 35px;
    font-size: 1.5rem;
    font-weight: bold;
    background-color:var(--assert); 
}
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
========================[ Tab.module.css ]========================
```
@import '../../themes/ColorPallet.css';

.tab_list{
    display:flex;
    flex-direction: row;
    font-weight: bold;
}

.tab_list div{
    display: flex;    
    padding: 10px 5px 0 10px;
    background: linear-gradient(220deg, transparent 45px, var(--blacktransparent) 10px);
    
}


.tab_list_item {
    list-style: none;    
    padding: 12px 75px 0 18px;
    background: linear-gradient(220deg, transparent 45px, var(--inactive) 10px);
    cursor: pointer;
    color: var(--Color);    
    z-index: 1;
    
    
}

.tab_list_item:nth-child(2) {
    margin-left: -45px;
    
}
.tab_list_item:nth-child(3) {
    margin-left: -45px;
    
}
.tab_list_item:nth-child(4) {
    margin-left: -45px;
    
}
.tab_list_item:nth-child(5) {
    margin-left: -45px;    
}
.tab_list_item:nth-child(6) {
    margin-left: -45px;
}
.tab_list_item:nth-child(7) {
    margin-left: -45px;
}
.tab_list_item:hover {
    background: linear-gradient(220deg, transparent 45px, var(--assert) 10px);
    box-shadow: -4px 0 0 rgba(0, 0, 0, .2); 
    
}

.tab_list_active {    
    background: linear-gradient(220deg, transparent 45px, var(--assert) 10px);
    box-shadow: -4px 0 0 rgba(0, 0, 0, .2);
    z-index: 11;
}

.tab_content {
    display: flex;
    width: 100%;
    height: calc(100dvh - 150px);
    flex-direction: column;
    padding: 8px;
    gap: 10px;    
    background-color:var(--primary);

    
}
.label {
    display: flex;
    width: 200px;    
    align-items: center;
    justify-content: left;
    font-weight: bold;
    text-align: left;
    margin-right: 10px;
  }

  .tab_date{
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 2rem;
    font-weight: bold;
    padding-left: 25%;
    
}

    .tabs{
        display: grid;
        grid-template-columns: auto 1fr;
        width: 100%;
        height: 100%;
        min-width: 1000px;
    }
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
========================[ Header.module.css ]========================
```
@import "../../themes/ColorPallet.css";

header {
    grid-area: header;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    background-color:var(--primary);
  }
  header .date {
    display: flex;
  }
  header .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
  header .dropbox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
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
========================[ SideNavbar.module.css ]========================
```
@import '../../themes/ColorPallet.css';

aside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    grid-area: aside;
    background-color: var(--primary);
  }
  aside .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 86px;
    width: 100%;
    padding: 10px;
  }
  aside .logo img {
    width: 45px;
  }
  aside nav {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
  }
  aside nav ul {
    list-style: none;
    height: 100%;
    font-weight: bold;
  }
  aside nav ul li {
    padding: 5px 10px;
  }
  aside nav ul li a {
    text-decoration: none;
    color: #b6b6b6;
  }
  aside nav ul li div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    padding: 8px;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  aside nav ul li div :nth-child(1) {
    font-size: 1.5rem;
    padding: 5px;
  }
  aside nav ul li div:hover {
    background: #515257;
    color: #01AEF0;
    font-size: 1rem;
  }
  svg{
    fill:var(--assert);
  }
  a:hover svg {   
    fill: var(--assert);
  }
  .active{        
    color: var(--text1);
    
  }
  .active div{        
    background: var(--assert);
    color: var(--white);
    font-size: 1rem;
    
  }
  .active svg{        
    fill: var(--white);    
  }



  
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
========================[ Actionplan.module.css ]========================
```
.container{
    width: 100%;
    height: 100%;
    padding: 10px;
    
}
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
========================[ assignment.module.css ]========================
```
.container{
    width: 100%;
    height: 100%;
    background-color:var(--darkGray);
    padding: 10px;
    
}
```
========================[ Kpi.module.css ]========================
```
@import '../../../themes/ColorPallet.css';

.Dashboard_KPI {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 1.2rem ;
  line-height: 1rem;
  gap: 25px;

  @media (min-width: 1450px) {
    grid-template-columns: repeat(6, 1fr);
  }
}
.Dashboard_Asigment {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  background-color:var(--terciary);
}

.Dashboard_Asigment h1 {
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: var(--primary);
  text-align: center;
  padding: 10px;
}

.Dashboard_Asigment div {
  display: flex;  
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 10px;
  padding-bottom: 0px;
  
  margin-bottom: 10px;
}

.Dashboard_Asigment div h2 {
  width: 200px;
  display: flex;
  text-align: center;
  flex-direction: column;
  border-radius: 8px;
  color: var(--white);
}



.Dashboard_Asigment_title {
  display: flex;
  flex-direction: column;
}


.Dashboard_Asigment div h2 span {
  width: 100%;
  font-size: 3rem;
  color: var(--white);
  text-align: center;
}

.assigmentContainer{
  display: flex;
  width: 650px;
  height: 400px;
  flex-direction: column;
  padding: 20px;
}

.formAssigment{
  display: grid; 
  width: 100%;
  height: 100%;   
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;   
  justify-items: center; 
  
}

.btnSubmit{
  grid-column: 1/4;
  grid-row: 4/5;
  width: 200px;
  height: 40px;
  background-color: var(--active);
  color: var(--white);
  font-size: 1.5rem;
}


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
========================[ Login.module.css ]========================
```
@import '../../themes/ColorPallet.css';

.container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: repeating-linear-gradient(
        -45deg,var(--transparent),
        var(--transparent)40px,
        var(--whitetransparent) 0px,
        var(--whitetransparent) 80px
      );
    
}
.bg {
    position: fixed;
    width: 1500px;;
    height: 1500px;
    bottom: -750px;
    left: -750px;
    background: radial-gradient( circle, rgba(0, 0, 0, 0.562) 0%, rgba(0, 0, 0, 0.473) 10%, rgba(0, 213, 255, 0)60% );
}
.bg2 {
    position: fixed;
    width: 2000px;;
    height: 2000px;
    top: -1000px;
    right: -100px;
    background: radial-gradient( circle, rgba(0, 0, 0, 0.562) 0%, rgba(0, 0, 0, 0.473) 10%, rgba(0, 213, 255, 0) 70% );
}
.login {
    position: relative;
    width: 300px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
}
.login p{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin: 5px;
    background-color: var(--errorColor);
    font-weight: bold;
    width: 100%;
    border-radius: 20px;

}

.login h1 {
    color: var(--blue);
    padding: 10px auto;
}

.login form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 10px;
    padding: 10px;

}
.login .logo{
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;

}
.login .logo img{
    width: 100%;
    height: 100%;
}

.input_text {
    width: 100%;
    height: 25px;
    margin: 5px 0;
    border: none;
    outline: none;
    border-radius: 4px;
    text-align: center;
    background-color:var(--inputTextColor); 
    font-weight: bold;
}

.input_text:focus {
    border: 1px solid var(--blue);
    box-shadow: 0 0 3px 0.5px var(--blue);
}


.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 2px var(--blue);
    background-color: transparent;
    font-size: 0.8rem;
    font-weight: bold;
    color: var(--Color);
    padding: 10px;
  }

.btn:hover {
    box-shadow: 0 0 3px 0.5px var(--blue);
    text-shadow: 0 0 3px var(--blue);
  }
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
========================[ ColorPallet.css ]========================
```
:root {
    --primaryColor: #23262D;
    --secondaryColor: #66666b2d;
    --bgColor: #4a4c4d;
    --assentColor: #01AEF0;
    --Color: #b6b6b6;
    --blue: #01AEF0;
    --lightblue: #01acf073;
    --white: #fff;
    --black: #000;
    --red: #FE0102;
    --green: #6FC308;
    --yellow: #F6B156;
    --orange: #F78E57;
    --gray: #515257;
    --lightGray: #99999916;
    --darkGray: #353232;
    --inputTextColor: rgba(255, 255, 255, 0.562);
    --errorColor: #FE010255;
    --assentColor:  #ad1c1c;

    /* new schema */

    --assert:rgb(216,77,46);
    --active:rgb(216,77,46);
    --inactive:var(--bgColor);
    --background:rgb(43, 78, 99);
    --background2:rgb(69,30,13);
    --primary:rgba(0,0,0,0.5);
    --secondary:rgb(26,33,39);
    --terciary:rgb(74,92,112);
    --text1:rgb(113,135,153);
    --text2:rgb(252,252,252); 
    --transparent:rgba(0,0,0,0.01);
    --whitetransparent:rgba(255,255,255,0.01);
    --blacktransparent:rgba(0,0,0,0.5);
    --btn_active:#ff5131;
    --btn_inactive:#67819c;
    --btn:#33455d;
    --btn_light:#a3bed3;
    
  
  }
```
