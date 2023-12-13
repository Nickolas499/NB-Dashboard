
import styles from './modal.module.css';

const Modal = ({ isOpen, onClose,title, children }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
          <div className={styles.modalTitle}>{title}</div>
            {children}
            <button className={styles.close_button} onClick={onClose}></button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;