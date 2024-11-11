import Logo from "../../img/logo.svg";
import { useAuth } from "../../context/AuthContext";
import styles from  "./SideNavbar.module.css";
import {dashboard_icon,charts_icon,profile_icon,assign_icon,test_icon,settings_icon} from '../../img/icons.js'
import NavLink from "../../components/NavLink/NavLink.jsx";



const SideNavbar = () => {
  const { user } = useAuth();
  return (
    <aside>
      <div className={`${styles.logo}`}>
        <img src={Logo} alt="Nobel Biocare" />
      </div>
      <nav>
        <ul>
          <li><NavLink to="/" styles={styles.active}><div>{dashboard_icon}<span>Dashboard</span></div></NavLink></li>          
          <li><NavLink to="/charts" styles={styles.active}><div>{charts_icon}<span>Charts</span></div></NavLink></li>
          <li><NavLink to="/profile" styles={styles.active}><div>{profile_icon} <span>Profile</span></div></NavLink></li>
          <li><NavLink to="/production" styles={styles.active}><div>{test_icon}<span>Productio</span></div></NavLink></li>
          <li><NavLink to="/test2" styles={styles.active}><div>{test_icon}<span>Test2</span></div></NavLink></li>
          <li><NavLink to="/assigments" styles={styles.active}><div>{assign_icon}<span>Asign</span></div></NavLink></li>
          {user.access === "admin"?<li><NavLink to="/admin" styles={styles.active}><div>{settings_icon}<span>Admin</span></div></NavLink></li>:""}
        </ul>
      </nav>
    </aside>
  )
}

export default SideNavbar