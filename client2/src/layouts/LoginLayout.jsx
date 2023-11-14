import { Navigate , Outlet } from "react-router-dom";


import React from 'react'

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