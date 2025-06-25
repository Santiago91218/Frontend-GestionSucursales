import styles from "./VerIcon.module.css";

export const VerIcon = () => {
  return (
    <span className={styles.buttonVer}>
      <span className={`material-symbols-outlined ${styles.customIcon}`}>
        visibility
      </span>
    </span>
  );
};
