"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("orders");

    if (data) {
      const parsed = JSON.parse(data);

      // 👉 lấy order gần nhất
      const latestOrder = parsed[parsed.length - 1];

      if (latestOrder) {
        const arr = latestOrder.items.map((item, index) => ({
          key: index,
          id: item.product.id,
          name: item.product.name,
          price: item.price,
          qty: item.qty,
          options: item.options || [],
          total: item.total,
        }));

        setOrder(arr);
      }
    }
  }, []);

  const totalPrice = order.reduce((sum, item) => sum + item.total, 0);

  const now = new Date();
  const orderCode = "HD" + now.getTime();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-6">
      <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-lg p-4">
        {/* 🔙 Back */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-[#038a42] font-semibold"
          >
            ← Quay lại
          </button>
        </div>

        {/* 🧾 BILL */}
        <div
          id="print-area"
          className="max-w-[300px] mx-auto text-sm font-mono"
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="font-bold text-lg">Lơ tơ mơ</h2>
            <p>Hóa đơn bán hàng</p>
            <p className="text-xs">{now.toLocaleString("vi-VN")}</p>
            <p className="text-xs">Mã: {orderCode}</p>
          </div>

          <div className="border-t border-dashed my-2"></div>

          {/* List */}
          {order.map((item) => (
            <div key={item.key} className="mb-2">
              {/* Name + total */}
              <div className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.total.toLocaleString()}đ</span>
              </div>

              {/* Qty */}
              <div className="text-xs text-gray-500">
                {item.qty} x {item.price.toLocaleString()}đ
              </div>

              {/* Options */}
              {item.options.length > 0 && (
                <div className="text-xs text-gray-400 ml-2">
                  + {item.options.map((op) => op.name).join(", ")}
                </div>
              )}
            </div>
          ))}

          <div className="border-t border-dashed my-2"></div>

          {/* Total */}
          <div className="flex justify-between font-bold">
            <span>TỔNG</span>
            <span>{totalPrice.toLocaleString()}đ</span>
          </div>

          <div className="border-t border-dashed my-2"></div>

          {/* Footer */}
          <p className="text-center text-xs mt-2">Cảm ơn quý khách ❤️</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => window.print()}
            className="w-full bg-[#038a42] text-white py-3 rounded-xl font-semibold"
          >
            In hóa đơn
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("cart");
              navigate("/");
            }}
            className="w-full border py-3 rounded-xl font-semibold"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
}
