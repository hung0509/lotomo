"use client";
import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, Menu } from "lucide-react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../../../hooks/useProduct";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { fetchAll } = useProduct();
  const nagivate = useNavigate();

  // const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const fetchData = async (search) => {
      const res = await fetchAll(search);
      console.log(res);

      setProducts(res);
    };

    fetchData();
  }, [search]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleStatus = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : p,
      ),
    );
  };

  const deleteProduct = (id) => {
    if (confirm("Xóa sản phẩm này?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-itim">
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button className="md:hidden" onClick={() => setOpenSidebar(true)}>
              <Menu />
            </button>

            <h1 className="text-xl font-bold text-[#038a42]">
              Quản lý sản phẩm
            </h1>
          </div>

          <Link
            to="/admin/product"
            className="hidden md:flex bg-[#038a42] text-white px-4 py-2 rounded-xl items-center gap-2"
          >
            <Plus size={16} />
            Thêm sản phẩm
          </Link>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="flex bg-white px-3 py-2 rounded-xl shadow">
            <Search size={16} className="text-gray-400" />
            <input
              className="ml-2 outline-none text-sm flex-1"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-[#038a42] font-bold">
                  {p.price.toLocaleString()}đ
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    p.status === "ACTIVE"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {p.status === "ACTIVE" ? "Đang bán" : "Ngừng bán"}
                </span>
              </div>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => toggleStatus(p.id)}
                  className="text-xs border px-2 py-1 rounded-lg"
                >
                  Toggle
                </button>

                <div className="flex gap-2">
                  <button 
                    className="p-2 bg-blue-100 rounded-lg"
                    onClick={() => nagivate("/admin/product/edit/" + p.id)}
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="p-2 bg-red-100 rounded-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile add button */}
        <Link
          to="/admin/product"
          className="fixed bottom-4 right-4 md:hidden w-14 h-14 bg-[#038a42] text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus />
        </Link>
      </div>
    </div>
  );
}
