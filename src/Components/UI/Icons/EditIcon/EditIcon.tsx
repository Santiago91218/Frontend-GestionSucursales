import styles from "./EditIcon.module.css";

export const EditIcon = () => {
  return (
    <button className={styles.buttonEdit}>
      <span className={`material-symbols-outlined ${styles.customIcon}`}>
        edit
      </span>
    </button>
  );
};
