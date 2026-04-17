"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { useOrder } from "../../../hooks/useOrder";

export default function ReviewOrder() {
  const [cart, setCart] = useState({});
  const { createOrder } = useOrder();
  const navigate = useNavigate();

  // Load cart
  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  // Xóa món
  const removeItem = (key) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[key];

      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  // Tăng giảm số lượng
  const updateQty = (key, type) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (!updated[key]) return prev;

      const item = updated[key];

      if (type === "inc") {
        item.qty += 1;
      } else {
        if (item.qty <= 1) {
          delete updated[key];
        } else {
          item.qty -= 1;
        }
      }

      // 👉 cập nhật lại total (KHÔNG đụng price)
      if (updated[key]) {
        item.total = item.price * item.qty;
      }

      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const cartItems = Object.entries(cart);

  // Tổng tiền chuẩn
  const totalPrice = cartItems.reduce((sum, [, item]) => sum + item.total, 0);

  const handleConfirm = async () => {
    try {
      const orderRequest = transformOrder(cart);

      console.log("Request gửi BE:", orderRequest);

      await createOrder(orderRequest);

      localStorage.removeItem("cart");
      setCart({}); 
    } catch (err) {
      console.error("Lỗi tạo order:", err);
    }
  };

  const transformOrder = (cart) => {
    const items = Object.values(cart);

    const orderItems = items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      basePrice: item.price,
      quantity: item.qty,
      totalPrice: item.total,

      options: (item.options || []).map((opt) => ({
        optionItemId: opt.id,
        optionItemName: opt.name,
        price: opt.price,
      })),
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );

    return {
      orderItems,
      totalAmount,
    };
  };

  return (
    <div className="min-h-screen bg-[#038a42] flex justify-center py-6">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-[#038a42] font-semibold"
          >
            ← Quay lại
          </button>

          <h1 className="font-bold text-[#038a42]">Xác nhận đơn</h1>
        </div>

        {/* List */}
        <div className="space-y-4">
          {cartItems.map(([key, item]) => (
            <div key={key} className="border-b pb-3">
              {/* Name + price */}
              <div className="flex justify-between items-center">
                <span className="font-semibold">{item.product.name}</span>

                <span className="text-[#038a42] font-bold">
                  {item.price.toLocaleString()}đ
                </span>
              </div>

              {/* ✅ OPTIONS */}
              {item.options?.length > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  + {item.options.map((o) => o.name).join(", ")}
                </div>
              )}

              {/* Qty + actions */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(key, "dec")}
                    className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="font-semibold">{item.qty}</span>

                  <button
                    onClick={() => updateQty(key, "inc")}
                    className="w-7 h-7 bg-[#038a42] text-white rounded-full flex items-center justify-center"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(key)}
                  className="text-red-500 text-xs"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-4 border-t pt-3 flex justify-between">
          <span className="font-semibold">Tổng</span>
          <span className="font-bold text-[#038a42]">
            {totalPrice.toLocaleString()}đ
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#038a42] text-white py-3 rounded-xl font-semibold"
          >
            Xác nhận gọi món
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full border border-[#038a42] text-[#038a42] py-3 rounded-xl"
          >
            Quay lại chọn
          </button>
        </div>
      </div>
    </div>
  );
}
