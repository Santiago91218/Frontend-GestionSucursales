import axios, { AxiosResponse } from "axios";
import { IAlergeno } from "../types/alergenos/IAlergeno";

const alergenoService = import.meta.env.VITE_ALERGENO_SERVICE;
export class ServiceAlergeno {
  private baseURL: string;

  constructor() {
    this.baseURL = alergenoService;
  }

  public async getAlergenoById(id: number): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}`;
    return axios.get(url);
  }

  public async getAllAlergenos(): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}`;
    return axios.get(url);
  }

  public async crearAlergeno(alegeno: IAlergeno): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}`;
    return axios.post(url, alegeno, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async editarAlergeno(
    id: number,
    alegeno: IAlergeno
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}`;
    return axios.put(url, alegeno, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async deleteAlergenoById(id: number): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}`;
    return axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
