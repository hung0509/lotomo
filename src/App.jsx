import { Toaster } from "react-hot-toast";
import LoadingOverlay from "./components/loading/LoadingOverlay";
import { useLoading } from "./context/LoadingContext";
import AppRoutes from "./routes";


export default function App() {  
  const loading = useLoading();

  return (
    <>
     <Toaster position="top-right" />
      {loading && <LoadingOverlay />}
       <AppRoutes />
    </>
  );
}
