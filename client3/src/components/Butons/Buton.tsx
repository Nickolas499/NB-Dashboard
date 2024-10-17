import React from 'react';
import styles from './buton.module.css';

interface SquareBtnProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const SquareBtn: React.FC<SquareBtnProps> = ({ onClick, children }) => {
  return (
    <button className={styles.sqbtn} onClick={onClick}>
      {children}
    </button>
  );
};
