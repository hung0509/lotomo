import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebRoutes from "../modules/web/routes";
import AdminRoutes from "../modules/admin/routes";
import ManagementRoutes from "../modules/management/routes";


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
        {ManagementRoutes}
      </Routes>
    </BrowserRouter>
  );
}
