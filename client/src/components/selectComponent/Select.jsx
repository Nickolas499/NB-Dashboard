import { useEffect, useState } from "react";
import styles from "./select.module.css";

export const Select = ({name, value, onChange, options, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  function clearOptions() {
    onChange("");
  }

  function selectOption(option) {
    if (option !== value) onChange(option);
  }

  function isOptionSelected(option) {
    return option === value;
  }

  useEffect(() => {
    if(isOpen)  setHighlightIndex(0);
    
  },[isOpen])

 

  return (
    <>
      <div
        className={styles.container}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
      >
        <span className={styles.value} style={{ backgroundColor: value.value }}>{value.label}</span>
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
            onMouseEnter={() => setHighlightIndex(index)}
            className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""}
            ${index === highlightIndex ? styles.highlighted : ""}`}
            key={index}>
              {type === "Color" ? (
                <span>{option.label}</span>
              ) : (
                <span className={styles.colorItems}>
                  <span>{option.label}</span>
                  <span className={styles.squareColor} style={{ backgroundColor: option.value }}>
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
