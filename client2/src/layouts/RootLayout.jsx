import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import SideNavbar from "./sideNavbar/SideNavbar";

import React from "react";

const RootLayout = () => {
  return (
    <div className="AppContainer">
      <Header />
      <SideNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
