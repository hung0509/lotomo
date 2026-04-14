"use client";
import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const productsMock = [
  {
    id: 1,
    name: "Matcha Latte",
    price: 45000,
    image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256",
  },
  {
    id: 2,
    name: "Matcha Đá Xay",
    price: 55000,
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096",
  },
  {
    id: 3,
    name: "Matcha Kem Cheese",
    price: 60000,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
  },
];

const toppingsMock = [
  { id: 1, name: "Trân châu", price: 5000 },
  { id: 2, name: "Kem cheese", price: 7000 },
  { id: 3, name: "Thạch đào", price: 6000 },
];

export default function POSScreen() {
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const toggleTopping = (id) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const addToCart = () => {
    const key = `${selectedProduct.id}-${selectedToppings.sort().join("-")}`;

    setCart((prev) => {
      const updated = {
        ...prev,
        [key]: {
          product: selectedProduct,
          toppings: toppingsMock.filter((t) => selectedToppings.includes(t.id)),
          qty: (prev[key]?.qty || 0) + 1,
        },
      };

      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });

    setSelectedProduct(null);
    setSelectedToppings([]);
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b.qty, 0);

  const totalPrice = Object.values(cart).reduce((sum, item) => {
    if (!item || !item.product) return sum;

    const basePrice = item.product?.price || 0;

    const toppingPrice = (item.toppings || []).reduce(
      (t, tp) => t + (tp?.price || 0),
      0,
    );

    return sum + (basePrice + toppingPrice) * (item.qty || 0);
  }, 0);

  const handleCreateOrder = () => {
    localStorage.setItem("order", JSON.stringify(Object.values(cart)));
    navigate("/order");
  };

  const filtered = productsMock.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const getProductQty = (productId) => {
    return Object.values(cart).reduce((sum, item) => {
      if (!item?.product) return sum;
      return item.product.id === productId ? sum + item.qty : sum;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-[#038a42] flex justify-center py-6">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 shadow">
          <h1 className="text-lg font-bold text-[#038a42]">Bán hàng</h1>

          <div className="mt-2 flex bg-gray-100 px-3 py-2 rounded-xl">
            <Search size={16} className="text-gray-400" />
            <input
              className="ml-2 bg-transparent outline-none text-sm"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Products */}
        {filtered.map((p) => {
          const qty = getProductQty(p.id);

          return (
            <div
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-xl cursor-pointer hover:bg-gray-100"
            >
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <img
                    src={p.image}
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  {/* 🔥 Badge số lượng */}
                  {qty > 0 && (
                    <div className="absolute -top-2 -right-2 bg-[#038a42] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {qty}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold">{p.name}</h3>
                  <p className="text-[#038a42] text-sm font-bold">
                    {p.price.toLocaleString()}đ
                  </p>
                </div>
              </div>

              {/* 👉 Icon đổi trạng thái */}
              {qty > 0 ? (
                <span className="text-[#038a42] font-bold text-sm">
                  Đã chọn
                </span>
              ) : (
                <Plus />
              )}
            </div>
          );
        })}

        {/* Bottom */}
        {totalItems > 0 && (
          <div className="fixed bottom-0 left-0 w-full flex justify-center">
            <div className="w-full max-w-[420px] bg-white p-4 border-t">
              <div className="flex justify-between text-sm mb-2">
                <span>Tổng tiền</span>
                <span className="text-[#038a42] font-bold">
                  {totalPrice.toLocaleString()}đ
                </span>
              </div>

              <button
                onClick={() => navigate("/review")}
                className="w-full bg-[#038a42] text-white py-3 rounded-xl font-semibold"
              >
                Tiếp tục ({totalItems})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal topping */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-end">
          <div className="bg-white w-full max-w-[420px] mx-auto rounded-t-2xl p-4">
            <h2 className="font-bold mb-3">{selectedProduct.name}</h2>

            <div className="space-y-2">
              {toppingsMock.map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTopping(t.id)}
                  className={`flex justify-between p-2 rounded-lg cursor-pointer ${
                    selectedToppings.includes(t.id)
                      ? "bg-[#038a42]/10"
                      : "bg-gray-50"
                  }`}
                >
                  <span>{t.name}</span>
                  <span>{t.price.toLocaleString()}đ</span>
                </div>
              ))}
            </div>

            <button
              onClick={addToCart}
              className="w-full mt-4 bg-[#038a42] text-white py-3 rounded-xl"
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
