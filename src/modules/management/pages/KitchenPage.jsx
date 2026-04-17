import { useEffect, useState } from "react";
import { useOrder } from "../../../hooks/useOrder";
import { initFirebaseAuth } from "../../../config/FirebaseAuth";
import { onChildAdded, onValue, ref, off } from "firebase/database";
import { db } from "../../../config/FirebaseConfig";
import { useNavigate } from "react-router-dom";

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);
  const { fectAllOrdersForToday, updateOrder } = useOrder();
  const navigate = useNavigate();

  const mapOrder = (order) => ({
    ...order,
    items: (order.items || []).map((i) => ({
      productId: i.productId,
      productName: i.productName,
      quantity: i.quantity,
      price: i.basePrice,
      total: i.totalPrice,
      options: i.options || "",
    })),
  });

  useEffect(() => {
    let ordersRef;

    const init = async () => {
      // 1. LOAD DATA TỪ DB
      const datas = await fectAllOrdersForToday();
      setOrders(datas);

      // 2. LOGIN FIREBASE
      const token = localStorage.getItem("firebase_token");
      if (!token) {
        console.warn(" No firebase_token");
        return;
      }

      await initFirebaseAuth(token);

      // 3. SUBSCRIBE REALTIME
      ordersRef = ref(db, "orders/recent");

      //  listen order mới
      onChildAdded(ordersRef, (snapshot) => {
        const newOrder = snapshot.val();
        console.log("Realtime order:", newOrder);

        setOrders((prev) => {
          // chống duplicate
          const exists = prev.some((o) => o.orderId === newOrder.orderId);
          if (exists) return prev;

          return [mapOrder(newOrder), ...prev];
        });
      });

      //  debug full data
      onValue(ordersRef, (snap) => {
        console.log("📦 FULL DATA:", snap.val());
      });
    };

    init();

    //  cleanup tránh leak
    return () => {
      if (ordersRef) {
        off(ordersRef);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#038a42] flex justify-center">
      <div className="w-full bg-[#f4f6f5] min-h-screen">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white px-4 py-3 shadow">
            <h1 className="text-lg font-bold text-[#038a42]">🍵 Đơn hàng</h1>
            <p className="text-xs text-gray-500">Kitchen realtime</p>
          </div>

          {/* List */}
          <div
            className="
              p-4
              grid gap-4
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
            "
          >
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl p-4 shadow-sm flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#038a42]">
                    #{order.code}
                  </span>

                  <span className="text-[11px] px-2 py-1 rounded-full bg-[#038a42]/10 text-[#038a42]">
                    {order.status === "REQUESTED" && "Mới"}
                    {order.status === "CANCLED" && "Hủy đơn"}
                    {order.status === "PAID" && "Đã thanh toán"}
                  </span>
                </div>

                {/* Time */}
                <p className="text-xs text-gray-400 mb-3">
                  {new Date(order.createdAt).toLocaleString("vi-VN")}
                </p>

                {/* Items */}
                <div className="space-y-2 mb-3">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between text-sm"
                    >
                      <div>
                        <span>
                          {item.productName}{" "}
                          <span className="text-gray-400">
                            x{item.quantity}
                          </span>
                        </span>

                        {item.options && (
                          <div className="text-xs text-gray-400">
                            {item.options}
                          </div>
                        )}
                      </div>

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
                    {order.totalAmount.toLocaleString()}đ
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                  onClick={async () => {
                    await updateOrder({
                      orderId: order.orderId,
                      status: "CANCLED"
                    })
                  }}
                  className="flex-1 bg-red-500 text-white py-2 rounded-xl text-sm font-semibold active:scale-95">
                    Hủy đơn
                  </button>

                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "current_order",
                        JSON.stringify(order),
                      );
                      navigate("/admin/order", {state: order});
                    }}
                    className="flex-1 bg-[#038a42] text-white py-2 rounded-xl text-sm font-semibold active:scale-95"
                  >
                    Thanh toán
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
