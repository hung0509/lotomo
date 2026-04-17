import { Route } from "react-router-dom";
import Layout from "../../layouts/web/Layout";
import KitchenPage from "./pages/KitchenPage";
import ProductManagement from "./pages/ProductManagement";
import OptionManagement from "./pages/OptionManagement";
import ProductForm from "./pages/ProductFrom";
import OrderPage from "./pages/OrderPage";

const AdminRoutes = (
  <>
    <Route element={<Layout />}>
       <Route path="/admin/kitchen" element={<KitchenPage />} />
       <Route path="/admin" element={<ProductManagement />} />
       <Route path="/admin/option" element={<OptionManagement />} />
       <Route path="/admin/product" element={<ProductForm />} />
       <Route path="/admin/product/edit/:id" element={<ProductForm />} />
      <Route path="/admin/order" element={<OrderPage />} />
    </Route>
  </>
);

export default AdminRoutes;
