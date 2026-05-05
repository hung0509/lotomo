import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, LayoutDashboard } from "lucide-react";

export default function SelectRolePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      
      {/* Mobile Frame */}
      <div className="w-full max-w-[420px] bg-white min-h-screen md:min-h-[700px] rounded-[30px] shadow-xl flex flex-col justify-center px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold text-gray-800">
            Lơ tơ mơ
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Chọn chế độ sử dụng
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4">

          {/* Admin */}
          <button
            onClick={() => navigate("/admin")}
            className="w-full text-left flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition active:scale-95"
          >
            <div className="w-10 h-10 bg-gray-100 text-gray-700 flex items-center justify-center rounded-lg">
              <LayoutDashboard size={18} />
            </div>

            <div>
              <h3 className="font-medium text-gray-800">
                Quản lý
              </h3>
              <p className="text-xs text-gray-400">
                Thống kê, quản lý hệ thống
              </p>
            </div>
          </button>

          {/* Kitchen */}
          <button
            onClick={() => navigate("/manage/kitchen")}
            className="w-full text-left flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition active:scale-95"
          >
            <div className="w-10 h-10 bg-gray-100 text-gray-700 flex items-center justify-center rounded-lg">
              <UtensilsCrossed size={18} />
            </div>

            <div>
              <h3 className="font-medium text-gray-800">
                Kitchen
              </h3>
              <p className="text-xs text-gray-400">
                Nhận và xử lý đơn hàng
              </p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-10">
          Chọn vai trò để tiếp tục
        </p>
      </div>
    </div>
  );
}