import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import BottomNav from "../../components/footer/BottomNav";


export default function AdminLayout() {
  return (
    <main className="">
        <Outlet /> {/* ⚠️ nơi render route con */}

        <BottomNav />
    </main>
  );
}
