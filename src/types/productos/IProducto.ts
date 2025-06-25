import { IAlergeno } from "../alergenos/IAlergeno";
import { ICategoria } from "../categorias/ICategoria";
import { IImagen } from "../IImagen";

export interface IProducto {
  id: number;
  disponible?: boolean;
  denominacion: string;
  precioVenta: number;
  descripcion: string;
  categoria: ICategoria;
  habilitado: boolean;
  codigo: string;
  alergenos: IAlergeno[];
  imagenes: IImagen[];
}
