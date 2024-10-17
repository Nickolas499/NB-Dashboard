import React from "react";
import styles from "./Inputs.module.css";

interface TextInputProps {
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <div className={styles.inputText}>
      <label htmlFor={props.label}>{props.label}</label>
      <input 
        type={props.type} 
        id={props.label} 
        name={props.label} 
        onChange={props.onChange} 
      />
    </div>
  );
};
