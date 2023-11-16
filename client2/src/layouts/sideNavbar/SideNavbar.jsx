import Logo from "../../img/logo.svg";
import { Link ,NavLink} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from  "./SideNavbar.module.css";
import dash_icon from '../../img/icons/dashboard.svg';
import charts_icon from '../../img/icons/chart.svg';
import profile_icon from '../../img/icons/profile.svg';
import test1_icon from '../../img/icons/test1.svg';
import test2_icon from '../../img/icons/test2.svg';
import test3_icon from '../../img/icons/test3.svg';
import admin_icon from '../../img/icons/admin.svg';
import assign_icon from '../../img/icons/assign.svg';

const SideNavbar = () => {
  // const { user } = useAuth();
  return (
    <aside>
      <div className={`${styles.logo}`}>
        <img src={Logo} alt="Nobel Biocare" />
      </div>
      <nav>
        <ul>
          <li><NavLink to="/"><div><img className={styles.icons} src={dash_icon} alt="" /><span>Dashboard</span></div></NavLink></li>          
          <li><NavLink to="/charts"><div><img className={styles.icons} src={charts_icon} alt="" /><span>Charts</span></div></NavLink></li>
          <li><NavLink to="/profile"><div> <img className={styles.icons} src={profile_icon} alt="" /><span>Profile</span></div></NavLink></li>
          <li><NavLink to="/test"><div><img className={styles.icons} src={test1_icon} alt="" /><span>Test</span></div></NavLink></li>
          <li><NavLink to="/test2"><div><img className={styles.icons} src={test2_icon} alt="" /><span>Test2</span></div></NavLink></li>
          <li><NavLink to="/Asign"><div><img className={styles.icons} src={assign_icon} alt="" /><span>Asign</span></div></NavLink></li>
          {/* {user.access === "admin"?<li><Link to="/admin"><div> <img className={styles.icons} src={admin_icon} alt="" /><span>Admin</span></div></Link></li>:""} */}
        </ul>
      </nav>
    </aside>
  )
}

export default SideNavbar