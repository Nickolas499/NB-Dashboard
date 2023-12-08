
import styles from './modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {children}
            <button className={styles.close_button} onClick={onClose}></button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;