export interface IUpdateCategoria {
  id: number;
  disponible?: boolean;
  denominacion: string;
  idEmpresa: number;
  idSucursales: number[];
  idCategoriaPadre?: number | null;
}
