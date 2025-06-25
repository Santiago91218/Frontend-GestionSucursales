import { useEffect, useState } from "react";
import { CrearProducto } from "../../UI/PopUps/CrearProducto/CrearProducto";
import { ServiceArticulo } from "../../../Services/articuloService";
import { TableGeneric } from "../../UI/TableGeneric/TableGeneric";
import { CircularProgress } from "@mui/material";
import { ButtonsTable } from "../../UI/ButtonsTable/ButtonsTable";
import {
  removeElementActive,
  setDataTable,
} from "../../../Redux/Slice/TablaReducer";
import { useAppDispatch } from "../../Hooks/redux";
import styles from "./Product.module.css";
import { AddIcon } from "../../UI/Icons/AddIcon/AddIcon";
import { badContest, godContest } from "../../UI/PopUps/Alerts/ServerBadAlert";
import { IProducto } from "../../../types/productos/IProducto";

export const Product = () => {
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [loading, setLoading] = useState(false);
  const service = new ServiceArticulo();
  const dispatch = useAppDispatch();

  const cargarProductos = async () => {
    try {
      const response = await service.getAllProductos();
      dispatch(setDataTable(response.data));
    } catch (error) {
      console.error("Error al cargar los productos", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await service.deleteProductoById(id);
      godContest("El articulo ha sido borrado correctamente");
      cargarProductos();
      dispatch(removeElementActive());
    } catch (error) {
      badContest();
    }

    setProductos((prev) => prev.filter((producto) => producto.id !== id));
  };

  const columns = [
    { label: "Nombre", key: "denominacion" },
    { label: "Precio", key: "precioVenta" },
    { label: "Descripción", key: "descripcion" },
    {
      label: "Categoría",
      key: "categoria",
      render: (el: IProducto) => {
        return el.categoria?.denominacion;
      },
    },
    { label: "Habilitado", key: "habilitado" },
    {
      label: "Acciones",
      key: "acciones",
      render: (row: IProducto) => (
        <ButtonsTable
          el={row}
          handleDelete={handleDelete}
          setOpenModal={setModalCreate}
        />
      ),
    },
  ];

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.cotentButton} onClick={() => setModalCreate(true)}>
        <AddIcon />
      </div>
      {modalCreate && (
        <CrearProducto
          reload={cargarProductos}
          close={() => setModalCreate(false)}
        />
      )}

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
          <TableGeneric<IProducto>
            columns={columns}
            handleDelete={handleDelete}
            setOpenModal={setModalCreate}
          />
        </div>
      )}
    </div>
  );
};
