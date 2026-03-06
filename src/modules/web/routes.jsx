import { Route } from "react-router-dom";
import Layout from "../../layouts/web/Layout";
import WebHomePage from "./pages/WebHome";

const WebRoutes = (
  <>
    <Route element={<Layout />}>
       <Route path="/home" element={<WebHomePage />} />
    </Route>
  </>
);

export default WebRoutes;
