import axios, { AxiosResponse } from "axios";
import { ICreateProducto } from "../types/productos/ICreateProducto";

const articuloService = import.meta.env.VITE_ARTICULO_SERVICE;

export class ServiceArticulo {
  private baseURL: string;

  constructor() {
    this.baseURL = articuloService;
  }

  public async getArticuloById(id: number): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}`;
    return axios.get(url);
  }

  public async getArticulosPorSucursal(
    id: number
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/sucursal/${id}`;
    return axios.get(url);
  }

  public async getAllProductos(): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}`;
    return axios.get(url);
  }

  public async createProducto(
    producto: ICreateProducto
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/DTO`;
    return axios.post(url, producto, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async updateProducto(
    id: number,
    producto: ICreateProducto
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}/DTO`;
    return axios.put(url, producto, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async deleteProductoById(id: number): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/${id}`;
    return axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
