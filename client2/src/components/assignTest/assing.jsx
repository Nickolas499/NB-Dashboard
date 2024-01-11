import React, { useState } from "react";
import style from "./assign.module.css";


function Assing({ workers, jobs }) {
  const [date, setDate] = useState(new Date());
  const [assignments, setAssignments] = useState(
    workers.reduce((acc, worker) => {
      acc[worker.id] = {};
      Object.keys(jobs).forEach((job) => {
        acc[worker.id][job] = 0;
      });
      return acc;
    }, {})
  );
  const [pending, setPending] = useState(false);

  const sendToBackend = (updatedAssignments) => {
    // Replace this with the actual code to send the updated assignments to the backend
    console.log(
      "Sending updated assignments to the backend:",
      updatedAssignments
    );
    // Example: send data to backend API
  };

  const handleSubmit = () => {
    setPending(true);

    // Validaciones
    let valid = true;

    Object.keys(assignments).forEach((workerId) => {
      Object.keys(assignments[workerId]).forEach((job) => {
        if (isNaN(assignments[workerId][job])) {
          valid = false;
        }
      });
    });

    const totalAssigned = calcTotalAssigned(assignments);
    const availableJobs = Object.values(jobs).reduce(
      (acc, val) => acc + val,
      0
    );
    if (totalAssigned > availableJobs) {
      valid = false;
    }

    if (!valid) {
      setPending(false);
      return;
    }

    // Guardar asignaciones
    const updatedAssignments = workers.map((worker) => ({
      ...assignments[worker.id],
      date: date,
    }));

    setAssignments(updatedAssignments);

    // Enviar al backend
    sendToBackend(updatedAssignments);

    setPending(false);
  };

  // Calcular totales asignados
  function calcTotalAssigned(assignments) {
    let totalAssigned = 0;
    assignments.forEach((ass) => {
      Object.values(ass.quantities).forEach((quantity) => {
        totalAssigned += parseInt(quantity) || 0;
      });
    });
    return totalAssigned;
  }

  // Actualizar cantidades de trabajo asignadas
  const updateQuantities = (workerId, job, quantity) => {
    setAssignments((prevAssignments) => {
      const updatedAssignments = [...prevAssignments];
      updatedAssignments[workerId] = {
        ...updatedAssignments[workerId],
        quantities: {
          ...updatedAssignments[workerId].quantities,
          [job]: quantity,
        },
      };
      return updatedAssignments;
    });
  };

  return (
    <div className="assignments-container">
      <section className={style.workertable}>
        <div className={style.head}>
        <div className={style.th1}>Worker</div>
            {Object.keys(jobs)
              .slice(0, 7)
              .map((job, index) => (
                <div className={style.th} key={index}>{job}</div>
              ))}
        </div>
        <div className={style.body}>
        {workers.map((worker, index) => (
            <div className={style.tr} key={index}>
              <div className={style.td1}>
                {worker.fname} {worker.lname}
              </div>
              {Object.keys(jobs)
                .slice(0, 7)
                .map((job, jobIndex) => (
                  <div className={style.td} key={jobIndex}>
                    <input className={style.input}
                      type="number"
                      name={`${worker.fname}_${job}`}
                      value={assignments[index]?.quantities[job] || ""}
                      onChange={(e) =>
                        updateQuantities(index, job, e.target.value)
                      }
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <button className={style.btn} onClick={handleSubmit} disabled={pending}>
        Submit
      </button>
      </section>
    </div>
  );
}

export default Assing;
