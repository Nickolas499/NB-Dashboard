import Logo from "../../img/logo.svg";
// import { useAuth } from "../../context/AuthContext";
import styles from  "./SideNavbar.module.css";
import {dashboard_icon,charts_icon,profile_icon,assign_icon,test_icon} from '../../img/icons.js'
import NavLink from "../../components/NavLink/NavLink.jsx";



const SideNavbar = () => {
  // const { user } = useAuth();
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
          <li><NavLink to="/test" styles={styles.active}><div>{test_icon}<span>Test</span></div></NavLink></li>
          <li><NavLink to="/test2" styles={styles.active}><div>{test_icon}<span>Test2</span></div></NavLink></li>
          <li><NavLink to="/Asign" styles={styles.active}><div>{assign_icon}<span>Asign</span></div></NavLink></li>
          {/* {user.access === "admin"?<li><Link to="/admin"><div>{}<span>Admin</span></div></Link></li>:""} */}
        </ul>
      </nav>
    </aside>
  )
}

export default SideNavbar