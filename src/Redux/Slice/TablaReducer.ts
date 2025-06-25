import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducto } from "../../types/productos/IProducto";
import { IAlergeno } from "../../types/alergenos/IAlergeno";
import { ICategoria } from "../../types/categorias/ICategoria";

interface IInitialState {
  dataTable: IProducto[] | IAlergeno[];
  elementActive: null | IProducto | IAlergeno | ICategoria;
}

const initialState: IInitialState = {
  dataTable: [],
  elementActive: null,
};

interface PayloadSetElement {
  element: IProducto | IAlergeno | ICategoria;
}

const TablaReducer = createSlice({
  name: "TablaReducer",
  initialState,
  reducers: {
    setDataTable(state, action: PayloadAction<any[]>) {
      state.dataTable = action.payload;
    },

    setElementActive(state, action: PayloadAction<PayloadSetElement>) {
      state.elementActive = action.payload.element;
    },

    removeElementActive(state) {
      state.elementActive = null;
    },
  },
});

export const { setDataTable, setElementActive, removeElementActive } =
  TablaReducer.actions;

export default TablaReducer.reducer;
