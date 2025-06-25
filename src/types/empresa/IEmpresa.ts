import { IPais } from "../IPais";
import { ISucursal } from "../sucursal/ISucursal";

export interface IEmpresa {
  id?: number;
  disponible?: boolean;
  nombre: string;
  razonSocial: string;
  cuit: number;
  logo: string;
  sucursales: ISucursal[];
  pais: IPais;
}
