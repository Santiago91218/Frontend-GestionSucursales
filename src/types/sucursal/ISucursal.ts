import { ICategoria } from "../categorias/ICategoria";
import { IEmpresa } from "../empresa/IEmpresa";
import { IDomicilio } from "../IDomicilio";

export interface ISucursal {
  id?: number;
  disponible?: boolean;
  nombre: string;
  empresa: IEmpresa;
  domicilio: IDomicilio;
  calle: string;
  latitud: number;
  longitud: number;
  categorias: ICategoria[];
  esCasaMatriz: boolean;
  horarioApertura: string;
  horarioCierre: string;
  logo: string;
}
