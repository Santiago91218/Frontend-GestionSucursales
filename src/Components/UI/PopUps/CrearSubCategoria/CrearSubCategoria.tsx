import { Button } from "react-bootstrap";
import styles from "./CrearSubCategoria.module.css";
import { FC } from "react";
import { RootState } from "../../../../Redux/Store/Store";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../Hooks/useForm";
import { CancelButton } from "../../Icons/CancelButton";
import { ServiceCategoria } from "../../../../Services/categoriaService";
import { badContest, godContest } from "../Alerts/ServerBadAlert";
import { setCategorias } from "../../../../Redux/Slice/categorias";
import { ISucursal } from "../../../../types/sucursal/ISucursal";
import { IUpdateCategoria } from "../../../../types/categorias/IUpdateCategoria";
import { ICreateCategoria } from "../../../../types/categorias/ICreateCategoria";
import { ICategoria } from "../../../../types/categorias/ICategoria";

interface IProps {
  onClose: () => void;
  subsCategoria?: () => void;
  edit: boolean;
  padre: boolean;
  categoria?: ICategoria;
  idPadre?: number;
  onReload?: () => void;
}

export const CrearSubCategoria: FC<IProps> = ({
  idPadre,
  onClose,
  edit,
  padre,
  categoria,
  onReload,
  subsCategoria,
}) => {
  const sucursal: ISucursal | null = useSelector(
    (state: RootState) => state.changeSucursales.sucursal
  );
  const dispatch = useDispatch();

  const { values, handleChange, resetForm } = useForm({
    denominacion: categoria ? categoria.denominacion : "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!sucursal) {
      badContest("No hay una sucursal o empresa válida seleccionada.");
      return;
    }

    if (subsCategoria) {
      subsCategoria();
    }

    const serviceCategoria = new ServiceCategoria();
    try {
      if (edit && categoria && sucursal) {
        const categoriaEditada: IUpdateCategoria = {
          id: categoria.id!,
          denominacion: values.denominacion,
          disponible: false,
          idEmpresa: sucursal.empresa.id!,
          idSucursales: [sucursal.id!],
          idCategoriaPadre:
            !padre && categoria.categoriaPadre?.id
              ? categoria.categoriaPadre.id
              : null,
        };
        await serviceCategoria.updateCategoria(categoria.id!, categoriaEditada);
        if (onReload) onReload();
        if (subsCategoria) subsCategoria();
      } else if (!edit && sucursal) {
        const categoriaNueva: ICreateCategoria = {
          denominacion: values.denominacion,
          idEmpresa: sucursal.empresa.id!,
          idCategoriaPadre: idPadre ? idPadre : null,
        };

        await serviceCategoria.createCategoria(categoriaNueva).then();
        if (onReload) onReload();
      }

      const response = await serviceCategoria.getCategoriasPadrePorSucursal(
        sucursal.id!
      );
      dispatch(setCategorias(response.data));

      if (subsCategoria) {
        subsCategoria();
      }

      godContest("Se ha creado/modificado la categoria correctamente!!");
    } catch (e) {
      console.log(e);
      badContest("Hubo un error a la hora de crear/editar una categoria");
    }

    resetForm();
    onClose();
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.modalCategoria}>
        <div className={styles.contentTittle}>
          {edit ? (
            <h2>{padre ? "Editar Categoría" : "Editar SubCategoría"}</h2>
          ) : (
            <h2>{padre ? "Crear Categoría" : "Crear SubCategoría"}</h2>
          )}

          <div className={styles.contentbutton}>
            <CancelButton
              onClick={() => {
                onClose();
              }}
            />
          </div>
        </div>
        <form className={styles.formCrearCategoria} onSubmit={handleSubmit}>
          <div className={styles.contentInputs}>
            <input
              type="text"
              name="denominacion"
              placeholder="Ingresa una denominacion"
              value={values.denominacion}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" variant="outline-primary">
            Aceptar
          </Button>
        </form>
      </div>
    </div>
  );
};
