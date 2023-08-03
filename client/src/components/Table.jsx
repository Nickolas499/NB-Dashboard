

function Table(props) {
  const data=props.data;

  const handleEdit = (index) => {
    // Implement your edit functionality here
    console.log(`Editing row ${index}`);
  };

  return (
    <table className='profile_table'>
      <thead>
        <tr>
          {props.columns.map((column, index) => (
            <th key={index} >{column}</th>
          ))}
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (          
          <tr key={index}>
            {props.columns.map((column, columnIndex) => (
              <td key={columnIndex}>{row[column]}</td>
            ))}
            <td><button className="btn" onClick={() => handleEdit(index)}>Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
