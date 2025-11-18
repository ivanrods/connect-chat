import styles from "../styles/inputForm.module.css";
const InputForm = ({ icon, type, placeholder, ...rest }) => {
  return (
    <div className={styles.input}>
      <div>{icon}</div>
      <input type={type} placeholder={placeholder} {...rest} />
    </div>
  );
};

export default InputForm;
