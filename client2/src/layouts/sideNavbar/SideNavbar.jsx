import Logo from "../../img/logo.svg";
import { Link ,NavLink} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from  "./SideNavbar.module.css";
import {dashboard_icon,charts_icon,profile_icon,assign_icon,test_icon} from '../../img/icons.js'




const SideNavbar = () => {
  // const { user } = useAuth();
  return (
    <aside>
      <div className={`${styles.logo}`}>
        <img src={Logo} alt="Nobel Biocare" />
      </div>
      <nav>
        <ul>
          <li><NavLink to="/"><div>{dashboard_icon}<span>Dashboard</span></div></NavLink></li>          
          <li><NavLink to="/charts"><div>{charts_icon}<span>Charts</span></div></NavLink></li>
          <li><NavLink to="/profile"><div>{profile_icon} <span>Profile</span></div></NavLink></li>
          <li><NavLink to="/test"><div>{test_icon}<span>Test</span></div></NavLink></li>
          <li><NavLink to="/test2"><div>{test_icon}<span>Test2</span></div></NavLink></li>
          <li><NavLink to="/Asign"><div>{assign_icon}<span>Asign</span></div></NavLink></li>
          {/* {user.access === "admin"?<li><Link to="/admin"><div>{}<span>Admin</span></div></Link></li>:""} */}
        </ul>
      </nav>
    </aside>
  )
}

export default SideNavbar