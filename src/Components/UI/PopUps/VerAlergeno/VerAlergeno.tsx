import { FC } from "react";
import styles from "./VerAlergeno.module.css";
import { useDispatch } from "react-redux";
import { removeElementActive } from "../../../../Redux/Slice/TablaReducer";
import { IAlergeno } from "../../../../types/alergenos/IAlergeno";

interface Props {
  onClose: () => void;
  alergeno: IAlergeno | null;
}

export const VerAlergeno: FC<Props> = ({ onClose, alergeno }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.mainDiv}>
      <div className={styles.cardContainer}>
        <span
          onClick={() => {
            onClose();
            dispatch(removeElementActive());
          }}
          className="material-symbols-outlined"
        >
          cancel
        </span>

        <div className={styles.bodyContainer}>
          <p style={{ fontWeight: "bold" }}>{alergeno?.denominacion}</p>
          {alergeno?.imagen ? (
            <img src={alergeno.imagen.url} alt="fotoAlergeno" />
          ) : (
            <img src={"imgNotFound.jpg"} alt="fotoAlergeno" />
          )}
        </div>
      </div>
    </div>
  );
};
