import Logo from "../../assets/icons/logo.svg";
import { useAuth } from "../../context/AuthContext";
import styles from "./SideNavbar.module.css";
import { dashboard_icon, charts_icon, profile_icon, assign_icon, test_icon, settings_icon } from '../../assets/icons/icons';
import NavLink from "../../components/NavLink/NavLink";

const SideNavbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <aside>
      <div className={`${styles.logo}`}>
        <img src={Logo} alt="Nobel Biocare" />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" styles={styles.active}>
              <div><img src={dashboard_icon} alt="" /><span>Dashboard</span></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/charts" styles={styles.active}>
              <div><img src={charts_icon} alt="" /><span>Charts</span></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" styles={styles.active}>
              <div><img src={profile_icon} alt="" /><span>Profile</span></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/test" styles={styles.active}>
              <div><img src={test_icon} alt="" /><span>Test</span></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/test2" styles={styles.active}>
              <div><img src={test_icon} alt="" /><span>Test2</span></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/assignments" styles={styles.active}>
              <div><img src={assign_icon} alt="" /><span>Assign</span></div>
            </NavLink>
          </li>
          {user?.access === "admin" && (
            <li>
              <NavLink to="/admin" styles={styles.active}>
                <div><img src={settings_icon} alt="" /><span>Admin</span></div>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavbar;
