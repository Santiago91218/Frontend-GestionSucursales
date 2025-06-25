import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Routes/AppRouter";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </>
  );
};
