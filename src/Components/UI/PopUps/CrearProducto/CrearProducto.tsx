import { FC, useEffect, useState } from "react";
import styles from "./CrearProducto.module.css";
import { CancelButton } from "../../Icons/CancelButton";
import { useForm } from "../../../Hooks/useForm";
import { badContest, godContest } from "../Alerts/ServerBadAlert";
import { ServiceArticulo } from "../../../../Services/articuloService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store/Store";
import { Button } from "react-bootstrap";
import { ServiceAlergeno } from "../../../../Services/alergenoService";
import { ServiceCategoria } from "../../../../Services/categoriaService";
import {
  removeElementActive,
  setDataTable,
} from "../../../../Redux/Slice/TablaReducer";
import Select from "react-select";
import { ISucursal } from "../../../../types/sucursal/ISucursal";
import { IProducto } from "../../../../types/productos/IProducto";
import { ICategoria } from "../../../../types/categorias/ICategoria";
import { IAlergeno } from "../../../../types/alergenos/IAlergeno";
import { ICreateProducto } from "../../../../types/productos/ICreateProducto";

interface Props {
  close: () => void;
  reload: () => void;
}
interface OptionAlergeno {
  value: string;
  label: string;
}

export const CrearProducto: FC<Props> = ({ close, reload }) => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [alergenos, setAlergenos] = useState<OptionAlergeno[]>([]);
  const [optionsAlerg, setOptionsAlerg] = useState([]);
  const dispatch = useDispatch();
  const sucursal = useSelector(
    (state: RootState) => state.changeSucursales.sucursal
  ) as ISucursal | null;
  const product: IProducto = useSelector(
    (state: RootState) => state.tablaReducer.elementActive
  ) as null | IProducto | IAlergeno;
  const { values, handleChange, resetForm } = useForm({
    denominacion: product ? product.denominacion : "",
    codigo: product ? product.codigo : "",
    precio: product ? product.precioVenta : 0,
    categoria: product ? product?.categoria?.id! : "",
    habilitado: product ? product.habilitado : false,
    descripcion: product ? product.descripcion : "",
    srcPhoto:
      product && product.imagenes.length > 0 && product.imagenes[0]
        ? product.imagenes[0].url
        : "",
  });

  const handleChangeAlergenos = (selectedAlergeno: any) => {
    setAlergenos(selectedAlergeno);
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        if (sucursal) {
          const service = new ServiceCategoria();
          let response = await service.getAllSubcategorias();
          const subCategorias = await response.data;
          setCategorias(subCategorias);
        }
      } catch (error) {
        close();
      }
    };

    const fetchAlergenos = async () => {
      try {
        const service = new ServiceAlergeno();
        const response = await service.getAllAlergenos();

        const data: IAlergeno[] = response.data;
        const options = data.map((alergeno) => ({
          value: alergeno.id,
          label: alergeno.denominacion,
        }));

        setOptionsAlerg(options);
      } catch (error) {
        badContest();
        close();
      }
    };

    fetchCategorias();
    fetchAlergenos();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const service = new ServiceArticulo();
    const producto: ICreateProducto = {
      id: product ? product.id : 0,
      denominacion: values.denominacion,
      imagenes: [
        {
          url: values.srcPhoto,
          name: "Imagen del producto 1 del producto: " + values.denominacion,
        },
      ],
      habilitado: values.habilitado,
      codigo: values.codigo,
      idCategoria: parseInt(values.categoria),
      idAlergenos: alergenos
        ? alergenos.map((alergeno) => parseInt(alergeno.value))
        : [],
      precioVenta: Number(values.precio),
      descripcion: values.descripcion,
    };

    if (product) {
      try {
        console.log("Se esta modificando uno", producto);

        await service.updateProducto(product.id!, producto);
        reload();
        godContest();
      } catch (e) {
        badContest();
        close();
      }
    } else {
      try {
        console.log("Se esta creando uno nuevo");
        console.log(producto);
        await service.createProducto(producto);
        reload();
        godContest();
      } catch (e) {
        badContest("Puede que tu codigo de producto este repetido, revisalo");
        close();
      }
    }

    if (sucursal) {
      const response = await service.getArticulosPorSucursal(sucursal.id!);
      dispatch(setDataTable(response.data));
      console.log(response.data);
    }
    dispatch(removeElementActive());
    resetForm();
    close();
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.divPopUp}>
        <div className={styles.headerPopUp}>
          <div className={styles.cancel}>
            <CancelButton
              onClick={() => {
                close();
                dispatch(removeElementActive());
              }}
            ></CancelButton>
          </div>
          {product ? <h1>Editar Producto</h1> : <h1>Crear Producto</h1>}
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.divColumns}>
            <div className={styles.columns}>
              <input
                required
                onChange={handleChange}
                name="denominacion"
                value={values.denominacion}
                className={styles.inputLarge}
                type="text"
                placeholder="Ingrese una denominación"
              />
              <input
                required
                onChange={handleChange}
                name="codigo"
                value={values.codigo}
                className={styles.inputLarge}
                type="text"
                placeholder="Ingrese un código"
              />
              <input
                required
                onChange={handleChange}
                value={values.precio ? values.precio : ""}
                name="precio"
                className={styles.inputLarge}
                type="number"
                placeholder="Ingrese un precio de venta"
              />
              <select
                value={values.categoria}
                onChange={handleChange}
                className={styles.inputLarge}
                name="categoria"
                required
                id=""
                aria-placeholder="Categoria"
              >
                {product ? (
                  <option
                    key={product.categoria?.id}
                    value={product.categoria?.id}
                  >
                    {product.categoria?.denominacion}
                  </option>
                ) : (
                  <option value="" disabled>
                    Selecciona una Categoría
                  </option>
                )}
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.denominacion}
                  </option>
                ))}
              </select>

              <Select
                options={optionsAlerg}
                isMulti
                onChange={handleChangeAlergenos}
                value={alergenos}
              ></Select>

              <div className={styles.divCheck}>
                <h5>Habilitado</h5>
                <input
                  checked={values.habilitado}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "habilitado", value: e.target.checked },
                    })
                  }
                  name="habilitado"
                  type="checkbox"
                />
              </div>
            </div>

            <div className={styles.columns}>
              <textarea
                required
                value={values.descripcion}
                onChange={handleChange}
                className={styles.description}
                name="descripcion"
                placeholder="Agrega una descripción del producto"
              ></textarea>

              <div className={styles.cotainerImg}>
                <div className={styles.divImg}>
                  <img
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                    src={values.srcPhoto || "imgNotFound.jpg"}
                    alt="Imagen de Producto"
                  />
                </div>

                <div className={styles.divSrc}>
                  <input
                    style={{
                      backgroundColor: "#ACC4FF80",
                      borderRadius: "5px",
                      gap: "0.5rem",
                    }}
                    value={values.srcPhoto}
                    onChange={handleChange}
                    type="text"
                    name="srcPhoto"
                    placeholder="Ingresa el URL de la imagen"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" variant="outline-primary">
            Aceptar
          </Button>
        </form>
      </div>
    </div>
  );
};
