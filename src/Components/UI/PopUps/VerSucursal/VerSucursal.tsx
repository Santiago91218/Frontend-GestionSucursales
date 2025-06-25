import { FC } from "react";
import styles from "./VerSucursal.module.css";
import { ISucursal } from "../../../../types/sucursal/ISucursal";

interface Props {
  onClose: () => void;
  sucursal: ISucursal;
}
export const VerSucursal: FC<Props> = ({ onClose, sucursal }) => {
  if (!sucursal) {
    return <div>Cargando sucursal...</div>;
  }
  return (
    <div className={styles.mainDiv}>
      <div className={styles.containerCardSucursal}>
        <div className={styles.containerHeaderCard}>
          <span onClick={onClose} className="material-symbols-outlined">
            cancel
          </span>

          <h1 className={styles.cardTitle} style={{ fontWeight: "bold" }}>
            {sucursal.nombre || "Sin nombre"}
          </h1>
        </div>

        <div className={styles.containerBodyCard}>
          <p>Empresa: {sucursal.empresa?.nombre || "Sin nombre"}</p>
          <p>Domicilio: {sucursal.domicilio?.calle || "Sin domicilio"}</p>
          <p>Casa Matriz: {sucursal.esCasaMatriz ? "Sí" : "No"}</p>
          <p>
            Horario: {sucursal.horarioApertura || "No definido"} -{" "}
            {sucursal.horarioCierre || "No definido"}
          </p>
          <div className={styles.containerImgCard}>
            <div className={styles.ImgCard}>
              {sucursal.logo ? (
                <img src={sucursal.logo} alt="fotoSucursal" />
              ) : (
                <img src={"imgNotFound.jpg"} alt="fotoSucursal" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerSucursal;
