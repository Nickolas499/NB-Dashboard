import { Dropdown } from "../../components/Dropdowns/UserDropdown/UserDropdown.jsx";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";



export const Header = (props) => {
  const { user } = useAuth();
//   const fname = user.fname;
//   const lname = user.lname;
//   const userColor = user.color;
//   const Username = fname + " " + lname;
const location = useLocation();
const getTitle = () => {
  switch(location.pathname) {
    case "/":
      return "Dashboard";
    case "/profile":
      return "Profile";
    case "/charts":
      return "Charts";
      case "/admin":
      return "Admin";
    case "/test":
      return "Test";
    case "/test2":
      return "Test2";
    case "/Asign":
      return "Asign";
    default:
      return "Dashboard";
  }
};
 
  function getInitials(firstName, lastName) {
    const initials = `${firstName[0]}${lastName[0]}`;
    return initials.toUpperCase();
  }

  return (
    <header>
      <div className={`${styles.date}`}></div>
      <div className={`${styles.title}`}>
        <h1>{getTitle()}</h1>
      </div>
      <div className={`${styles.dropbox}`}>
        <Dropdown
          logout={props.logout}
          username={"Ezequiel Almonte"}
        //   initials={getInitials(fname, lname)}
        initials="EA"
          color={"#fff"}
        />
      </div>
    </header>
  );
};
