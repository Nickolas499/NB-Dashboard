import React, { useState, useEffect } from 'react';
import { useWork } from "../../context/workContext";

const Test = () => {
  const { CreateWork, GetWork, Work, UpdateWork,} = useWork();

  const [workData, setWorkData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  const [userAssignments, setUserAssignments] = useState({});

  useEffect(() => {
    
      setWorkData();
      setUserData();

      
    

    
  }, []);

  const handleUserAssignment = (task, user) => {
    setUserAssignments(prev => ({...prev, [task]: user}));
  }

  const handleValueChange = (task, value) => {
    setCombinedData(prev => 
      prev.map(d => {
        if (d.ID === task) {
          return {
            ...d,
            [task]: value   
          }
        }
        return d;
      })
    );
  }

  return (
    <div>
      {combinedData.map(d => (
        <div key={d.ID}>
          <h3>{d.DATE}</h3>
          
          <div>
            <label>LS3:</label>
            <select
              value={userAssignments['LS3']}
              onChange={e => handleUserAssignment('LS3', e.target.value)}
            >
              {userData.map(u => (
                <option key={u.ID}>{u.USER}</option>
              ))}
            </select>
          </div>

          <div>
            <label>ZEISS:</label>
            <select
              value={userAssignments['ZEISS']}
              onChange={e => handleUserAssignment('ZEISS', e.target.value)}
            >
              {userData.map(u => (
                <option key={u.ID}>{u.USER}</option>
              ))}
            </select>
          </div>

          <div>
            <label>SHAPE:</label>
            <select
              value={userAssignments['SHAPE']}
              onChange={e => handleUserAssignment('SHAPE', e.target.value)}
            >
              {userData.map(u => (
                <option key={u.ID}>{u.USER}</option>
              ))}
            </select>
          </div>

          <div>
            <label>IBO:</label>
            <input
              type="number"
              value={d.IBO}
              onChange={e => handleValueChange(d.ID, e.target.value)} 
            />
          </div>

          <div>
            <label>DIGITAL:</label>
            <input
              type="number"  
              value={d.DIGITAL}
              onChange={e => handleValueChange(d.ID, e.target.value)}
            />
          </div>

          <div>
            <label>PHYSICAL:</label>
            <input
              type="number"
              value={d.PHYSICAL} 
              onChange={e => handleValueChange(d.ID, e.target.value)}
            />
          </div>

          <div>
            <label>FULL_ARCH:</label>
            <input 
              type="number"
              value={d.FULL_ARCH}
              onChange={e => handleValueChange(d.ID, e.target.value)} 
            />
          </div>

          <div>
            <label>DAY_OFF:</label>
            <input 
              type="checkbox"
              checked={d.DAY_OFF}
              onChange={e => handleValueChange(d.ID, e.target.checked)} 
            />
          </div>

        </div>
      ))}
    </div>
  );

}

export default Test;