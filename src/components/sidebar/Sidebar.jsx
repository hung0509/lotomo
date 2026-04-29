import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [openShift, setOpenShift] = useState(true);

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile button */}
      <button
        onClick={() => setShowSidebar(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#038a42] text-white px-3 py-2 rounded-lg shadow"
      >
        ☰
      </button>

      {/* Overlay */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen w-64
        bg-[#038a42] text-white p-4 z-50
        transform transition-transform duration-300
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex flex-col
      `}
      >
        {/* Close mobile */}
        <button
          onClick={() => setShowSidebar(false)}
          className="absolute top-4 right-4 md:hidden"
        >
          ✕
        </button>

        <h1 className="text-xl font-bold mb-6">POS Admin</h1>

         <Link
          to="/admin/ingredient"
          className={`block p-2 rounded-lg ${
            isActive("/admin/ingredient") ? "bg-white text-[#038a42]" : "hover:bg-white/20"
          }`}
        >
          Nguyên vật liệu 
        </Link>

        {/* Sản phẩm */}
        <Link
          to="/admin"
          className={`block p-2 rounded-lg ${
            isActive("/admin") ? "bg-white text-[#038a42]" : "hover:bg-white/20"
          }`}
        >
          Sản phẩm
        </Link>

        {/* Thuộc tính */}
        <Link
          to="/admin/option"
          className={`block p-2 rounded-lg ${
            isActive("/admin/option")
              ? "bg-white text-[#038a42]"
              : "hover:bg-white/20"
          }`}
        >
          Thuộc tính
        </Link>

        {/* ===== TREE: CA LÀM VIỆC ===== */}
        <div className="mt-2">

          {/* Parent */}
          <div
            onClick={() => setOpenShift(!openShift)}
            className="flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-white/20"
          >
            <span>Ca làm việc</span>

            <ChevronDown
              size={16}
              className={`transition-transform ${
                openShift ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Children */}
          {openShift && (
            <div className="ml-3 mt-1 space-y-1 border-l border-white/20 pl-3">

              <Link
                to="/admin/shift"
                className={`block text-sm p-2 rounded-lg ${
                  isActive("/admin/shift")
                    ? "bg-white text-[#038a42]"
                    : "hover:bg-white/20"
                }`}
              >
                Quản lý ca
              </Link>

              <Link
                to="/admin/shift-schedule"
                className={`block text-sm p-2 rounded-lg ${
                  isActive("/admin/shift-schedule")
                    ? "bg-white text-[#038a42]"
                    : "hover:bg-white/20"
                }`}
              >
                Lịch làm việc
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}