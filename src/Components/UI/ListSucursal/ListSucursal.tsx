import { FC } from "react";
import CardSucursal from "../CardSucursal/CardSucursal";
import styles from "./ListSucursal.module.css";
import { ISucursal } from "../../../types/sucursal/ISucursal";

interface Props {
  sucursales: ISucursal[];
}

const ListSucursal: FC<Props> = ({ sucursales }) => {
  return sucursales.length !== 0 ? (
    <div className={styles.containerListSucursal}>
      {sucursales.map((sucursal) => (
        <CardSucursal key={sucursal.id} sucursal={sucursal} />
      ))}
    </div>
  ) : (
    <div className={styles.noSucursalMessage}>
      <p>No hay sucursales en esta empresa.</p>
    </div>
  );
};

export default ListSucursal;
