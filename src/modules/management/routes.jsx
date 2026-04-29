import { Route } from "react-router-dom";
import KitchenPage from "./pages/KitchenPage";
import ProductManagement from "../admin/page/ProductManagement";
import OptionManagement from "../admin/page/OptionManagement";
import ProductForm from "../admin/page/ProductFrom";
import OrderPage from "./pages/OrderPage";
import AdminLayout from "../../layouts/manager/AdminLayout";
import POSScreen from "./pages/POSScreen";
import ShiftManagementPage from "../admin/page/ShiftManagementPage";
import ShiftScheduleCalendar from "../admin/page/ShiftScheduleCalendar";

const ManagementRoutes = (
  <>
    <Route element={<AdminLayout />}>
       <Route path="/manage/kitchen" element={<KitchenPage />} />
       <Route path="/manage/pos" element={<POSScreen />} />
       <Route path="/manage/order" element={<OrderPage />} />
    </Route>
  </>
);

export default ManagementRoutes;
