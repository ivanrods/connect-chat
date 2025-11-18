import styles from "../styles/buttonForm.module.css";
const ButtonForm = ({ text }) => {
  return (
    <button className={styles.button} type="submit">
      {text}
    </button>
  );
};

export default ButtonForm;
