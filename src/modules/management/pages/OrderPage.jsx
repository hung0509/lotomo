"use client";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useOrder } from "../../../hooks/useOrder";
import toast from "react-hot-toast";

const MOCK_ORDER = {
  orderId: 999999,
  items: [
    {
      productId: 1,
      productName: "Cà phê sữa",
      price: 25000,
      quantity: 2,
      total: 50000,
      options: "Ít đá, thêm sữa",
    },
    {
      productId: 2,
      productName: "Trà đào",
      price: 30000,
      quantity: 1,
      total: 30000,
      options: "Không đường",
    },
    {
      productId: 3,
      productName: "Bánh mì",
      price: 20000,
      quantity: 1,
      total: 20000,
      options: "",
    },
  ],
};

export default function OrderPage() {
  const { updateOrder } = useOrder();
  const navigate = useNavigate();
  const location = useLocation();

  // aw data từ page trước
  const orderData = useMemo(() => {
    const data =
      location.state || JSON.parse(localStorage.getItem("current_order"));

      console.log(data);

    //  fallback mock
    return data || MOCK_ORDER;
  }, []);
  //  data để render UI
  const items = useMemo(() => {
    if (!orderData) return [];

    return (orderData.items || []).map((item, index) => ({
      key: index,
      id: item.productId,
      name: item.productName,
      price: item.price,
      qty: item.quantity,
      total: item.total,
      options: item.options
        ? item.options.split(",").map((op) => ({ name: op.trim() }))
        : [],
    }));
  }, [orderData]);

  // tính tổng
  const totalPrice = items.reduce((sum, item) => sum + item.total, 0);

  const now = new Date();
  const orderCode = "HD" + now.getTime();

  // chống trắng UI
  if (!orderData) {
    return (
      <div className="p-10 text-center text-red-500">
        Không có dữ liệu đơn hàng
      </div>
    );
  }

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
          {items.map((item) => (
            <div key={item.key} className="mb-2">
              <div className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.total.toLocaleString()}đ</span>
              </div>

              <div className="text-xs text-gray-500">
                {item.qty} x {item.price.toLocaleString()}đ
              </div>

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

          <p className="text-center text-xs mt-2">Cảm ơn quý khách ❤️</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={async () => {
              await updateOrder({
                orderId: orderData.orderId,
                status: "PAID",
              });
              window.print();
            }}
            className="w-full bg-[#038a42] text-white py-3 rounded-xl font-semibold"
          >
            In hóa đơn
          </button>

          <button
            onClick={async () => {
              await updateOrder({
                orderId: orderData.orderId,
                status: "PAID",
              });
              toast.success("Đơn đã thanh toán thành công");
              localStorage.removeItem("current_order");
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
