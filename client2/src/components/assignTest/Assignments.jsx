import React, { useState } from "react";

const Assignments = ({assignment}) => {
    const [workers, setWorkers] = useState([
        {
          name: "Ezequiel",
        },
        {
          name: "José",
        },
        {
          name: "María",
        },
      ]);
    const [jobs, setJobs] = useState([
        {
          name: "LS3",
          quantity: 5,
        },
        {
          name: "ZEISS",
          quantity: 4,
        },
        {
          name: "IBO",
          quantity: 10,
        },
      ]);
    const [assignments, setAssignments] = useState([]);
  
    
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const worker = event.target.elements.worker.value;
      const job = event.target.elements.job.value;
      const quantity = event.target.elements.quantity.value;
  
      const assignment = {
        worker,
        job,
        quantity,
      };
  
      const existingAssignment = assignments.find((a) => a.worker === worker && a.job === job);
      if (existingAssignment) {
        existingAssignment.quantity += quantity;
      } else {
        setAssignments([
          ...assignments,
          assignment,
        ]);
      }
    };
  
    return (
      <div>
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
  

