"use client";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* 🔥 Button mobile */}
      <button
        onClick={() => setShowSidebar(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#038a42] text-white px-3 py-2 rounded-lg shadow"
      >
        ☰
      </button>

      {/* 🔥 Overlay */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`
        fixed top-0 left-0 
        h-screen w-64   // 🔥 quan trọng
        bg-[#038a42] text-white p-4 z-50
        transform transition-transform duration-300
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex font-itim
    `}
      >
        {/* Close mobile */}
        <button
          onClick={() => setShowSidebar(false)}
          className="absolute top-4 right-4 md:hidden"
        >
          ✕
        </button>

        <div className="w-full">
          <h1 className="text-xl font-bold mb-6">POS Admin</h1>

          <Link
            to="/admin"
            className="block p-2 rounded-lg hover:bg-white/20 cursor-pointer"
          >
            Sản phẩm
          </Link>

          <Link
            to="/admin/option"
            className="block p-2 rounded-lg hover:bg-white/20 cursor-pointer"
          >
            Thuộc tính
          </Link>
        </div>
      </div>
    </>
  );
}
