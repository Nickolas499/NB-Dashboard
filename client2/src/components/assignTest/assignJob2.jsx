import React, { useState } from 'react';
// import UserCards from '../userCard/UserCard';
import style from "./assign.module.css";



const Input = (props) => {
    return (
      <div className="Input">
        
        <input
          id={props.id}
          name={props.name}
          className={style.input}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    );
  };

const AssignJobs = ({ workers, jobs }) => {
  const [assignments, setAssignments] = useState({});
  const [UsersAsigment, setUsersAsigment] = useState([]);
  console.log(UsersAsigment)

  const handleAssignmentChange = (workerId, jobType, value) => {
    const newAssignments = { ...assignments };

    if (!newAssignments[workerId]) {
      newAssignments[workerId] = {};
    }

    newAssignments[workerId][jobType] = value;

    setAssignments(newAssignments);
  };

  const handleJobAssignment = () => {
    const newAssignments = [];

    workers.forEach(worker => {
      const workerJobs = [];
      Object.keys(jobs).forEach(jobType => {
        if (assignments[worker._id]?.[jobType]) {
          workerJobs.push({ [jobType]: assignments[worker._id][jobType] });
        }
      });

      if (workerJobs.length > 0) {
        newAssignments.push({
          Worker: `${worker.fname} ${worker.lname}`,
          Jobs: workerJobs,
          DATE: jobs.DATE
        });
      }
    });

    console.log(newAssignments); // Aquí puedes hacer lo que quieras con los resultados
    setUsersAsigment(newAssignments);

    // Puedes enviar los resultados a una API, guardarlos en el estado, etc.
  };

  return (
    <div className="assignments-container">      
      <section className={style.workertable}>
        <div className={style.head}>
          
          <div className={style.th1}>Worker</div>
            {Object.keys(jobs).slice(0, 7).map((jobType, index) => (
              <div className={style.th1} key={jobType }>{jobType}</div>
            ))}
          
        </div>
        <div className={style.body}>
          {workers.map(worker => (
            <div className={style.tr} key={worker._id}>
              <div className={style.td1}>{worker.fname} {worker.lname}</div>
              {Object.keys(jobs).slice(0, 7).map((jobType, index) => (
                <div className={style.td} key={worker.fname + jobType + index}>
                  <input
                    type="checkbox"
                    id={worker.fname + index + jobType}
                    checked={!!assignments[worker._id]?.[jobType]}
                    onChange={() => handleAssignmentChange(worker._id, jobType, !assignments[worker._id]?.[jobType])}
                  />
                  <Input
                    type="number"
                    value={assignments[worker._id]?.[jobType]}
                    id = {index+ worker.fname + index + jobType}
                    onChange={(e) => handleAssignmentChange(worker._id, jobType, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className={style.btn} onClick={handleJobAssignment}>Asignar trabajos</button>
      </section>    
    </div>
  );
};

export default AssignJobs;
