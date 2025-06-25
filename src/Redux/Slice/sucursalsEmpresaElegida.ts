import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/empresa/IEmpresa";
import { ISucursal } from "../../types/sucursal/ISucursal";

interface UserDataInitial {
  empresa: IEmpresa | null;
  sucursal: ISucursal | null;
}

const initialState: UserDataInitial = { empresa: null, sucursal: null };
const Empresa = createSlice({
  name: "empresa",
  initialState,
  reducers: {
    setSelectedEmpresa: (state, action: PayloadAction<IEmpresa>) => {
      console.log(action.payload);
      state.empresa = action.payload;
    },
    setSelectedSucursal: (state, action: PayloadAction<ISucursal>) => {
      console.log(action.payload);
      state.sucursal = action.payload;
    },
  },
});

export const { setSelectedEmpresa, setSelectedSucursal } = Empresa.actions;
export default Empresa.reducer;
