import { configureStore } from "@reduxjs/toolkit";
import SucursalesEmpresa from "../Slice/sucursalsEmpresaElegida";
import TablaSlice from "../Slice/TablaReducer";
import CategoriasSlice from "../Slice/categorias";

export const store = configureStore({
  reducer: {
    changeSucursales: SucursalesEmpresa,
    tablaReducer: TablaSlice,
    setCategorias: CategoriasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
