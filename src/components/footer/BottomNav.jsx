import { useNavigate, useLocation } from "react-router-dom";
import { Home, ShoppingCart, BarChart3, Settings } from "lucide-react";

export default function BottomNav({ orderCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: "/manage/pos", label: "POS", icon: <Home size={22} /> },
    {
      path: "/manage/kitchen",
      label: "Orders",
      icon: <ShoppingCart size={22} />,
    },
    // { path: "/reports", label: "Reports", icon: <BarChart3 size={22} /> },
    { path: "/settings", label: "Settings", icon: <Settings size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px]">
      {/* CONTAINER */}
      <div
        className="
        relative
        bg-gradient-to-r from-[#027a3a] to-[#038a42]
        rounded-t-2xl
        shadow-[0_-10px_40px_rgba(0,0,0,0.2)]
        backdrop-blur-md
      "
      >
        <div className="flex justify-between items-center h-16 px-2">
          {tabs.map((tab) => {
            const active = location.pathname === tab.path;

            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex-1 flex flex-col items-center justify-center relative py-2 active:scale-90 transition-all duration-150"
              >
                {/* ACTIVE BACKGROUND (nổi lên như nút vật lý) */}
                {active && (
                  <div
                    className="
                        absolute bottom-0
                        w-8 h-[3px]
                        bg-white
                        rounded-full
                    "
                  />
                )}

                {/* ICON */}
                <div
                  className={`
                    z-10 transition-all duration-200
                    ${active ? "text-[#038a42] scale-110" : "text-white/70"}
                  `}
                >
                  {tab.icon}
                </div>

                {/* LABEL */}
                <span
                  className={`
                    text-[11px] mt-1 z-10
                    ${active ? "text-white font-semibold" : "text-white/60"}
                  `}
                >
                  {tab.label}
                </span>

                {/* BADGE (Orders) */}
                {tab.path === "/kitchen" && orderCount > 0 && (
                  <span
                    className="
                    absolute top-1 right-5
                    bg-red-500 text-white
                    text-[10px] px-1.5 py-[1px]
                    rounded-full shadow
                  "
                  >
                    {orderCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* FLOAT BUTTON (center POS action) */}
        {/* <div className="absolute left-1/2 -translate-x-1/2 -top-7">
          <button
            onClick={() => navigate("/admin/pos")}
            className="
              w-16 h-16
              rounded-full
              bg-white
              text-[#038a42]
              shadow-2xl
              flex items-center justify-center
              text-2xl font-bold
              border-4 border-[#038a42]
              active:scale-90 transition
            "
          >
            ⚡
          </button>
        </div> */}
      </div>
    </div>
  );
}
