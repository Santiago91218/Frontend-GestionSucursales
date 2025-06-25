import { ILocalidad } from "./ILocalidad";

export interface IDomicilio {
  id: number;
  disponible: boolean;
  calle: string;
  numero: number;
  cp: number;
  piso: number;
  nroDpto: number;
  localidad: ILocalidad;
}
