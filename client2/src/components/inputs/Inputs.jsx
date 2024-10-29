import styles from "./inputs.module.css";

export const TextInput = (props) => {
  return (
    <div className={styles.inputText}>
      <label htmlFor={props.label}>{props.label}</label>
      <input type={props.type} id={props.label} name={props.label} onChange={props.onChange} />
    </div>
  );
};



export const Input = (props) => {
  return (
    <div className={styles.Input}>
      <p>{props.label}</p>
      <input
      id={props.id}
      name={props.name}
        className={`${styles.input_text} ${props.errors.fname && styles.error2}`}
        type={props.type}
        placeholder={props.errors.fname ? "This field is required" : props.placeholder}
        onChange={props.onChange}
      />
    </div>
  )
}
