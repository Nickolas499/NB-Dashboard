import { Dropdown } from "../../components/Dropdowns/UserDropdown/UserDropdown.jsx";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";



export const Header = (props) => {
  const { user } = useAuth();
//   const fname = user.fname;
//   const lname = user.lname;
//   const userColor = user.color;
//   const Username = fname + " " + lname;



  function getInitials(firstName, lastName) {
    const initials = `${firstName[0]}${lastName[0]}`;
    return initials.toUpperCase();
  }

  return (
    <header>
      <div className={`${styles.date}`}></div>
      <div className={`${styles.title}`}>
        <h1>{props.title}</h1>
      </div>
      <div className={`${styles.dropbox}`}>
        <Dropdown
          logout={props.logout}
          username={"Username"}
        //   initials={getInitials(fname, lname)}
        initials="EA"
          color={"#fff"}
        />
      </div>
    </header>
  );
};
