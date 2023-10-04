import React, { useState } from "react";
import style from "./UserForm.module.css"

const UserForm = ({ users }) => {
  const [assignedWork, setAssignedWork] = useState({
    LS3: [],
    ZEISS: [],
    SHAPE: [],
    IBOS: [],
    DIGI_ABUT: [],
    PHIS_ABUT: [],
    FULL_ARCH: [],
  });

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setAssignedWork((prevState) => ({
      ...prevState,
      [name]: checked ? [...prevState[name], value] : prevState[name].filter(v => v !== value),
    }));
  };

  function getInitials(firstName, lastName) {
    const initials = `${firstName[0]}${lastName[0]}`;
    return initials.toUpperCase();
  }

  return (
    <div >
      {users.map((user) => (
        <div className={style.container} key={user._id}>
          <div className={style.workerList} ><div className={style.logo } style={{backgroundColor: `${user.color}`}}>{getInitials(user.fname,user.lname)}</div> <h3>{`${user.fname} ${user.lname}`}</h3></div>
          <div className={style.inputContainer}>
          <label className={style.label}>LS3:</label> 
            <input
              type="checkbox"
              name="LS3"
              value={user._id}
              checked={assignedWork.LS3.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className={style.inputContainer}>
          <label className={style.label}>ZEISS:</label> 
            <input
              type="checkbox"
              name="ZEISS"
              value={user._id}
              checked={assignedWork.ZEISS.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className={style.inputContainer}>
          <label className={style.label}>3SHAPE:</label> 
            <input
              type="checkbox"
              name="SHAPE"
              value={user._id}
              checked={assignedWork.SHAPE.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className={style.inputContainer}>
          <label className={style.label}>IBOS:</label> 
            <input
              type="checkbox"
              name="IBOS"
              value={user._id}
              checked={assignedWork.IBOS.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className={style.inputContainer}>
          <label className={style.label}>DIGI_ABUT:</label> 
            <input
              type="checkbox"
              name="DIGI_ABUT"
              value={user._id}
              checked={assignedWork.DIGI_ABUT.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className={style.inputContainer}> 
          <label className={style.label}>PHIS_ABUT:</label> 
            <input
              type="checkbox"
              name="PHIS_ABUT"
              value={user._id}
              checked={assignedWork.PHIS_ABUT.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className={style.inputContainer}>
          <label className={style.label}>FULL_ARCH:</label> 
            <input
              type="checkbox"
              name="FULL_ARCH"
              value={user._id}
              checked={assignedWork.FULL_ARCH.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserForm;
