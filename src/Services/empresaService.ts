import axios, { AxiosResponse } from "axios";
import { ICreateEmpresaDto } from "../types/empresa/ICreateEmpresa";

const empresaService = import.meta.env.VITE_EMPRESA_SERVICE;
export class ServiceEmpresa {
  private baseURL: string;

  constructor() {
    this.baseURL = empresaService;
  }

  public async getEmpresaById(id: number): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}`;
    return axios.get(url);
  }

  public async getAllEmpresas(): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}`;
    return axios.get(url);
  }

  public async crearEmpresa(
    empresa: ICreateEmpresaDto
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/DTO`;
    return axios.post(url, empresa, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async editarEmpresa(
    id: number,
    empresa: ICreateEmpresaDto
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}/DTO`;
    return axios.put(url, empresa, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
