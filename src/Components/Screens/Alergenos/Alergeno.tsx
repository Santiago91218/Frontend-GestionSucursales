import { useEffect, useState } from "react";
import { TableGeneric } from "../../UI/TableGeneric/TableGeneric";
import { CircularProgress } from "@mui/material";
import { ButtonsTable } from "../../UI/ButtonsTable/ButtonsTable";
import {
  removeElementActive,
  setDataTable,
} from "../../../Redux/Slice/TablaReducer";
import { useAppDispatch } from "../../Hooks/redux";
import styles from "./Alergenos.module.css";
import { AddIcon } from "../../UI/Icons/AddIcon/AddIcon";
import { ServiceAlergeno } from "../../../Services/alergenoService";
import { CrearAlergeno } from "../../UI/PopUps/CrearAlergeno/CrearAlergeno";
import { badContest, godContest } from "../../UI/PopUps/Alerts/ServerBadAlert";
import { IAlergeno } from "../../../types/alergenos/IAlergeno";

export const Alergeno = () => {
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [alergenos, setAlergenos] = useState<IAlergeno[]>([]);
  const [loading, setLoading] = useState(false);

  const service = new ServiceAlergeno();
  const dispatch = useAppDispatch();

  const cargarAlergenos = async () => {
    try {
      const response = await service.getAllAlergenos();
      dispatch(setDataTable(response.data));
    } catch (error) {
      console.error("Error al cargar los alergenos", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await service.deleteAlergenoById(id);
      godContest("El alergeno se elimino correctamente");
      cargarAlergenos();
      dispatch(removeElementActive());
    } catch (error) {
      badContest();
    }
    setAlergenos((prev) => prev.filter((alergenos) => alergenos.id !== id));
  };

  const columns = [
    { label: "Nombre", key: "denominacion" },
    {
      label: "Acciones",
      key: "acciones",
      render: (row: IAlergeno) => (
        <ButtonsTable
          el={row}
          handleDelete={handleDelete}
          setOpenModal={setModalCreate}
        />
      ),
    },
  ];

  useEffect(() => {
    cargarAlergenos();
  }, []);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.cotentButton} onClick={() => setModalCreate(true)}>
        <AddIcon />
      </div>
      {modalCreate && <CrearAlergeno onClose={() => setModalCreate(false)} />}

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            gap: "2vh",
            height: "100%",
          }}
        >
          <CircularProgress color="secondary" />
          <h2>Cargando...</h2>
        </div>
      ) : (
        <div className={styles.containerTabla}>
          <TableGeneric<IAlergeno>
            columns={columns}
            handleDelete={handleDelete}
            setOpenModal={setModalCreate}
          />
        </div>
      )}
    </div>
  );
};
