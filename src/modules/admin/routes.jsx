import { Route } from "react-router-dom";

import Layout from "../../layouts/web/Layout";
import ProductManagement from "./page/ProductManagement";
import ProductForm from "./page/ProductFrom";
import OptionManagement from "./page/OptionManagement";
import ShiftManagementPage from "./page/ShiftManagementPage";
import ShiftScheduleCalendar from "./page/ShiftScheduleCalendar";
import IngredientList from "./page/IngredientList";
import IngredientDetail from "./page/IngredientDetail";


const AdminRoutes = (
  <>
    <Route element={<Layout />}>
       <Route path="/admin" element={<ProductManagement />} />
       <Route path="/admin/ingredient" element={<IngredientList />} />
       <Route path="/admin/ingredient/:id" element={<IngredientDetail />} />
       <Route path="/admin/product" element={<ProductForm />} />
       <Route path="/admin/product/edit/:id" element={<ProductForm />} />
       <Route path="/admin/option" element={<OptionManagement />} />

       <Route path="/admin/shift" element={<ShiftManagementPage />} />
       <Route path="/admin/shift-schedule" element={<ShiftScheduleCalendar />} />
    </Route>
  </>
);

export default AdminRoutes;
