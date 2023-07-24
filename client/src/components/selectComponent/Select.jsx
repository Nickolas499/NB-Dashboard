import { useState } from "react";
import styles from "./select.module.css";

export const Select = ({ value, onChange, options, type }) => {
  const [isOpen, setIsOpen] = useState(true);

  function clearOptions() {
    onChange(undefined);
  }

  function selectOption(option) {
    onChange(option);
  }
  return (
    <>
      <div
        className={styles.container}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
      >
        <span className={styles.value}>{value.label}</span>
        <button 
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}>&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option, index) => (
            <li 
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            className={styles.option} key={index}>
              {type === "Color" ? (
                <span>{option.label}</span>
              ) : (
                <span style={{ backgroundColor: option.label }}>
                  {option.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
