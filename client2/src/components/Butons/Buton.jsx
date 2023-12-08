import React from 'react'
import styles from './buton.module.css';



export const SquareBtn = ({onClick, children}) => {
  return (
    <button className={styles.sqbtn} onClick={onClick}>{children}</button>
  )
}

