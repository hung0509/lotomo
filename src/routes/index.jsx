import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebRoutes from "../modules/web/routes";
import AdminRoutes from "../modules/management/routes";


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
        {AdminRoutes}
      </Routes>
    </BrowserRouter>
  );
}
