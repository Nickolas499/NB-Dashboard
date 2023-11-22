import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./UserDropdown.module.css";
import {dashboard_icon,charts_icon,profile_icon,test_icon,logout_icon} from '../../../img/icons.js';



export const Dropdown = (props) => {  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
 
  const {Logout} = useAuth();

  const handleSelectClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
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
          <div className={`${styles.userIcon}`} style={{ backgroundColor: props.color,boxShadow: `0 0 5px ${props.color}` }}>
            <div className={`${styles.circle}`}>{props.initials}</div>
          </div>
        </div>
        <ul className={isMenuOpen ? `${styles.menu } ${styles.menuOpen}` : `${styles.menu}`}>
          <li>
            <Link to="/" onClick={() => handleSelectClick()}>
              <div>{dashboard_icon}</div>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/charts" onClick={() => handleSelectClick()}>
              <div>{charts_icon}</div>
              <span>Charts</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => handleSelectClick()}>
              <div>{profile_icon}</div>
              <span>Profile</span>
            </Link>
          </li>         
          <li>
            <Link to="/test" onClick={() => handleSelectClick()}>
              <div>{test_icon}</div>
              <span>Test</span>
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => Logout() }>
              <div>{logout_icon}</div>
              <span>Logout</span>
            </Link>
          </li>
        </ul>        
      </div>
    </div>
  );
};
