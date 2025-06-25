import { FC } from "react";
import styles from "./CrearEmpresa.module.css";
import { CancelButton } from "../../Icons/CancelButton";
import { Button } from "react-bootstrap";
import { useForm } from "../../../Hooks/useForm";
import Swal from "sweetalert2";
import { ServiceEmpresa } from "../../../../Services/empresaService";
import { godContest, badContest } from "../Alerts/ServerBadAlert";
import { ICreateEmpresaDto } from "../../../../types/empresa/ICreateEmpresa";
import { IEmpresa } from "../../../../types/empresa/IEmpresa";

interface Props {
  onClose: () => void;
  editar?: boolean;
  empresa: IEmpresa | null;
  fetchEmpresas: () => Promise<void>;
}

export const CrearEmpresa: FC<Props> = ({
  onClose,
  editar,
  empresa,
  fetchEmpresas,
}) => {
  const { values, handleChange, resetForm } = useForm({
    nombre: editar && empresa ? empresa.nombre : "",
    razonSocial: editar && empresa ? empresa.razonSocial : "",
    cuit: editar && empresa ? empresa.cuit.toString() : "",
    logo: editar && empresa?.logo ? empresa.logo : "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (values.cuit && values.cuit.toString().length !== 11) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El CUIT debe tener exactamente 11 dígitos.",
        showCloseButton: true,
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const nuevaEmpresaDto: ICreateEmpresaDto = {
      nombre: values.nombre,
      razonSocial: values.razonSocial,
      cuit: parseInt(values.cuit as string, 10) || 0,
      logo: values.logo || null,
    };

    const serviceEmpresa = new ServiceEmpresa();
    try {
      if (editar && empresa) {
        await serviceEmpresa.editarEmpresa(empresa.id!, nuevaEmpresaDto);
        godContest();
      } else {
        await serviceEmpresa.crearEmpresa(nuevaEmpresaDto);
        godContest();
      }

      await fetchEmpresas();
    } catch (error) {
      badContest();
      console.error("Error al guardar la empresa:", error);
    }

    resetForm();
    onClose();
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.modalEmpresa}>
        <div className={styles.contentTittle}>
          {editar && empresa ? (
            <h2>Modificar Empresa</h2>
          ) : (
            <h2>Crear Empresa</h2>
          )}

          <div className={styles.contentbutton}>
            <CancelButton onClick={onClose} />
          </div>
        </div>
        <form className={styles.formCrearEmpresa} onSubmit={handleSubmit}>
          <div className={styles.contentInputs}>
            <input
              type="text"
              name="nombre"
              placeholder="Ingresa un Nombre"
              value={values.nombre}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="razonSocial"
              placeholder="Ingresa una Razón Social"
              value={values.razonSocial}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="cuit"
              placeholder="Ingresa un CUIT"
              value={values.cuit ? values.cuit : ""}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="logo"
            placeholder="Agrega una Imagen"
            value={values.logo}
            onChange={handleChange}
          />

          <Button type="submit" variant="outline-success">
            Confirmar
          </Button>
        </form>
      </div>
    </div>
  );
};
