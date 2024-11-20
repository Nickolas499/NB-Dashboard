import React, { useState } from 'react';
import style from "./assign.module.css";



const Input = ({ id, name, type, placeholder, value, onChange }) => {
  return (
    <div className="Input">
      <input
        id={id}
        name={name}
        className={style.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const AssignJobs = ({ workers, jobs }) => {
  const [assignments, setAssignments] = useState({});
  const [userAssignments, setUserAssignments] = useState([]);

  const handleAssignmentChange = (workerId, jobType, value) => {
    setAssignments(prevAssignments => {
      const newAssignments = { ...prevAssignments };

      if (!newAssignments[workerId]) {
        newAssignments[workerId] = {};
      }

      newAssignments[workerId][jobType] = value;

      return newAssignments;
    });
  };

  const handleJobAssignment = () => {
    const newAssignments = workers.map(worker => {
      const workerJobs = Object.keys(jobs)
        .filter(jobType => assignments[worker._id]?.[jobType])
        .map(jobType => ({ [jobType]: assignments[worker._id][jobType] }));

      if (workerJobs.length > 0) {
        return {
          Worker: `${worker.fname} ${worker.lname}`,
          Jobs: workerJobs,
          DATE: jobs.DATE
        };
      }
      return null;
    }).filter(Boolean);

    setUserAssignments(newAssignments);
    console.log(newAssignments); // You can do whatever you want with the results

    // You can send the results to an API, save them in the state, etc.
  };

  return (
    <div className="assignments-container">      
      <section className={style.workertable}>
        <div className={style.head}>
          
          <div className={style.th1}>DESIGNERS</div>
            {Object.keys(jobs).slice(0, 7).map((jobType, index) => (
              <div className={style.th1} key={index}>{jobType}</div>
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
                    value={assignments[worker._id]?.[jobType] || ''}
                    id = {index+ worker.fname + index + jobType}
                    onChange={(e) => handleAssignmentChange(worker._id, jobType, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className={style.btn} onClick={handleJobAssignment}>Assign Jobs</button>
      </section>    
    </div>
  );
};

export default AssignJobs;
