import { useEffect, useState } from "react";
import { AcorditionCategories } from "../../UI/Categorias/AcorditionCategories";
import styles from "./categoria.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/Store";
import { AddIcon } from "../../UI/Icons/AddIcon/AddIcon";
import { CrearSubCategoria } from "../../UI/PopUps/CrearSubCategoria/CrearSubCategoria";
import { ServiceCategoria } from "../../../Services/categoriaService";
import { setCategorias } from "../../../Redux/Slice/categorias";
import { useAppDispatch } from "../../Hooks/redux";

export const CategoriasScreen = () => {
  const categorias = useSelector(
    (state: RootState) => state.setCategorias.categorias ?? []
  );
  const [create, setCreate] = useState<boolean>(false);
  const serviceCategoria = new ServiceCategoria();
  const dispatch = useAppDispatch();
  const [reload, setReload] = useState(false);
  const categoriasPadre = Array.isArray(categorias)
    ? categorias.filter((c) => !c.categoriaPadre)
    : [];

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await serviceCategoria.getAllCategorias();
        dispatch(setCategorias(response.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategorias();
  }, [reload]);

  return (
    <div style={{ backgroundColor: "#ACC4FF80" }} className={styles.mainDiv}>
      <div className={styles.add}>
        <span
          onClick={() => {
            setCreate(true);
          }}
          className={styles.span}
        >
          <AddIcon></AddIcon>
        </span>
      </div>

      <div className={styles.containerCategorias}>
        {categoriasPadre.length > 0 ? (
          categoriasPadre.map((categoria) => (
            <AcorditionCategories
              key={categoria.id}
              categoria={categoria}
              onReload={() => setReload((prev) => !prev)}
            />
          ))
        ) : (
          <div>
            <p className={styles.textNot}>No hay categorías disponibles</p>
          </div>
        )}
      </div>
      {create ? (
        <CrearSubCategoria
          onClose={() => {
            setCreate(false);
          }}
          edit={false}
          padre={true}
          onReload={() => setReload((prev) => !prev)}
        ></CrearSubCategoria>
      ) : null}
    </div>
  );
};
