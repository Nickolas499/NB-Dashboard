import React, { useState } from 'react';

function Table(props) {
  const [currentPage, setCurrentPage] = useState(1); // Variable de estado para la página actual
  const rowsPerPage = 10; // Número de filas por página

  const data = props.data;

  const handleEdit = (index) => {
    // Implementa la funcionalidad de edición aquí
    console.log(`Editing row ${index}`);
  };

  return (
    <table className='profile_table'>
      <thead>
        <tr>
          {props.columns.map((column, index) => (
            <th key={index} >{column}</th>
          ))}
          <th colSpan="2">Update</th>
        </tr>
      </thead>
      <tbody>
        {data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((row, index) => (
          <tr key={index}>
            {props.columns.map((column, columnIndex) => (
              <td key={columnIndex}>{row[column]}</td>
            ))}
            <td><button className="btn" onClick={() => handleEdit(index)}>Edit</button></td>
            <td><button className="DelBtn" onClick={() => handleEdit(index)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={props.columns.length + 2}>
            {/* Botón "Anterior" */}
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>

            {/* Números de página */}
            {Array.from({ length: Math.ceil(data.length / rowsPerPage) }, (_, i) => i + 1).map(pageNumber => (
              <button key={pageNumber} disabled={pageNumber === currentPage} onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</button>
            ))}

            {/* Botón "Siguiente" */}
            <button disabled={currentPage === Math.ceil(data.length / rowsPerPage)} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;
