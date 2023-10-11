import React, { useState } from "react";
import style from "./UserForm.module.css";
import moment from "moment";

const UserForm = ({ users }) => {
  const today = moment().format("MM/DD/YYYY");

  const [assignedWork, setAssignedWork] = useState({
    LS3: [],
    ZEISS: [],
    SHAPE: [],
    IBOS: [],
    DIGI_ABUT: [],
    PHIS_ABUT: [],
    FULL_ARCH: [],
    DAY_OFF: [],
    DATE: today,
  });

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setAssignedWork((prevState) => ({
      ...prevState,
      [name]: checked
        ? [...prevState[name], value]
        : prevState[name].filter((v) => v !== value),
    }));
  };

  function getInitials(firstName, lastName) {
    const initials = `${firstName[0]}${lastName[0]}`;
    return initials.toUpperCase();
  }

  function getAssignedWork() {
    console.log(assignedWork);
  }

  return (
    <div className={style.frame}>
      <div className={style.header}>
        <article className={style.article}>
          <div>
            <span className={style.span}></span>
          </div>
        </article>
        <article className={style.article}>
          <div>
            <span className={style.span}>LS3</span>
          </div>
        </article>
        <article className={style.article}>
          <div>
            <span className={style.span}>ZEISS</span>
          </div>
        </article>
        <article className={style.article}>
          <div>
            <span className={style.span}>3SHAPE</span>
          </div>
        </article>
        <article className={style.article}>
          <div>
            <span className={style.span}>IBO</span>
          </div>
        </article>
        <article className={style.article}>
          <div>
            <span className={style.span}>DIGITAL ABUTMEN</span>
          </div>
        </article>
        <article className={style.article}>
          <div>
            <span className={style.span}>PHISICAL ABUTMEN</span>
          </div>
        </article>
        <article className={style.article}>
          <div>
            <span className={style.span}>FULL ARCH</span>
          </div>
        </article>
        <article className={style.article}>
          <div>
            <span className={style.span}>OFF</span>
          </div>
        </article>
      </div>
      <div className={style.workers}>
        {users.map((user) => (
          <div className={style.container} key={user._id}>
            <div className={style.workerList}>
              <div
                className={style.logo}
                style={{ backgroundColor: `${user.color}` }}
              >
                {getInitials(user.fname, user.lname)}
              </div>{" "}
              <h3>{`${user.fname} ${user.lname}`}</h3>
            </div>
            <article className={style.article}>
              <input
                type="checkbox"
                id="feature1"
                name="LS3"
                value={user._id}
                checked={assignedWork.LS3.includes(user._id)}
                onChange={handleCheckboxChange}
              />
              <div>
                <span className={style.span}>LS3</span>
              </div>
            </article>
            <article className={style.article}>
              <input
                type="checkbox"
                id="feature1"
                name="ZEISS"
                value={user._id}
                checked={assignedWork.ZEISS.includes(user._id)}
                onChange={handleCheckboxChange}
              />
              <div>
                <span className={style.span}>ZEISS</span>
              </div>
            </article>
            <article className={style.article}>
              <input
                type="checkbox"
                id="feature1"
                name="SHAPE"
                value={user._id}
                checked={assignedWork.SHAPE.includes(user._id)}
                onChange={handleCheckboxChange}
              />
              <div>
                <span className={style.span}>3SHAPE</span>
              </div>
            </article>
            <article className={style.article}>
              <input
                type="checkbox"
                id="feature1"
                name="IBOS"
                value={user._id}
                checked={assignedWork.IBOS.includes(user._id)}
                onChange={handleCheckboxChange}
              />
              <div>
                <span className={style.span}>IBO</span>
              </div>
            </article>
            <article className={style.article}>
              <input
                type="checkbox"
                id="feature1"
                name="DIGI_ABUT"
                value={user._id}
                checked={assignedWork.DIGI_ABUT.includes(user._id)}
                onChange={handleCheckboxChange}
              />
              <div>
                <span className={style.span}>DIGITAL ABUTMEN</span>
              </div>
            </article>
            <article className={style.article}>
              <input
                type="checkbox"
                id="feature1"
                name="PHIS_ABUT"
                value={user._id}
                checked={assignedWork.PHIS_ABUT.includes(user._id)}
                onChange={handleCheckboxChange}
              />
              <div>
                <span className={style.span}>PHISICAL ABUTMEN</span>
              </div>
            </article>
            <article className={style.article}>
              <input
                type="checkbox"
                id="feature1"
                name="FULL_ARCH"
                value={user._id}
                checked={assignedWork.FULL_ARCH.includes(user._id)}
                onChange={handleCheckboxChange}
              />
              <div>
                <span className={style.span}>FULL ARCH</span>
              </div>
            </article>
            <article className={style.article}>
              <input
                type="checkbox"
                id="feature1"
                name="DAY_OFF"                
                value={user._id}
                checked={assignedWork.DAY_OFF.includes(user._id)}
                onChange={handleCheckboxChange}
              />
              <div>
                <span className={style.span}>DAY OFF</span>
              </div>
            </article>
          </div>
        ))}
      </div>
      <div className={style.footer}>
        <button className={style.btn} onClick={getAssignedWork}>
          Asign
        </button>
      </div>
    </div>
  );
};

export default UserForm;
