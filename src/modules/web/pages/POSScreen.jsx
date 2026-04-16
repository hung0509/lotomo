"use client";
import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../hooks/useProduct";
import toast from "react-hot-toast";

const productsMock = [
  {
    id: 1,
    name: "Matcha Latte",
    price: 45000,
    image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256",
    options: [
      {
        id: 1,
        name: "Size",
        items: [
          { id: 1, name: "M", price: 0 },
          { id: 2, name: "L", price: 5000 },
        ],
      },
      {
        id: 2,
        name: "Topping",
        items: [
          { id: 3, name: "Trân châu", price: 5000 },
          { id: 4, name: "Kem cheese", price: 7000 },
        ],
      },
    ],
  },

  {
    id: 2,
    name: "Matcha Đá Xay",
    price: 55000,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    options: [
      {
        id: 1,
        name: "Size",
        items: [
          { id: 1, name: "M", price: 0 },
          { id: 2, name: "L", price: 5000 },
        ],
      },
      {
        id: 2,
        name: "Topping",
        items: [
          { id: 3, name: "Trân châu", price: 5000 },
          { id: 4, name: "Kem cheese", price: 7000 },
        ],
      },
    ],
  },
];

export default function POSScreen() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { fetchForPos } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // 👉 check localStorage trước
      const cached = localStorage.getItem("products");

      if (cached) {
        setProducts(JSON.parse(cached));
        return; //có rồi thì không gọi API nữa
      }

      const res = await fetchForPos();
      console.log(res);

      setProducts(res);

      //  lưu lại để lần sau dùng
      localStorage.setItem("products", JSON.stringify(res));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  const toggleOption = (groupId, item) => {
    const group = selectedProduct?.options?.find((g) => g.id === groupId);
    if (!group) return;

    setSelectedOptions((prev) => {
      if (group.type === "SINGLE") {
        return {
          ...prev,
          [groupId]: item,
        };
      } else {
        const current = prev[groupId] || [];
        const exists = current.find((i) => i.id === item.id);

        return {
          ...prev,
          [groupId]: exists
            ? current.filter((i) => i.id !== item.id)
            : [...current, item],
        };
      }
    });
  };

  const addToCart = () => {
    const missing = selectedProduct.options.find(
      (g) => g.isRequired === "Y" && !selectedOptions[g.id],
    );

    if (missing) {
      toast.error(`Vui lòng chọn ${missing.name}`);
      return;
    }

    const flatOptions = Object.values(selectedOptions).flat();

    const key = `${selectedProduct.id}-${flatOptions
      .map((o) => o.id)
      .sort()
      .join("-")}`;

    // 👉 tính giá options
    const optionTotal = flatOptions.reduce((sum, o) => sum + o.price, 0);

    const finalPrice = selectedProduct.price + optionTotal;

    setCart((prev) => {
      const prevItem = prev[key];

      const newQty = (prevItem?.qty || 0) + 1;

      const updated = {
        ...prev,
        [key]: {
          product: selectedProduct,
          options: flatOptions,
          qty: newQty,

          //  QUAN TRỌNG
          price: finalPrice,
          total: finalPrice * newQty,
        },
      };

      localStorage.setItem("cart", JSON.stringify(updated));

      toast.success(`Thêm giỏ hàng thành công món ${selectedProduct.name}`);
      return updated;
    });

    setSelectedProduct(null);
    setSelectedOptions({});
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b.qty, 0);

  const totalPrice = Object.values(cart).reduce((sum, item) => {
    if (!item || !item.product) return sum;

    const basePrice = item.product.price;

    const optionPrice = (item.options || []).reduce((t, o) => t + o.price, 0);

    return sum + (basePrice + optionPrice) * item.qty;
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
        {products.map((p) => {
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
        <div
          className="fixed inset-0 bg-black/40 flex items-end"
          onClick={() => setSelectedProduct(null)} // 👈 thêm dòng này
        >
          <div
            className="bg-white w-full max-w-[420px] mx-auto rounded-t-2xl p-4"
            onClick={(e) => e.stopPropagation()} // 👈 thêm dòng này
          >
            <h2 className="font-bold mb-3">{selectedProduct.name}</h2>

            <div className="space-y-2">
              {selectedProduct.options?.map((group) => (
                <div key={group.id} className="mb-3">
                  <h3 className="font-semibold text-sm mb-1">{group.name}</h3>

                  {group.items.map((item) => {
                    const selected = selectedOptions[group.id];

                    const isSelected =
                      group.name === "Size"
                        ? selected?.id === item.id
                        : selected?.some((i) => i.id === item.id);

                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleOption(group.id, item)}
                        className={`flex justify-between p-2 rounded-lg cursor-pointer ${
                          isSelected ? "bg-[#038a42]/10" : "bg-gray-50"
                        }`}
                      >
                        <span>{item.name}</span>
                        <span>{item.price.toLocaleString()}đ</span>
                      </div>
                    );
                  })}
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
