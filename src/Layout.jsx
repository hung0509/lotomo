import { Outlet } from "react-router-dom";
import HeaderWeb from "../../components/headers/HeaderWeb";

export default function Layout() {
  return (
    <div className="min-h-screen text-white">
      <HeaderWeb/>
        
      <main className="">
        <Outlet /> 
      </main>
    </div>
  );
}
