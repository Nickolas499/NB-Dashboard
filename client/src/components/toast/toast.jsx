import styles from './toast.module.css';
import { useState, useEffect } from 'react';

function Toast({ message }) {

  const [show, setShow] = useState(false);

  useEffect(() => {
    if(message) {
      setShow(true); 
      setTimeout(() => {
        setShow(false);
      }, 3000); // hide after 3 seconds
    }
  }, [message]);

  return (
    <div className={`${styles.toast} ${show ? '' : styles.hide}`}>
      {message}
    </div>
  );

}

export default Toast;