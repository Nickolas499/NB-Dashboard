import styles from "./inputs.module.css";

export const TextInput = (props) => {
  return (
    <div className={styles.inputText}>
      <label htmlFor={props.label}>{props.label}</label>
      <input  type={props.type} name={props.label}  />
    </div>
  );
};
