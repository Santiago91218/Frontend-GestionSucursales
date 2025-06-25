import { FC } from "react";
import styles from "./VerProucto.module.css";
import { useDispatch } from "react-redux";
import { removeElementActive } from "../../../../Redux/Slice/TablaReducer";
import { IProducto } from "../../../../types/productos/IProducto";

interface Props {
  onClose: () => void;
  producto: IProducto | null;
}

export const VerProducto: FC<Props> = ({ onClose, producto }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.mainDiv}>
      <div className={styles.modalProcutos}>
        <span
          onClick={() => {
            dispatch(removeElementActive());
            onClose();
          }}
          className="material-symbols-outlined"
        >
          cancel
        </span>

        <div className={styles.bodyContainer}>
          <div className={styles.contentTittle}>
            <h4 style={{ fontWeight: "bold" }}>{producto?.denominacion}</h4>
          </div>
          <div>
            <p>Denominacion: {producto?.denominacion}</p>
            <p>Codigo: {producto?.codigo}</p>
            <p>Precio de venta: {producto?.precioVenta}</p>
            <p>Categoria: {producto?.categoria?.denominacion} </p>
            <p>
              Alergeno:{" "}
              {producto?.alergenos && producto.alergenos.length > 0
                ? producto?.alergenos.map((prev) => prev.denominacion)
                : "No tiene"}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
