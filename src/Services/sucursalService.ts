import axios, { AxiosResponse } from "axios";
import { ICreateSucursal } from "../types/sucursal/ICreateSucursal";

const sucursalService = import.meta.env.VITE_SUCURSAL_SERVICE;

export class ServiceSucursal {
  private baseURL: string;

  constructor() {
    this.baseURL = sucursalService;
  }

  public async getAllSucursalesByEmpresa(
    idEmpresa: number
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/porEmpresa/${idEmpresa}`;
    return axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  public async crearSucursal(
    sucursal: ICreateSucursal
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/DTO`;
    return axios.post(url, sucursal, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async editarSucursal(
    id: number,
    sucursal: ICreateSucursal
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}/DTO`;
    return axios.put(url, sucursal, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
