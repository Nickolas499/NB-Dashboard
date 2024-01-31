import styles from "./inputs.module.css";

export const TextInput = (props) => {
  return (
    <div className={styles.inputText}>
      <label htmlFor={props.label}>{props.label}</label>
      <input  type={props.type} id={props.label} name={props.label} onChange={props.onChange} />
    </div>
  );
};
