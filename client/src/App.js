import { Header } from "./components/Header";
import { Aside } from "./components/Aside";
import { Route, Routes, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Charts } from "./pages/Charts";
import { Profile } from "./pages/Profile";
import { Admin } from "./pages/Admin";
import { Test } from "./pages/Test";

function App() {
//*************************************************************************************//
//  Obtiene información sobre la ruta actual                                          //
//  Define una función para obtener el título según la ruta actual                     //
//*************************************************************************************//
  const location = useLocation(); 
  const getTitle = () => {
    switch(location.pathname) {
      case "/":
        return "Dashboard";
      case "/profile":
        return "Profile";
      case "/charts":
        return "Charts";
        case "/admin":
        return "Admin";
      default:
        return "Dashboard";
    }
  };
  return (
    <div className="AppContainer">
      <Header title={getTitle()}/>
      <Aside/>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/charts" element={<Charts/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
