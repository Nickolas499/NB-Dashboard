import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./UserDropdown.module.css";

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
    <div className={`${styles.test}`}>
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
              <span className={`${styles.materialSymbolsOutlined}`}>grid_view</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/charts" onClick={() => handleSelectClick()}>
              <span className={`${styles.materialSymbolsOutlined}`}>Monitoring</span>
              <span>Charts</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => handleSelectClick()}>
              <span className={`${styles.materialSymbolsOutlined}`}>person</span>
              <span>Profile</span>
            </Link>
          </li>         
          <li>
            <Link to="/test" onClick={() => handleSelectClick()}>
              <span className={`${styles.materialSymbolsOutlined}`}>T</span>
              <span>Test</span>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => Logout() }>
              <span className={`${styles.materialSymbolsOutlined}`}>Logout</span>
              <span>Logout</span>
            </Link>
          </li>
        </ul>        
      </div>
    </div>
  );
};
