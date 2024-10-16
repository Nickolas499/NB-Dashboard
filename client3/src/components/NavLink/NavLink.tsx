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
