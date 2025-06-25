import { FC, useState } from "react";
import styles from "./CardSucursal.module.css";
import { Card } from "react-bootstrap";
import { AdmSucursal } from "../Icons/AdmSucursal/AdmSucursal";
import { VerIcon } from "../Icons/VerIcon/VerIcon";
import { EditIcon } from "../Icons/EditIcon/EditIcon";
import VerSucursal from "../PopUps/VerSucursal/VerSucursal";
import ReactDOM from "react-dom";
import { CrearSucursal } from "../PopUps/CrearSucursal/CrearSucursal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedSucursal } from "../../../Redux/Slice/sucursalsEmpresaElegida";
import { ISucursal } from "../../../types/sucursal/ISucursal";

interface Props {
  sucursal: ISucursal;
}

export const CardSucursal: FC<Props> = ({ sucursal }) => {
  const [modalVer, setModalVer] = useState<boolean>(false);
  const [modalEditar, setModalEditar] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickAdmin = async () => {
    dispatch(setSelectedSucursal(sucursal));
    navigate("/admin/productos");
  };

  return (
    <div>
      <Card className={styles.containerCardSucursal}>
        <Card.Body>
          <Card.Title className={styles.cardSucursalTitle}>
            {sucursal.nombre}
          </Card.Title>
          <div className={styles.horarioStyle}>
            <p>
              {"Horario: " +
                sucursal.horarioApertura +
                " - " +
                sucursal.horarioCierre}
            </p>
          </div>
          <div className={styles.imgStyle}>
            {sucursal.logo ? (
              <img src={sucursal.logo} alt="imagen Sucursal" />
            ) : (
              <img src="imgNotFound.jpg" alt="imagen Sucursal" />
            )}
          </div>
          <div className={styles.contentIcons}>
            <div onClick={handleClickAdmin}>
              <AdmSucursal />
            </div>

            <div onClick={() => setModalVer(true)}>
              <VerIcon />
            </div>

            <div onClick={() => setModalEditar(true)}>
              <EditIcon />
            </div>
          </div>
          {modalVer &&
            ReactDOM.createPortal(
              <VerSucursal
                onClose={() => setModalVer(false)}
                sucursal={sucursal}
              />,
              document.body
            )}

          {modalEditar &&
            ReactDOM.createPortal(
              <CrearSucursal
                onClose={() => setModalEditar(false)}
                editar={true}
                casaMatriz={sucursal.esCasaMatriz}
                sucursal={sucursal}
              />,
              document.body
            )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardSucursal;
