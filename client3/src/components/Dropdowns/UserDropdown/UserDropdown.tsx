import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./UserDropdown.module.css";
import { dashboard_icon, charts_icon, profile_icon, test_icon, logout_icon } from '../../../assets/icons/icons';

interface DropdownProps {
  username: string;
  color: string;
  initials: string;
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { Logout } = useAuth();

  const handleSelectClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutsideMenu = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  return (
    <div>
      <div className={`${styles.dropdown}`} ref={menuRef}>
        <div className={`${styles.username}`} onClick={handleSelectClick}>
          <span className={`${styles.name}`}>{props.username}</span>
          <div className={`${styles.userIcon}`} style={{ backgroundColor: props.color, boxShadow: `0 0 5px ${props.color}` }}>
            <div className={`${styles.circle}`}>{props.initials}</div>
          </div>
        </div>
        <ul className={isMenuOpen ? `${styles.menu} ${styles.menuOpen}` : `${styles.menu}`}>
          <li>
            <Link to="/" onClick={handleSelectClick}>
              <div><img src={dashboard_icon}/></div>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/charts" onClick={handleSelectClick}>
              <div><img src={charts_icon} /></div>
              <span>Charts</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={handleSelectClick}>
              <div><img src={profile_icon} /></div>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/test" onClick={handleSelectClick}>
              <div><img src={test_icon}/></div>
              <span>Test</span>
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => Logout()}>
              <div><img  src={logout_icon} /></div>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
