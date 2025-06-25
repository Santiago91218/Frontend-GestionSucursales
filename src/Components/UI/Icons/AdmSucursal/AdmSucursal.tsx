import styles from "./AdmSucursal.module.css";
export const AdmSucursal = () => {
  return (
    <button className={styles.buttonAdm}>
      <span className={`material-symbols-outlined ${styles.customIcon}`}>
        apartment
      </span>
    </button>
  );
};
