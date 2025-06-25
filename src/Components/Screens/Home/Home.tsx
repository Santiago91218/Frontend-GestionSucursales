import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/Store";
import { ServiceSucursal } from "../../../Services/sucursalService";
import { EmpresasContainer } from "../../UI/ContenedorEmpresas/EmpresasContainer";
import { CrearSucursal } from "../../UI/PopUps/CrearSucursal/CrearSucursal";
import ListSucursal from "../../UI/ListSucursal/ListSucursal";
import { ISucursal } from "../../../types/sucursal/ISucursal";
import { IEmpresa } from "../../../types/empresa/IEmpresa";

export const Home = () => {
  const [modalSucursal, setmodalSucursal] = useState(false);
  const empresa = useSelector(
    (state: RootState) => state.changeSucursales.empresa
  ) as IEmpresa | null;
  const serviceSucursal = new ServiceSucursal();
  const [sucursales, setSucursales] = useState<ISucursal[]>([]);

  useEffect(() => {
    if (empresa) {
      serviceSucursal
        .getAllSucursalesByEmpresa(empresa.id!)
        .then((response) => {
          setSucursales(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener sucursales:", error);
        });
    }
  }, [empresa]);

  return (
    <div className={style.containerApp}>
      <div className={style.sectionEmpresa}>
        <div className={style.headerEmpresa}>
          <h2>Empresas</h2>
        </div>

        <EmpresasContainer></EmpresasContainer>
      </div>

      {modalSucursal && (
        <CrearSucursal
          onClose={() => setmodalSucursal(false)}
          casaMatriz={false}
        />
      )}

      <div className={style.sectionSucursal}>
        <div className={style.headerSucursal}>
          <h2>Sucursales</h2>

          <button
            onClick={() => {
              setmodalSucursal(true);
            }}
            disabled={empresa ? false : true}
          >
            Agregar Sucursal
          </button>
        </div>
        <div className={style.containerListHome}>
          {empresa ? (
            <ListSucursal sucursales={sucursales} />
          ) : (
            <p className={style.noEmpresaSelected}>
              Elige una Empresa para ver sus sucursales
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
