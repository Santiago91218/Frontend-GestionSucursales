import { Button } from "react-bootstrap";
import { setElementActive } from "../../../Redux/Slice/TablaReducer";
import { useAppDispatch } from "../../Hooks/redux";
import { VerIcon } from "../Icons/VerIcon/VerIcon";
import { useState } from "react";
import { VerProducto } from "../PopUps/VerProducto/VerProducto";
import { VerAlergeno } from "../PopUps/VerAlergeno/VerAlergeno";
import { IProducto } from "../../../types/productos/IProducto";
import { IAlergeno } from "../../../types/alergenos/IAlergeno";

interface IButtonsTable {
  el: IProducto | IAlergeno;
  handleDelete: (id: number) => void;
  setOpenModal: (state: boolean) => void;
}

export const ButtonsTable = ({
  el,
  handleDelete,
  setOpenModal,
}: IButtonsTable) => {
  const dispatch = useAppDispatch();

  const [ver, setVer] = useState<boolean>(false);

  const handleModalSelected = () => {
    dispatch(setElementActive({ element: el }));

    setOpenModal(true);
  };

  const handleDeleteItem = () => {
    handleDelete(el.id);
  };

  const handleVerProducto = () => {
    dispatch(setElementActive({ element: el }));
    setVer(true);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Button variant="contained" onClick={handleModalSelected}>
        <span className="material-symbols-outlined">edit</span>
      </Button>
      <Button variant="contained" onClick={handleVerProducto}>
        <VerIcon />
      </Button>

      <Button variant="contained" color="error" onClick={handleDeleteItem}>
        <span className="material-symbols-outlined">delete_forever</span>
      </Button>
      {ver && el ? (
        "codigo" in el ? (
          <VerProducto
            onClose={() => setVer(false)}
            producto={el as IProducto}
          />
        ) : (
          <VerAlergeno
            onClose={() => setVer(false)}
            alergeno={el as IAlergeno}
          />
        )
      ) : null}
    </div>
  );
};
