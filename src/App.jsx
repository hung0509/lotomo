import { Toaster } from "react-hot-toast";
import LoadingOverlay from "./components/loading/LoadingOverlay";
import AppRoutes from "./routes";

export default function App() {

  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />
      <LoadingOverlay />
    </>
  );
}
