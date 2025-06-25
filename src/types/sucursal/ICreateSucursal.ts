import { ICategoria } from "../categorias/ICategoria";

export interface ICreateSucursal {
  id?: number;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  latitud: number;
  longitud: number;
  domicilio: {
    id?: number;
    calle: string;
    numero: number;
    cp: number;
    piso: number;
    nroDpto: number;
    idLocalidad: number;
  };
  idEmpresa?: number;
  logo: string | null;
  categorias?: ICategoria[];
}
