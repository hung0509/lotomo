import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

const mockOrders = [
  {
    id: 1001,
    createdAt: "14/04/2026 20:15",
    items: [
      { id: 1, name: "Matcha Latte", qty: 2, total: 90000 },
      { id: 2, name: "Matcha Đá Xay", qty: 1, total: 55000 },
    ],
  },
  {
    id: 1002,
    createdAt: "14/04/2026 20:18",
    items: [
      { id: 3, name: "Matcha Kem Cheese", qty: 1, total: 60000 },
      { id: 4, name: "Matcha Truyền Thống", qty: 3, total: 120000 },
    ],
  },
];

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("orders");

    if (data) {
      setOrders(JSON.parse(data));
    } else {
      setOrders(mockOrders);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#038a42] flex justify-center">
      {/* Mobile Frame */}
      <div className="w-full max-w-[420px] bg-[#f4f6f5] min-h-screen shadow-xl">
        {/* Container mobile */}
        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white px-4 py-3 shadow">
            <h1 className="text-lg font-bold text-[#038a42]">🍵 Đơn hàng</h1>
            <p className="text-xs text-gray-500">Kitchen realtime</p>
          </div>

          {/* List */}
          <div className="p-4 space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                {/* Header card */}
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#038a42]">#{order.id}</span>

                  <span className="text-[11px] bg-[#038a42]/10 text-[#038a42] px-2 py-1 rounded-full">
                    Mới
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-3">{order.createdAt}</p>

                {/* Items */}
                <div className="space-y-2 mb-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name}{" "}
                        <span className="text-gray-400">x{item.qty}</span>
                      </span>
                      <span className="font-medium">
                        {item.total.toLocaleString()}đ
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between border-t pt-2 mb-3 text-sm font-semibold">
                  <span>Tổng</span>
                  <span className="text-[#038a42]">
                    {order.items
                      .reduce((sum, i) => sum + i.total, 0)
                      .toLocaleString()}
                    đ
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-yellow-400 text-white py-2 rounded-xl text-sm font-semibold active:scale-95">
                    Đang làm
                  </button>

                  <button className="flex-1 bg-[#038a42] text-white py-2 rounded-xl text-sm font-semibold active:scale-95">
                    Hoàn thành
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty */}
          {orders.length === 0 && (
            <div className="text-center mt-20 text-gray-400">
              Chưa có đơn hàng
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
