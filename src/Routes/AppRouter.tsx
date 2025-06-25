import { Route, Routes } from "react-router-dom";
import { Home } from "../Components/Screens/Home/Home";
import { Admin } from "../Components/Screens/Admin/Admin";
import { Product } from "../Components/Screens/Productos/Product";
import { Alergeno } from "../Components/Screens/Alergenos/Alergeno";
import { CategoriasScreen } from "../Components/Screens/CategoriasScreen/Categorias";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/admin" element={<Admin />}>
        <Route path="productos" element={<Product />} />
        <Route path="alergenos" element={<Alergeno />} />
        <Route path="categorias" element={<CategoriasScreen />} />
      </Route>
    </Routes>
  );
};
