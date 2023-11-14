import Logo from "../../img/logo.svg";
import { Link ,NavLink} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from  "./SideNavbar.module.css";

const SideNavbar = () => {
  // const { user } = useAuth();
  return (
    <aside>
      <div className={`${styles.logo}`}>
        <img src={Logo} alt="Nobel Biocare" />
      </div>
      <nav>
        <ul>
          <li><NavLink to="/"><div><span className={`${styles.materialSymbolsOutlined}`}>grid_view</span><span>Dashboard</span></div></NavLink></li>          
          <li><NavLink to="/charts"><div><span className={`${styles.materialSymbolsOutlined}`}>Monitoring</span><span>Charts</span></div></NavLink></li>
          <li><NavLink to="/profile"><div><span className={`${styles.materialSymbolsOutlined}`}>person</span><span>Profile</span></div></NavLink></li>
          <li><NavLink to="/test"><div><span className={`${styles.materialSymbolsOutlined}`}>T</span><span>Test</span></div></NavLink></li>
          <li><NavLink to="/test2"><div><span className={`${styles.materialSymbolsOutlined}`}>T</span><span>Test2</span></div></NavLink></li>
          <li><NavLink to="/Asign"><div><span className={`${styles.materialSymbolsOutlined}`}>Settings</span><span>Asign</span></div></NavLink></li>
          {/* {user.access === "admin"?<li><Link to="/admin"><div> <span className="material-symbols-outlined">Shield </span><span>Admin</span></div></Link></li>:""} */}
        </ul>
      </nav>
    </aside>
  )
}

export default SideNavbar