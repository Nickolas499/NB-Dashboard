import React, { useState } from 'react';
import AssignmentForm from './AssignmentForm';

function AssignmentApp() {
    const workers = ["Ezequiel Almonte", "Jose Ventura", "Monica Lopez"];
    const jobs = {
      LS3: 5,
      ZEISS: 6,
      SHAPE: 7,
      PHIS_ABUT: 8,
      DIGI_ABUT: 9,
      FULL_ARCH: 11,
      IBO_DESIGN: 10
    };
  
    const assignWork = (worker, job, quantity) => {
      // Lógica para guardar los datos de asignación
      const assignmentData = {
        worker,
        job,
        quantity
      };
      // Guardar los datos de asignación en otro documento llamado 'asignacion'
      // Código para guardar los datos en el documento 'asignacion' aquí
      console.log("Asignación guardada:", assignmentData);
    };
  
    return (
      <div>
        <h1>Aplicación de Asignación de Trabajos</h1>
        <AssignmentForm workers={workers} jobs={jobs} assignWork={assignWork} />
      </div>
    );
  }
  
  export default AssignmentApp;