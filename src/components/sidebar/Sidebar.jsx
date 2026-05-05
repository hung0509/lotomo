import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [openShift, setOpenShift] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const goToPOS = () => {
    navigate("/manage/kitchen");
  };

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
          bg-[#038a42] text-white p-5 z-50
          transform transition-transform duration-300
          flex flex-col
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        {/* Close mobile */}
        <button
          onClick={() => setShowSidebar(false)}
          className="absolute top-4 right-4 md:hidden"
        >
          ✕
        </button>

        {/* Logo */}
        <h1 className="text-xl font-semibold mb-6 tracking-wide">POS Admin</h1>

        {/* MENU */}
        <div className="space-y-1 text-sm">
          <Link
            to="/select-role"
            className={`block px-3 py-2 rounded-lg transition ${
              isActive("/select-role")
                ? "bg-white text-[#038a42] font-medium"
                : "hover:bg-white/20"
            }`}
          >
            Chọn vai trò
          </Link>

          <Link
            to="/admin/ingredient"
            className={`block px-3 py-2 rounded-lg transition ${
              isActive("/admin/ingredient")
                ? "bg-white text-[#038a42] font-medium"
                : "hover:bg-white/20"
            }`}
          >
            Nguyên vật liệu
          </Link>

          <Link
            to="/admin"
            className={`block px-3 py-2 rounded-lg transition ${
              isActive("/admin")
                ? "bg-white text-[#038a42] font-medium"
                : "hover:bg-white/20"
            }`}
          >
            Sản phẩm
          </Link>

          <Link
            to="/admin/option"
            className={`block px-3 py-2 rounded-lg transition ${
              isActive("/admin/option")
                ? "bg-white text-[#038a42] font-medium"
                : "hover:bg-white/20"
            }`}
          >
            Thuộc tính
          </Link>

          {/* SHIFT */}
          <div className="pt-2">
            <div
              onClick={() => setOpenShift(!openShift)}
              className="flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-white/20 transition"
            >
              <span>Ca làm việc</span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openShift ? "rotate-180" : ""
                }`}
              />
            </div>

            {openShift && (
              <div className="ml-3 mt-1 space-y-1 border-l border-white/20 pl-3">
                <Link
                  to="/admin/shift"
                  className={`block text-sm px-3 py-2 rounded-lg transition ${
                    isActive("/admin/shift")
                      ? "bg-white text-[#038a42]"
                      : "hover:bg-white/20"
                  }`}
                >
                  Quản lý ca
                </Link>

                <Link
                  to="/admin/shift-schedule"
                  className={`block text-sm px-3 py-2 rounded-lg transition ${
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

        {/* BOTTOM */}
        <div className="mt-auto pt-6 space-y-2 border-t border-white/20">
          <button
            onClick={() => {
              handleLogout();
              setShowSidebar(false);
            }}
            className="w-full px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </>
  );
}
