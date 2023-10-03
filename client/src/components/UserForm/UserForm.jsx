import React, { useState } from "react";

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

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <h3>{`${user.fname} ${user.lname}`}</h3>
          <label>
            LS3:
            <input
              type="checkbox"
              name="LS3"
              value={user._id}
              checked={assignedWork.LS3.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            ZEISS:
            <input
              type="checkbox"
              name="ZEISS"
              value={user._id}
              checked={assignedWork.ZEISS.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            SHAPE:
            <input
              type="checkbox"
              name="SHAPE"
              value={user._id}
              checked={assignedWork.SHAPE.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            IBOS:
            <input
              type="checkbox"
              name="IBOS"
              value={user._id}
              checked={assignedWork.IBOS.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            DIGI_ABUT:
            <input
              type="checkbox"
              name="DIGI_ABUT"
              value={user._id}
              checked={assignedWork.DIGI_ABUT.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            PHIS_ABUT:
            <input
              type="checkbox"
              name="PHIS_ABUT"
              value={user._id}
              checked={assignedWork.PHIS_ABUT.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            FULL_ARCH:
            <input
              type="checkbox"
              name="FULL_ARCH"
              value={user._id}
              checked={assignedWork.FULL_ARCH.includes(user._id)}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default UserForm;
