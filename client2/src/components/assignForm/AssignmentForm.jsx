import React, { useState } from 'react';

function AssignmentForm({ workers, jobs, assignWork }) {
  const [selectedWorker, setSelectedWorker] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [workerJobs, setWorkerJobs] = useState([]);

  const handleAddJob = () => {
    const newJob = { worker: selectedWorker, job: selectedJob, quantity };
    setWorkerJobs([...workerJobs, newJob]);
    setSelectedJob('');
    setQuantity(0);
  };

  const handleAssignment = () => {
    // Lógica para asignar trabajo al trabajador
    workerJobs.forEach(({ worker, job, quantity }) => {
      assignWork(worker, job, quantity);
    });
  };

  return (
    <div>
      <h2>Formulario de Asignación</h2>
      <label>
        Trabajador:
        <ul>
          {workers.map((worker, index) => (
            <li key={index}>{worker}</li>
          ))}
        </ul>
      </label>
      <label>
        Trabajo:
        <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
          <option value="">Seleccionar Trabajo</option>
          {Object.keys(jobs).map((job, index) => (
            <option key={index} value={job}>{job}</option>
          ))}
        </select>
      </label>
      <label>
        Cantidad:
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </label>
      <button onClick={handleAddJob}>Añadir Trabajo al Trabajador</button>
      <button onClick={handleAssignment}>Realizar Asignación</button>
    </div>
  );
}

export default AssignmentForm;