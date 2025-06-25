import { useState, useEffect } from "react";
import { ServiceEmpresa } from "../../../Services/empresaService";
import { ListEmpresa } from "../CardEmpresa/ListEmpresa";
import { CrearEmpresa } from "../PopUps/CrearEmpresa/CrearEmpresa";
import styles from "./Empresas.module.css";
import { IEmpresa } from "../../../types/empresa/IEmpresa";

export const EmpresasContainer = () => {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [showCrearEmpresa, setShowCrearEmpresa] = useState(false);

  const fetchEmpresas = async () => {
    const service = new ServiceEmpresa();
    try {
      const response = await service.getAllEmpresas();
      setEmpresas(response.data);
    } catch (error) {
      console.error("Error al obtener empresas:", error);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const handleAddEmpresa = (empresa: IEmpresa) => {
    setEmpresas((prevEmpresas) => {
      const existe = prevEmpresas.some((e) => e.id === empresa.id);
      if (existe) {
        return prevEmpresas.map((e) => (e.id === empresa.id ? empresa : e));
      } else {
        return [...prevEmpresas, empresa];
      }
    });
  };

  return (
    <div className={styles.divContainer}>
      <button
        className={styles.buttonEmpresa}
        onClick={() => setShowCrearEmpresa(true)}
      >
        Agregar Empresa
      </button>
      <ListEmpresa onAddEmpresa={handleAddEmpresa} empresas={empresas} />
      {showCrearEmpresa && (
        <CrearEmpresa
          onClose={() => setShowCrearEmpresa(false)}
          empresa={null}
          fetchEmpresas={fetchEmpresas}
        />
      )}
    </div>
  );
};
