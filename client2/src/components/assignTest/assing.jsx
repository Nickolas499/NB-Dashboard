import React, { useState } from "react";
// import Assignments from "./Assignments";


const Assing = () => {
  const [workers, setWorkers] = useState([
    {
        id: 1,
      name: "Ezequiel",
    },
    {
        id: 2,
      name: "José",
    },
    {
        id: 3,
      name: "María",
    },
  ]);
  const [jobs, setJobs] = useState([
    {
        id: 1,
      name: "LS3",
      quantity: 5,
    },
    {
        id: 2,
      name: "ZEISS",
      quantity: 4,
    },
    {
        id: 3,
      name: "IBO",
      quantity: 10,
    },
  ]);
  const [assignments, setAssignments] = useState([]);

  const [assignment, setAssignment] = useState({
    worker: "",
    job: "",
    quantity: 5,
  })
 

 
  const handleSubmit = (event) => {
    event.preventDefault();

    const worker = event.target.elements.worker.value;
    const job = event.target.elements.job.value;
    const quantity = event.target.elements.quantity.value;

    setAssignment({
        worker,
        job,
        quantity,
      });

    const existingAssignment = assignments.find((a) => a.worker === worker && a.job === job);
    if (existingAssignment) {
      existingAssignment.quantity += quantity;
    } else {
      setAssignments([
        ...assignments,
        { ...assignment, id: assignments.length + 1 },
      ]);
    }
  };

  const Workers = ({ workers }) => {
    return (
      <div>
        <h2>Trabajadores</h2>
        <ul>
          {workers.map((worker) => (
            <li key={worker.id}>{worker.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  const Jobs = ({ jobs }) => {
    return (
      <div>
        <h2>Trabajos</h2>
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>{job.name}: {job.quantity}</li>
          ))}
        </ul>
      </div>
    );
  };

  const WorkerSelect = ({ workers }) => {
    return (
      <select name="worker" id="worker">
        {workers.map((worker) => (
          <option key={worker.id} value={worker.id}>{worker.name}</option>
        ))}
      </select>
    );
  };
  
  const JobSelect = ({ jobs }) => {
    return (
      <select name="job" id="job">
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>{job.name}: {job.quantity}</option>
        ))}
      </select>
    );
  };
  
  const QuantityInput = ({ value }) => {
    return (
      <input
        type="number"
        name="quantity"
        id="quantity"
        value={value}
      />
    );
  };
  

  return (
    <div>
      <h2>Trabajadores</h2>
      <ul>
        {workers.map((worker) => (
          <li key={worker.id}>{worker.name}</li>
        ))}
      </ul>

      <h2>Trabajos</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>{job.name}: {job.quantity}</li>
        ))}
      </ul>

      <h2>Asignaciones</h2>
      <table>
        <thead>
          <tr>
            <th>Trabajador</th>
            <th>Trabajo</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.worker.name}</td>
              <td>{assignment.job.name}</td>
              <td>{assignment.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Trabajador</label>
          <WorkerSelect workers={workers} />
        </div>
        <div>
          <label>Trabajo</label>
          <JobSelect jobs={jobs} />
        </div>
        <div>
          <label>Cantidad</label>
          <QuantityInput value={assignment.quantity} />
        </div>
        <button type="submit">Asignar</button>
      </form>
    </div>
  );
};




export default Assing