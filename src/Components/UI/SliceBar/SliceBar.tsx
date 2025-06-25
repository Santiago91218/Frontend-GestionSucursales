import { useState } from "react";
import styles from "./Slice.module.css";
import { Link } from "react-router-dom";

export const SliceBar = () => {
  const [show, setShow] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<number>(1);

  const handleLinkId = (id: number) => {
    setSelectedLinkId(id);
    setShow(false);
  };

  return (
    <div
      onClick={() => {
        setShow(!show);
      }}
      className={`${styles.mainDiv} ${!show ? styles.hidden : ""}`}
    >
      <div className={`${styles.divBar} ${!show ? styles.hidden : ""}`}>
        <div className={styles.barTitle}>
          <h1 style={{ fontSize: "2vw", padding: "2.5rem" }}>Administracion</h1>
        </div>

        <div className={styles.enlaces}>
          <Link
            to="/admin/productos"
            className={`${styles.divText} ${
              selectedLinkId === 1 ? styles.divTextSelected : ""
            }`}
            onClick={() => handleLinkId(1)}
          >
            <h2>Productos</h2>
          </Link>

          <Link
            to="/admin/alergenos"
            className={`${styles.divText} ${
              selectedLinkId === 2 ? styles.divTextSelected : ""
            }`}
            onClick={() => handleLinkId(2)}
          >
            <h2>Alergenos</h2>
          </Link>

          <Link
            to={"/admin/categorias"}
            className={`${styles.divText} ${
              selectedLinkId === 3 ? styles.divTextSelected : ""
            }`}
            onClick={() => handleLinkId(3)}
          >
            <h2>Categorias</h2>
          </Link>
        </div>
      </div>

      <span
        className={`material-symbols-outlined ${styles.arrowButton} ${
          !show ? styles.hidden : ""
        }`}
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "arrow_back_ios" : "arrow_forward_ios"}
      </span>
    </div>
  );
};
