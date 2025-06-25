import { IImagen } from "../IImagen";

export interface IAlergeno {
  id: number;
  disponible?: boolean;
  denominacion: string;
  imagen: IImagen;
}
