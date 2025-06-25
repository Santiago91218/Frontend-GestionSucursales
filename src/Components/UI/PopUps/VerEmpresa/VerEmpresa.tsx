import { FC } from "react";
import styles from "./VerEmpresa.module.css";
import { IEmpresa } from "../../../../types/empresa/IEmpresa";

interface Props {
  onClose: () => void;
  empresa: IEmpresa;
}

export const VerEmpresa: FC<Props> = ({ onClose, empresa }) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.cardContainer}>
        <span onClick={onClose} className="material-symbols-outlined">
          cancel
        </span>

        <div className={styles.bodyContainer}>
          <p style={{ fontWeight: "bold" }}>{empresa.nombre}</p>
          <p>Razon Social: {empresa.razonSocial}</p>
          <p>CUIT: {empresa.cuit}</p>
          {empresa.logo ? (
            <img src={empresa.logo} alt="fotoEmpresa" />
          ) : (
            <img src={"imgNotFound.jpg"} alt="fotoEmpresa" />
          )}
        </div>
      </div>
    </div>
  );
};
