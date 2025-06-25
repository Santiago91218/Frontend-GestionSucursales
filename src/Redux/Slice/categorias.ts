import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoria } from "../../types/categorias/ICategoria";

interface CategoriasState {
  categorias: ICategoria[];
}

const initialState: CategoriasState = {
  categorias: [],
};

const CategoriasSlice = createSlice({
  name: "CategoriasSlice",
  initialState,
  reducers: {
    setCategorias: (state, action: PayloadAction<ICategoria[]>) => {
      state.categorias = action.payload;
    },
  },
});

export const { setCategorias } = CategoriasSlice.actions;
export default CategoriasSlice.reducer;
