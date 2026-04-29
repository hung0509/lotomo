import { Route } from "react-router-dom";
import Layout from "../../layouts/web/Layout";
import WebHomePage from "./pages/WebHome";
import POSScreen from "./pages/POSScreen";
import OrderPage from "../management/pages/OrderPage";
import SelectRolePage from "./pages/SelectRolePage";
import LoginPage from "./pages/LoginPage";
import ReviewOrder from "./pages/ReviewOrder";

const WebRoutes = (
  <>
    <Route element={<Layout />}>
       <Route path="/" element={<Navigate to="/home" />} /> 
       <Route path="/home" element={<WebHomePage />} />
       <Route path="/select-role" element={<SelectRolePage />} />
       <Route path="/pos" element={<POSScreen />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/review" element={<ReviewOrder />} />
    </Route>
  </>
);

export default WebRoutes;
