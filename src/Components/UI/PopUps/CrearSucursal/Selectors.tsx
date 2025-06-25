import axios from "axios";
import { FC, useEffect, useState } from "react";
import { IPais } from "../../../../types/IPais";
import { IProvincia } from "../../../../types/IProvincia";
import { ILocalidad } from "../../../../types/ILocalidad";
import styles from "./CrearSucursal.module.css";

interface Props {
  onLocalidadChange: (localidad: string) => void;
}

export const Selectors: FC<Props> = ({ onLocalidadChange }) => {
  const [paises, setPaises] = useState<IPais[]>([]);
  const [provincias, setProvincias] = useState<IProvincia[]>([]);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
  const [selectedPais, setSelectedPais] = useState("");
  const [selectedLocalidad, setSelectedLocalidad] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [loadingProvincias, setLoadingProvincias] = useState(false);
  const [loadingLocalidades, setLoadingLocalidades] = useState(false);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await axios.get("http://localhost:8080/pais");
        setPaises(response.data);
      } catch (error) {
        console.error("Error al obtener países:", error);
      }
    };

    fetchPaises();
  }, []);

  useEffect(() => {
    const fetchProvincias = async () => {
      if (!selectedPais) return;

      setLoadingProvincias(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/provincia/findByPais/${selectedPais}`
        );
        setProvincias(response.data);
      } catch (error) {
        console.error("Error al obtener provincias:", error);
      } finally {
        setLoadingProvincias(false);
      }
    };

    fetchProvincias();
  }, [selectedPais]);

  useEffect(() => {
    const fetchLocalidades = async () => {
      if (!selectedProvincia) return;

      setLoadingLocalidades(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/localidades/findByProvincia/${selectedProvincia}`
        );
        setLocalidades(response.data);
      } catch (error) {
        console.error("Error al obtener localidades:", error);
      } finally {
        setLoadingLocalidades(false);
      }
    };

    fetchLocalidades();
  }, [selectedProvincia]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "pais") {
      setSelectedPais(value);
      setSelectedProvincia("");
      setLocalidades([]);
    } else if (name === "provincia") {
      setSelectedProvincia(value);
    } else if (name === "localidad") {
      setSelectedLocalidad(value);
      onLocalidadChange(value);
    }
  };

  return (
    <>
      <select
        required
        name="pais"
        className={styles.largeInput}
        value={selectedPais}
        onChange={handleChange}
      >
        <option value="" disabled>
          Seleccione un País
        </option>
        {paises.map((pais) => (
          <option key={pais.id} value={pais.id}>
            {pais.nombre}
          </option>
        ))}
      </select>

      <select
        required
        name="provincia"
        className={styles.largeInput}
        value={selectedProvincia}
        onChange={handleChange}
        disabled={!selectedPais || loadingProvincias}
      >
        <option value="" disabled>
          Seleccione una Provincia
        </option>
        {loadingProvincias ? (
          <option>Cargando...</option>
        ) : (
          provincias.map((provincia) => (
            <option key={provincia.id} value={provincia.id}>
              {provincia.nombre}
            </option>
          ))
        )}
      </select>

      <select
        required
        name="localidad"
        className={styles.largeInput}
        onChange={handleChange}
        disabled={!selectedProvincia || loadingLocalidades}
        value={selectedLocalidad}
      >
        <option value="" disabled>
          Seleccione una Localidad
        </option>
        {loadingLocalidades ? (
          <option>Cargando...</option>
        ) : (
          localidades.map((localidad) => (
            <option key={localidad.id} value={localidad.id}>
              {localidad.nombre}
            </option>
          ))
        )}
      </select>
    </>
  );
};
