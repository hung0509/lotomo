import { Route } from "react-router-dom";
import Layout from "../../layouts/web/Layout";
import KitchenPage from "./pages/KitchenPage";

const AdminRoutes = (
  <>
    <Route element={<Layout />}>
       <Route path="/admin/kitchen" element={<KitchenPage />} />
    </Route>
  </>
);

export default AdminRoutes;
