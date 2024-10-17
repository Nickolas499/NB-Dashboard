import React from 'react';
import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
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
