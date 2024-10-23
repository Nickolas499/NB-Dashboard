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
