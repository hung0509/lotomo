import { useEffect, useState } from "react";
import { useOrder } from "../../../hooks/useOrder";
import { initFirebaseAuth } from "../../../config/FirebaseAuth";
import {
  onChildAdded,
  onValue,
  ref,
  off,
  orderByChild,
  startAt,
  query,
} from "firebase/database";
import { useRef } from "react";
import { db } from "../../../config/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BottomNav from "../../../components/footer/BottomNav";

const filters = [
  { key: "ALL", label: "Tất cả" },
  { key: "REQUESTED", label: "Mới" },
  { key: "PREPARING", label: "Đang làm" },
  { key: "PAID", label: "Hoàn thành" },
  { key: "CANCELED", label: "Đã huỷ" },
];

const STATUS_LABEL = {
  REQUESTED: "Mới",
  PREPARING: "Đang làm",
  PAID: "Hoàn thành",
  CANCELED: "Đã huỷ",
};

const ACTIONS = {
  REQUESTED: [
    { label: "Bắt đầu làm", type: "PREPARING", className: "bg-blue-500" },
    { label: "Từ chối", type: "CANCELED", className: "bg-red-500" },
  ],
  PREPARING: [
    { label: "Hoàn thành", type: "PAID", className: "bg-[#038a42]" },
    { label: "Hủy đơn", type: "CANCELED", className: "bg-red-500" },
  ],
  PAID: [
    { label: "Xem chi tiết", type: "VIEW", className: "bg-gray-500" },
  ],
  CANCLED: [],
};

const MOCK_ORDERS = [
  // 🟢 MỚI
  {
    orderId: 1,
    code: "HD1001",
    status: "REQUESTED",
    createdAt: Date.now(),
    totalAmount: 80000,
    items: [
      {
        productId: 1,
        productName: "Cà phê sữa",
        quantity: 2,
        basePrice: 25000,
        total: 50000,
        options: "Ít đá",
      },
      {
        productId: 2,
        productName: "Trà đào",
        quantity: 1,
        basePrice: 30000,
        total: 30000,
        options: "Không đường",
      },
    ],
  },

  // 🔵 ĐANG LÀM
  {
    orderId: 3,
    code: "HD1003",
    status: "PREPARING",
    createdAt: Date.now() - 120000,
    totalAmount: 60000,
    items: [
      {
        productId: 5,
        productName: "Cà phê đen",
        quantity: 2,
        basePrice: 20000,
        total: 40000,
        options: "Không đường",
      },
      {
        productId: 6,
        productName: "Bạc xỉu",
        quantity: 1,
        basePrice: 20000,
        total: 20000,
        options: "",
      },
    ],
  },

  // ⚪ HOÀN THÀNH
  {
    orderId: 4,
    code: "HD1004",
    status: "PAID",
    createdAt: Date.now() - 180000,
    totalAmount: 70000,
    items: [
      {
        productId: 7,
        productName: "Trà chanh",
        quantity: 2,
        basePrice: 15000,
        total: 30000,
        options: "Ít đá",
      },
      {
        productId: 8,
        productName: "Bánh ngọt",
        quantity: 2,
        basePrice: 20000,
        total: 40000,
        options: "",
      },
    ],
  },

  // 🔴 ĐÃ HỦY
  {
    orderId: 5,
    code: "HD1005",
    status: "CANCLED",
    createdAt: Date.now() - 240000,
    totalAmount: 50000,
    items: [
      {
        productId: 9,
        productName: "Trà đào",
        quantity: 2,
        basePrice: 25000,
        total: 50000,
        options: "Ít ngọt",
      },
    ],
  },
];

export default function KitchenPage() {
  const startTimeRef = useRef(Date.now() - 10000);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const { fectAllOrdersForToday, updateOrder, changeStatus } = useOrder();
  const navigate = useNavigate();
  const USE_MOCK = true;
  const [filter, setFilter] = useState("ALL");

  const filteredOrders =
    filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

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
    let ordersRef = ref(db, "orders/recent");

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
      // 3. SUBSCRIBE REALTIME (chỉ lấy order mới)
      const ordersQuery = query(
        ordersRef,
        orderByChild("createdAt"),
        startAt(startTimeRef.current),
      );

      onChildAdded(ordersQuery, (snapshot) => {
        const newOrder = snapshot.val();

        // lọc lần cuối (siêu an toàn)
        if (newOrder.createdAt < startTimeRef.current) return;

        toast.success(`Có đơn hàng ${newOrder.code} mới!!`, {
          id: newOrder.orderId,
        });

        setOrders((prev) => {
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
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex overflow-x-auto no-scrollbar px-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`
                  px-4 py-3 text-sm whitespace-nowrap relative
                  ${filter === f.key ? "text-[#038a42] font-semibold" : "text-gray-400"}
                `}
              >
                {f.label}

                {/* underline */}
                {filter === f.key && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#038a42]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto">
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
            {filteredOrders.map((order) => (
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
                    {STATUS_LABEL[order.status]}
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
                  {(ACTIONS[order.status] || []).map((action) => (
                    <button
                      key={action.type}
                      onClick={async () => {
                        // 👉 VIEW: update + navigate
                        if (action.type === "VIEW") {
                          // await changeStatus({
                          //   orderId: order.orderId,
                          //   status: order.status, // hoặc "PAID" nếu muốn
                          // });

                          // update state local
                          setOrders((prev) =>
                            prev.map((o) =>
                              o.orderId === order.orderId
                                ? { ...o, status: order.status }
                                : o,
                            ),
                          );

                          localStorage.setItem(
                            "current_order",
                            JSON.stringify(order),
                          );

                          navigate("/manage/order", { state: order });
                          return;
                        }

                        // các action khác: chỉ update
                          await changeStatus({
                            orderId: order.orderId,
                            status: action.type,
                          });

                        // update state local (QUAN TRỌNG)
                        setOrders((prev) =>
                          prev.map((o) =>
                            o.orderId === order.orderId
                              ? { ...o, status: action.type }
                              : o,
                          ),
                        );
                      }}
                      className={`flex-1 text-white py-2 rounded-xl text-sm font-semibold active:scale-95 ${action.className}`}
                    >
                      {action.label}
                    </button>
                  ))}
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

      <BottomNav />
    </div>
  );
}
