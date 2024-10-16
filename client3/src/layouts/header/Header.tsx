import { Dropdown } from "../../components/Dropdowns/UserDropdown/UserDropdown";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  logout: () => void;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { user } = useAuth();
  const fname = user.fname;
  const lname = user.lname;
  const userColor = user.color;
  const Username = `${fname} ${lname}`;
  const location = useLocation();

  const getTitle = (): string => {
    switch (location.pathname) {
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
      case "/assignments":
        return "Assignments";
      default:
        return "Dashboard";
    }
  };

  const getInitials = (firstName: string, lastName: string): string => {
    const initials = `${firstName[0]}${lastName[0]}`;
    return initials.toUpperCase();
  };

  return (
    <header>
      <div className={`${styles.date}`}></div>
      <div className={`${styles.title}`}>
        <h1>{getTitle()}</h1>
      </div>
      <div className={`${styles.dropbox}`}>
        <Dropdown
          logout={props.logout}
          username={Username}
          initials={getInitials(fname, lname)}
          color={userColor}
        />
      </div>
    </header>
  );
};
