import React, { useState, useEffect } from 'react';
import { useRegistration } from '../context/registrationContext';

function Table2(props) {
  const [currentPage, setCurrentPage] = useState(1); // Variable de estado para la página actual
  const [isEditing, setIsEditing] = useState(false); // Variable de estado para saber si se está editando una fila
  const [editedRow, setEditedRow] = useState({}); // Variable de estado para almacenar la fila que se está editando
  const [editedData, setEditedData] = useState({});
  const rowsPerPage = 10; // Número de filas por página
  const { DeleteRegistration, GetRegistration, UpdateRegistration } = useRegistration();

  const data = props.data;

  const [UPDATE, setUPDATE] = useState(0);
  useEffect(() => {
    GetRegistration();
  }, [UPDATE]);

  const actualizar = () => {
    setTimeout(() => {
      setUPDATE(UPDATE + 1);
    }, 500); // Espera un segundo (1000 ms) antes de ejecutar la función
  };
 

  const handleEdit = (row) => {
    setIsEditing(true);
    setEditedRow(row);
    console.log(`Editing row ${row._id}`);
  };
  const handleDelete = (id) => {
    DeleteRegistration(id)
    actualizar();
    console.log(`Deleting row ${id}`);
  };
  const handleSave = (id, data) => {
    UpdateRegistration(id._id, data)
    setIsEditing(false);
    actualizar();    
    console.log(id._id,data);
    // Aquí se implementaría la lógica para guardar los cambios realizados en la fila
  };
  const handleCancel = () => {
    setIsEditing(false);
    console.log('Changes cancelled');
    // Aquí se implementaría la lógica para cancelar los cambios realizados en la fila
  };

  return (
    <table className='profile_table'>
      <thead>
        <tr>
          {props.columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
          <th colSpan="2">Update</th>
        </tr>
      </thead>
      <tbody>
        {data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((row, index) => (
          <tr key={index}>
            {props.columns.map((column, columnIndex) => (
              <td key={columnIndex}>
                {/* Si se está editando la fila, se muestra un input de tipo "text" con el valor actual */}
                {/* Si no, se muestra el valor actual sin posibilidad de edición */}
                {columnIndex === 0 ? (
                  row[column]
                ) : (
                  isEditing && editedRow._id === row._id ? (
                    <input className="Input_field" type="text" value={editedRow[column]} onChange={(e) => {
                        setEditedRow({ ...editedRow, [column]: e.target.value });
                        setEditedData({ ...editedData, [column]: e.target.value });
                    }} />
                  ) : (
                    row[column]
                  )
                )}
              </td>
            ))}
            <td>
              {/* Si no se está editando la fila, se muestra el botón "Edit" */}
              {/* Si se está editando la fila, se muestran los botones "Save" y "Cancel" */}
              {isEditing && editedRow._id === row._id ? (
                  <button className="btn" onClick={() => handleSave(row, editedData)}>Save</button>
              ) : (
                <button className="btn" onClick={() => handleEdit(row)}>Edit</button>
              )}
            </td>
            <td>
            {isEditing && editedRow._id === row._id ? (
            <button className="btn" onClick={handleCancel}>Cancel</button>
            ):(
                <button className="DelBtn" onClick={() => handleDelete(row._id)}>Delete</button>
            )}
            </td>
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


export default Table2