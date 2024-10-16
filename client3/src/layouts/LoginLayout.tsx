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