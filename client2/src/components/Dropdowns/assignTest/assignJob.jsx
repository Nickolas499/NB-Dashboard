import React, { useState } from 'react';
import UserCards from '../userCard/UserCard';
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
    <div>
      <h2>Asignación de trabajos</h2>
      <table className={style.workertable}>
        <thead className={style.head}>
          <tr className={style.th1}>
            <th className={style.th}>Trabajador</th>
            {Object.keys(jobs).map((jobType, index) => (
              <th className={style.th} key={index}>{jobType}</th>
            ))}
          </tr>
        </thead>
        <tbody className={style.body}>
          {workers.map(worker => (
            <tr className={style.tr} key={worker._id}>
              <td className={style.td1}>{worker.fname} {worker.lname}</td>
              {Object.keys(jobs).slice(0, 7).map((jobType, index) => (
                <td className={style.td} key={index}>
                  <input
                    type="checkbox"
                    checked={!!assignments[worker._id]?.[jobType]}
                    onChange={() => handleAssignmentChange(worker._id, jobType, !assignments[worker._id]?.[jobType])}
                  />
                  <Input
                    type="number"
                    value={assignments[worker._id]?.[jobType]}
                    id = {worker._id + jobType}
                    onChange={(e) => handleAssignmentChange(worker._id, jobType, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className={style.btn} onClick={handleJobAssignment}>Asignar trabajos</button>
      <section className="UsersAsigment">
        {UsersAsigment.map((card, index) => (
        //   <UserCards
        //     key={index}
        //     initials={card.fname}
        //     name={card.fname}
        //     color={card.color}
        //     shadow={card.shadow}
        //     data={card.data}
        //   />
        <li>{card.worker}</li>
        
        ))}
      </section>
    </div>
  );
};

export default AssignJobs;
