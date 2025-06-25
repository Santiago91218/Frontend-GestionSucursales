import { useSelector } from "react-redux";
import styles from "./HeaderAdmin.module.css";
import { RootState } from "../../../Redux/Store/Store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { VerProducto } from "../../UI/PopUps/VerProducto/VerProducto";

export const HeaderAdmin = () => {
  const navegate = useNavigate();
  const nombreEmpresa = useSelector(
    (state: RootState) => state.changeSucursales.empresa
  );
  const nombreSucursal = useSelector(
    (state: RootState) => state.changeSucursales.sucursal
  );

  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.contentHeader}>
        <h2
          onClick={() => {
            navegate("/");
          }}
        >
          {nombreEmpresa?.nombre || "Empresa"}
        </h2>
        <div className={styles.contentSucursal}>
          <span className="point">•</span>
          <h2>{nombreSucursal?.nombre || "Sucursal"}</h2>
        </div>
      </div>
      {modal ? <VerProducto onClose={() => setModal(false)} /> : null}
    </div>
  );
};
