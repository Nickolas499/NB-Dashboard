import React, { useState, useEffect } from "react";
import moment from "moment";
import style from "./UserForm.module.css";
import { useAuth } from "../../context/authContext";
import { useWork } from "../../context/workContext";

const UserForm = () => {
  const today = moment().format("MM/DD/YYYY");

  const { GetWork, Work, CreateJob, GetJob, UpdateJob, Job } = useWork();
  useEffect(() => {
    GetWork();
    GetJob();
  }, []);

  const { GetUsers, usuarios } = useAuth();
  useEffect(() => {
    GetUsers();
  }, []);

  console.log(Work);
  console.log(Job);

  const [assignedWork, setAssignedWork] = useState({
    LS3: [],
    ZEISS: [],
    SHAPE: [],
    IBOS: [],
    DIGI_ABUT: [],
    PHIS_ABUT: [],
    FULL_ARCH: [],
    DAY_OFF: [],
    DATE: moment().format("MM/DD/YYYY"),
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

  const production = (pro, designers) => {
    return Math.floor(pro / designers);
  };

  function getAssignedWork() {
    const assignedData = {};
    Object.entries(assignedWork).forEach(([key, value]) => {
      if (key === "DAY_OFF") {
        assignedData[key] = value.reduce((acc, user) => {
          acc[user] = 1;
          return acc;
        }, {});
      } else if (Array.isArray(value) && value.length > 0) {
        assignedData[key] = value.reduce((acc, user) => {
          acc[user] = production(Work[key], value.length);
          return acc;
        }, {});
      } else {
        assignedData[key] = {};
      }
    });
    assignedData.DATE = today;

    // Verificar si ya existe una asignación para la fecha actual
    const existingJob =  Job.DATE === today ? true : false;
    if (existingJob) {
      // Actualizar la asignación existente
      UpdateJob(existingJob._id, assignedData);
    } else {
      // Crear una nueva asignación
      CreateJob(assignedData);
    }
  }

  return (
    <div className={style.frame}>
      <div className={style.header}>
        <div className={style.header_title}>
          <div>
            <span className={style.span}></span>
          </div>
        </div>
        <div className={style.header_title}>
          <div>
            <span className={style.span}>LS3</span>
          </div>
        </div>
        <div className={style.header_title}>
          <div>
            <span className={style.span}>ZEISS</span>
          </div>
        </div>
        <div className={style.header_title}>
          <div>
            <span className={style.span}>3SHAPE</span>
          </div>
        </div>
        <div className={style.header_title}>
          <div>
            <span className={style.span}>IBO</span>
          </div>
        </div>
        <div className={style.header_title}>
          <div>
            <span className={style.span}>DIGITAL ABUTMEN</span>
          </div>
        </div>
        <div className={style.header_title}>
          <div>
            <span className={style.span}>PHISICAL ABUTMEN</span>
          </div>
        </div>
        <div className={style.header_title}>
          <div>
            <span className={style.span}>FULL ARCH</span>
          </div>
        </div>
        <div className={style.header_title}>
          <div>
            <span className={style.span}>OFF</span>
          </div>
        </div>
      </div>
      <div className={style.workers}>
        {usuarios.map((user) => (
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
          Assign
        </button>
      </div>
    </div>
  );
};

export default UserForm;
