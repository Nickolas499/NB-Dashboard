import { NavLink as RouterNavLink } from "react-router-dom";

import React from 'react'

const NavLink = ({to, children, styles, ...props }) => {
  return (
  <RouterNavLink 
  {...props}
  className={({ isActive }) => {
    return isActive ? styles : undefined
  }}
   to={to}>
    {children}
  </RouterNavLink>
  )
}

export default NavLink