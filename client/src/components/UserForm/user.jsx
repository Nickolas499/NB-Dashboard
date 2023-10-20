import React from "react";
import styles from "./UserForm.module.css";

const User = ({ user, tasks, assignedWork, onCheckboxChange }) => {    
  const initials = `${user.fname[0]}${user.lname[0]}`;
console.log(tasks)
  return (
    <div className={styles.user}>
      <div className={styles.initials}>{initials.toUpperCase()}</div>
      {tasks.map((task) => (       
        <div key={task.id} className={styles.task}>
          <label>
            <input
              type="checkbox"
              name={task.id}
              value={task.label}
              checked={assignedWork[user._id][task.id]}
              onChange={() => onCheckboxChange(user._id, task.id)}
            />
            {task.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default User;
