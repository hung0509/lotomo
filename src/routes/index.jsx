import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebRoutes from "../modules/web/routes";


export default function AppRoutes() {
  return (
     <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
              <Routes>
                {WebRoutes}
              </Routes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
