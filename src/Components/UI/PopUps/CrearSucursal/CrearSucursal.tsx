import { Button } from "react-bootstrap";
import styles from "./CrearSucursal.module.css";
import { FC, useState } from "react";
import { CancelButton } from "../../Icons/CancelIcon/CancelButton";
import { useForm } from "../../../Hooks/useForm";
import { ServiceSucursal } from "../../../../Services/sucursalService";
import { Selectors } from "./Selectors";
import { badContest, godContest } from "../Alerts/ServerBadAlert";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEmpresa } from "../../../../Redux/Slice/sucursalsEmpresaElegida";
import { ServiceEmpresa } from "../../../../Services/empresaService";
import { ICreateSucursal } from "../../../../types/sucursal/ICreateSucursal";
import { ISucursal } from "../../../../types/sucursal/ISucursal";
import { IEmpresa } from "../../../../types/empresa/IEmpresa";
import { RootState } from "../../../../Redux/Store/Store";

interface Props {
  onClose: () => void;
  editar?: boolean;
  sucursal?: ISucursal;
  casaMatriz: boolean;
}

export const CrearSucursal: FC<Props> = ({
  onClose,
  casaMatriz,
  editar,
  sucursal,
}) => {
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState("");
  const dispatch = useDispatch();
  const empresa = useSelector(
    (state: RootState) => state.changeSucursales.empresa
  ) as IEmpresa | null;

  const handleLocalidadChange = (localidad: string) => {
    setLocalidadSeleccionada(localidad);
  };

  const { values, handleChange, resetForm } = useForm({
    nombre: editar && sucursal ? sucursal.nombre : "",
    apertura: editar && sucursal ? sucursal.horarioApertura : "",
    cierre: editar && sucursal ? sucursal.horarioCierre : "",
    casaMatriz: editar && sucursal ? sucursal.esCasaMatriz : false,
    pais: "",
    provincia: "",
    localidad: "",
    latitud: editar && sucursal ? sucursal.latitud : 0,
    longitud: editar && sucursal ? sucursal.longitud : 0,
    calle: editar && sucursal ? sucursal.domicilio.calle : "",
    numeroCalle: editar && sucursal ? sucursal.domicilio.numero : 0,
    codigoPostal: editar && sucursal ? sucursal.domicilio.cp : 0,
    piso: editar && sucursal ? sucursal.domicilio.piso : 0,
    departamento: editar && sucursal ? sucursal.domicilio.nroDpto : 0,
    srcPhoto: editar && sucursal ? sucursal.logo : "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const serviceSucursal: ServiceSucursal = new ServiceSucursal();
    const serviceEmpresa = new ServiceEmpresa();
    try {
      if (editar && sucursal) {
        const nuevaSucursal: ICreateSucursal = {
          id: sucursal.id,
          nombre: values.nombre,
          horarioApertura: values.apertura,
          horarioCierre: values.cierre,
          esCasaMatriz: values.casaMatriz,
          latitud: values.latitud,
          longitud: values.longitud,
          domicilio: {
            id: sucursal.domicilio.id,
            calle: values.calle,
            numero: values.numeroCalle,
            cp: values.codigoPostal,
            piso: values.piso,
            nroDpto: values.departamento,
            idLocalidad: parseInt(localidadSeleccionada),
          },
          categorias: sucursal.categorias ? sucursal.categorias : [],
          idEmpresa: empresa?.id || sucursal?.empresa?.id || 0,
          logo: values.srcPhoto,
        };

        await serviceSucursal.editarSucursal(sucursal.id!, nuevaSucursal);
        godContest();
      } else {
        const nuevaSucursal: ICreateSucursal = {
          nombre: values.nombre,
          horarioApertura: values.apertura,
          horarioCierre: values.cierre,
          esCasaMatriz: values.casaMatriz,
          latitud: values.latitud,
          longitud: values.longitud,
          domicilio: {
            calle: values.calle,
            numero: values.numeroCalle,
            cp: values.codigoPostal,
            piso: values.piso,
            nroDpto: values.departamento,
            idLocalidad: parseInt(localidadSeleccionada),
          },
          idEmpresa: empresa ? empresa.id : 0,
          logo: values.srcPhoto,
        };
        await serviceSucursal.crearSucursal(nuevaSucursal);
        godContest();
      }
    } catch (error) {
      badContest();
      console.error("Error al obtener las sucursales:", error);
    }

    setTimeout(() => {}, 100);
    if (empresa) {
      const response = await serviceEmpresa.getEmpresaById(empresa.id!);
      dispatch(setSelectedEmpresa(response.data));
    }

    resetForm();
    onClose();
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.popUp}>
        <div className={styles.headerPopUp}>
          <h2>{editar ? "Editar Sucursal" : "Crear Sucursal"}</h2>
          <CancelButton onClick={onClose} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.divColums}>
            <div className={styles.colums}>
              <input
                required
                type="text"
                name="nombre"
                placeholder="Nombre"
                className={styles.smallInput}
                value={values.nombre}
                onChange={handleChange}
              />

              <label htmlFor="apertura">Apertura</label>
              <input
                required
                type="time"
                name="apertura"
                className={styles.smallInput}
                value={values.apertura}
                onChange={handleChange}
              />

              <label htmlFor="cierre">Cierre</label>
              <input
                required
                type="time"
                name="cierre"
                className={styles.smallInput}
                value={values.cierre}
                onChange={handleChange}
              />
              {casaMatriz ? (
                <div className={styles.containerCheck}>
                  <label htmlFor="casaMatriz">Casa Matriz</label>
                  <input
                    id="casaMatriz"
                    type="checkbox"
                    name="casaMatriz"
                    checked={values.casaMatriz}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div className={styles.colums}>
              <Selectors onLocalidadChange={handleLocalidadChange}></Selectors>

              <input
                required
                type="number"
                name="latitud"
                placeholder="Latitud"
                className={styles.largeInput}
                value={values.latitud ? values.latitud : ""}
                onChange={handleChange}
              />
              <input
                required
                type="number"
                name="longitud"
                placeholder="Longitud"
                className={styles.largeInput}
                value={values.longitud ? values.longitud : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.colums}>
              <input
                required
                type="text"
                name="calle"
                placeholder="Nombre de la Calle"
                className={styles.largeInput}
                value={values.calle}
                onChange={handleChange}
              />
              <input
                required
                type="number"
                name="numeroCalle"
                placeholder="Número de Calle"
                className={styles.largeInput}
                value={values.numeroCalle ? values.numeroCalle : ""}
                onChange={handleChange}
              />
              <input
                type="number"
                name="codigoPostal"
                placeholder="Código Postal"
                className={styles.largeInput}
                value={values.codigoPostal ? values.codigoPostal : ""}
                onChange={handleChange}
              />
              <input
                type="number"
                name="piso"
                placeholder="Ingrese el numero de piso"
                className={styles.largeInput}
                value={values.piso ? values.piso : ""}
                onChange={handleChange}
              />
              <input
                type="number"
                name="departamento"
                placeholder="Ingrese número de departamento"
                className={styles.largeInput}
                value={values.departamento ? values.departamento : ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.cotainerImg}>
            <div className={styles.divImg}>
              <img
                style={{ height: "100%", width: "100%", borderRadius: "10px" }}
                src={values.srcPhoto}
                alt="Imagen de Sucursal"
              />
            </div>

            <div className={styles.divSrc}>
              <input
                style={{
                  backgroundColor: "#D9D9D9",
                  borderRadius: "5px",
                  gap: "0.5rem",
                }}
                type="text"
                name="srcPhoto"
                placeholder="Ingresa el URL de la imagen"
                value={values.srcPhoto}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button type="submit" variant="outline-success">
            Confirmar
          </Button>
        </form>
      </div>
    </div>
  );
};
