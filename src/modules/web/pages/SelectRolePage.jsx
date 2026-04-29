import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, LayoutDashboard } from "lucide-react";

export default function SelectRolePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#038a42] flex justify-center items-center">
      {/* 📱 Mobile Frame */}
      <div className="w-full max-w-[420px] bg-white min-h-screen rounded-[30px] shadow-2xl overflow-hidden flex flex-col justify-center px-6">

        {/* Logo / Title */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#038a42]">
            🍵 Lơ tơ mơ
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Chọn chế độ sử dụng
          </p>
        </div>

        {/* Options */}
        <div className="space-y-5">

          {/* Admin */}
          <div
            onClick={() => navigate("/admin")}
            className="cursor-pointer bg-[#038a42]/10 p-5 rounded-2xl flex items-center gap-4 hover:bg-[#038a42]/20 transition active:scale-95"
          >
            <div className="w-12 h-12 bg-[#038a42] text-white flex items-center justify-center rounded-xl">
              <LayoutDashboard />
            </div>

            <div>
              <h3 className="font-semibold text-[#038a42]">
                Quản lý
              </h3>
              <p className="text-xs text-gray-500">
                Thống kê, quản lý đơn hàng
              </p>
            </div>
          </div>

          {/* Kitchen */}
          <div
            onClick={() => navigate("/manage/kitchen")}
            className="cursor-pointer bg-yellow-100 p-5 rounded-2xl flex items-center gap-4 hover:bg-yellow-200 transition active:scale-95"
          >
            <div className="w-12 h-12 bg-yellow-400 text-white flex items-center justify-center rounded-xl">
              <UtensilsCrossed />
            </div>

            <div>
              <h3 className="font-semibold text-yellow-600">
                Kitchen
              </h3>
              <p className="text-xs text-gray-500">
                Nhận và xử lý đơn hàng
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-10">
          Chọn vai trò để tiếp tục
        </p>
      </div>
    </div>
  );
}