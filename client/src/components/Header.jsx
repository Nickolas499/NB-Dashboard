import { Dropdown } from "./Dropdown";
import { useAuth } from "../context/authContext";
export const Header = (props) => {
  const { user } = useAuth();
  const fname = user.fname;
  const lname = user.lname;
  const userColor = user.color;
  const Username = fname + " " + lname;



  function getInitials(firstName, lastName) {
    const initials = `${firstName[0]}${lastName[0]}`;
    return initials.toUpperCase();
  }

  return (
    <header>
      <div className="date"></div>
      <div className="title">
        <h1>{props.title}</h1>
      </div>
      <div className="dropbox">
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
