import { IProducto } from "../productos/IProducto";
import { ISucursal } from "../sucursal/ISucursal";

export interface ICategoria {
  id?: number;
  disponible?: boolean;
  denominacion: string;
  sucursales: ISucursal[];
  subCategorias: ICategoria[];
  categoriaPadre: ICategoria;
  articulos: IProducto[];
}
