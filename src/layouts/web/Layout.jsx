import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";


export default function Layout() {
  return (
    <main className="">
        <Outlet /> {/* ⚠️ nơi render route con */}
    </main>
  );
}
