import axios, { AxiosResponse } from "axios";
import { ICreateCategoria } from "../types/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../types/categorias/IUpdateCategoria";

const categoriaService = import.meta.env.VITE_CATEGORIAS_SERVICE;
export class ServiceCategoria {
  private baseURL: string;

  constructor() {
    this.baseURL = categoriaService;
  }

  public async getCategoriaById(id: number): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}`;
    return axios.get(url);
  }

  public async getAllSubCategoriasByIdSucursal(
    id: number
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/subcategorias/sucursal/${id}`;
    return axios.get(url);
  }

  public async getAllCategorias(): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}`;
    return axios.get(url);
  }

  public async createCategoria(
    categoria: ICreateCategoria
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/DTO`;
    return axios.post(url, categoria, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async updateCategoria(
    id: number,
    categoria: IUpdateCategoria
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}/DTO`;
    return axios.put(url, categoria, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async getCategoriasPadrePorSucursal(
    idSucursal: number
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/padre/sucursal/${idSucursal}`;
    return axios.get(url);
  }

  public async getAllSubcategoriasByIDCategoriaPadre(
    idPadre: number
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/subcategorias/${idPadre}`;
    return axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async getAllSubcategorias(): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/subcategorias`;
    return axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
