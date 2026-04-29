import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useuseIngredientStock } from "../../../hooks/useIngredientStock";

/* ================= MOCK DATA ================= */
// const mock = {
//   id: 1,
//   name: "Matcha",
//   unit: "g",
//   description: "Nguyên liệu pha trà matcha",
// };

// const mockHistory = [
//   {
//     id: 1,
//     type: "IMPORT",
//     quantity: 100,
//     note: "Nhập hàng đợt 1",
//     createdAt: "2025-05-01 10:00",
//   },
//   {
//     id: 2,
//     type: "EXPORT",
//     quantity: 20,
//     note: "Bán hàng",
//     createdAt: "2025-05-02 14:20",
//   },
// ];

/* ================= COMPONENT ================= */
export default function IngredientDetail() {
  const { id } = useParams();
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  // const [form, setForm] = useState(mock);
  const { state } = useLocation();
  const [form, setForm] = useState(state?.ingredient || null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("INFO");
  const [stockInput, setStockInput] = useState("");
  const [note, setNote] = useState("");
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const {fetchAll, updateStock} = useuseIngredientStock();

  /* ====== FORM ====== */
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("SAVE:", form, history);
    navigate(-1);
  };

  /* ====== KHO ====== */
  const handleImport = async () => {
  if (!stockInput) return;

  const qty = Number(stockInput);

  try {
    await updateStock({
      ingredientId: Number(id),
      availableQuantity: qty
    });

    // ✅ 1. Update history (thêm record mới lên đầu)
    const newRecord = {
      id: Date.now(),
      type: "IMPORT",
      quantity: qty,
      note,
      createdAt: new Date().toLocaleString(),
    };

    setHistory((prev) => [newRecord, ...prev]);

    // ✅ 2. Update tồn kho
    setForm((prev) => ({
      ...prev,
      availableQuantity: (prev?.availableQuantity || 0) + qty,
    }));

    // reset input
    setStockInput("");
    setNote("");
  } catch (e) {
    console.log(e);
  }
};

  useEffect(() => {
    if (activeTab === "STOCK") {
      fetchStock();
    }
  }, [activeTab, fromDate, toDate]);

  const filteredHistory = history.filter((h) => {
    const date = new Date(h.createdAt);

    if (fromDate && date < new Date(fromDate)) return false;
    if (toDate && date > new Date(toDate + " 23:59:59")) return false;

    return true;
  });

  const fetchStock = async () => {
    try {
      const res = await fetchAll({
        ingredientId: id,
        fromDate: `${fromDate} 00:00:00`,
        toDate: `${toDate} 23:59:59`,
      });

      // map transaction
      const mappedHistory = (res.transactions || []).map((t) => {
        const qty = t.changeAvailable ?? 0;

        return {
          id: t.transactionId,
          type: qty >= 0 ? "IMPORT" : "EXPORT",
          quantity: Math.abs(qty),
          note: t.status, // hoặc referenceId nếu muốn
          createdAt: t.createAt,
        };
      });

      setHistory(mappedHistory);

      //  set stock
      setForm((prev) => ({
        ...prev,
        availableQuantity: res.availableQuantity,
        reservedQuantity: res.reservedQuantity,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-3 md:p-6 font-itim">
      <div className="w-full max-w-[1100px]">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)}>←</button>
          <h1 className="font-bold text-[#038a42] text-lg md:text-xl">
            Chi tiết nguyên liệu
          </h1>
          <div />
        </div>

        {/* ===== LAYOUT DESKTOP ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* ===== SIDEBAR TAB (DESKTOP) ===== */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-2xl shadow p-3 space-y-2">
              <button
                onClick={() => setActiveTab("INFO")}
                className={`w-full text-left px-4 py-2 rounded-xl ${
                  activeTab === "INFO"
                    ? "bg-[#038a42] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                Thông tin
              </button>

              <button
                onClick={() => setActiveTab("STOCK")}
                className={`w-full text-left px-4 py-2 rounded-xl ${
                  activeTab === "STOCK"
                    ? "bg-[#038a42] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                Kho
              </button>
            </div>
          </div>

          {/* ===== CONTENT ===== */}
          <div className="lg:col-span-9 space-y-4">
            {/* ===== TAB MOBILE ===== */}
            <div className="flex lg:hidden bg-white rounded-xl p-1 shadow">
              <button
                onClick={() => setActiveTab("INFO")}
                className={`flex-1 py-2 rounded-xl text-sm ${
                  activeTab === "INFO"
                    ? "bg-[#038a42] text-white"
                    : "text-gray-500"
                }`}
              >
                Thông tin
              </button>

              <button
                onClick={() => setActiveTab("STOCK")}
                className={`flex-1 py-2 rounded-xl text-sm ${
                  activeTab === "STOCK"
                    ? "bg-[#038a42] text-white"
                    : "text-gray-500"
                }`}
              >
                Kho
              </button>
            </div>

            {/* ===== TAB INFO ===== */}
            {activeTab === "INFO" && (
              <div className="bg-white p-5 rounded-2xl shadow space-y-4">
                <h2 className="font-semibold text-[#038a42]">
                  Thông tin cơ bản
                </h2>

                <input
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Tên nguyên liệu"
                  className="w-full border p-3 rounded-xl"
                />

                <textarea
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Mô tả"
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  value={form.unitName}
                  onChange={(e) => handleChange("unitName", e.target.value)}
                  placeholder="Đơn vị"
                  className="w-32 border p-3 rounded-xl"
                />
              </div>
            )}

            {/* ===== TAB STOCK ===== */}
            {activeTab === "STOCK" && (
              <div className="bg-white p-5 rounded-2xl shadow space-y-5">
                {/* STOCK CARD */}
                <div className="bg-[#038a42]/10 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Tồn kho hiện tại</p>
                    <p className="text-2xl font-bold text-[#038a42]">
                      {form.availableQuantity ?? 0} {form.unitName}
                    </p>
                  </div>

                  {form.availableQuantity < 100 && (
                    <div className="text-red-500 text-sm font-medium">
                      ⚠ Sắp hết
                    </div>
                  )}
                </div>
                {/* INPUT */}
                <div className="grid md:grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={stockInput}
                    onChange={(e) => setStockInput(e.target.value)}
                    placeholder="Số lượng"
                    className="border p-3 rounded-xl"
                  />

                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ghi chú"
                    className="border p-3 rounded-xl"
                  />
                </div>
                {/* BUTTON */}
                <button
                  onClick={handleImport}
                  className="w-full bg-[#038a42] text-white py-3 rounded-xl font-semibold hover:opacity-90"
                >
                  + Nhập kho
                </button>
                {/* HISTORY */}
                <div>
                  <p className="font-medium mb-3">Lịch sử kho</p>
                  <div className="bg-gray-50 p-3 rounded-xl mb-3">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Lọc theo ngày
                    </p>

                    <div className="flex gap-2 items-center">
                      <div className="flex-1">
                        <label className="text-xs text-gray-400">Từ ngày</label>
                        <input
                          type="date"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          className="w-full border p-2 rounded-lg text-sm focus:ring-2 focus:ring-[#038a42]"
                        />
                      </div>

                      <span className="text-gray-400 mt-5">→</span>

                      <div className="flex-1">
                        <label className="text-xs text-gray-400">
                          Đến ngày
                        </label>
                        <input
                          type="date"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          className="w-full border p-2 rounded-lg text-sm focus:ring-2 focus:ring-[#038a42]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="max-h-[320px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                    {history.map((h) => (
                      <div
                        key={h.id}
                        className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl"
                      >
                        <div
                          className={`w-3 h-3 mt-2 rounded-full ${
                            h.type === "IMPORT" ? "bg-green-500" : "bg-red-500"
                          }`}
                        />

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">
                              {h.type === "IMPORT" ? "Nhập kho" : "Xuất kho"}
                            </p>

                            <span
                              className={`text-sm font-semibold ${
                                h.type === "IMPORT"
                                  ? "text-green-600"
                                  : "text-red-500"
                              }`}
                            >
                              {h.type === "IMPORT" ? "+" : "-"}
                              {h.quantity} {form.unitName}
                            </span>
                          </div>

                          <p className="text-xs text-gray-500">{h.note}</p>

                          <p className="text-xs text-gray-400">{h.createdAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SAVE */}
            {activeTab === "INFO" && (
              <button
                onClick={handleSave}
                className="w-full bg-[#038a42] text-white py-3 rounded-xl font-semibold"
              >
                Lưu thay đổi
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
