import { useEffect, useState } from "react";
import { Plus, Pencil, Ban } from "lucide-react";
import toast from "react-hot-toast";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useShift } from "../../../hooks/useShift";

const mockShift = [
  {
    id: 1,
    name: "Ca sáng",
    startTime: "08:00",
    endTime: "12:00",
    maxSlot: 3,
    isActive: "Y",
  },
  {
    id: 2,
    name: "Ca chiều",
    startTime: "13:00",
    endTime: "18:00",
    maxSlot: 2,
    isActive: "N",
  },
];

export default function ShiftManagementPage() {
  const [date, setDate] = useState("2026-04-20");
  const [shifts, setShifts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    startTime: "",
    endTime: "",
    maxSlot: "",
  });
  const {fectAllShifts, createShift, updateShift } = useShift()

  useEffect(() => {
      const fetchData = async () => {
        const res = await fectAllShifts();
        console.log("DATA:", res);
  
        setShifts(res);
      };
  
      fetchData();
    }, []);

  const handleToggleShift = (shiftId) => {
    let newStatus = null;

    const updated = shifts.map((s) => {
      if (s.id === shiftId) {
        newStatus = s.isActive === "Y" ? "N" : "Y";
        return { ...s, isActive: newStatus };
      }
      return s;
    });

    setShifts(updated);

    // 👉 toast đặt ngoài setState
    if (newStatus === "Y") {
      toast.success("Đã bật hoạt động ca");
    } else {
      toast.error("Đã ngưng hoạt động ca");
    }
  };

  const handleSubmit = async () => {
    console.log(form);

    await createShift(form);

    setShifts([...shifts, form]);
    toast.success("Tạo ca thành công");
    setOpenModal(false);
    setForm({
    id: "",
    name: "",
    startTime: "",
    endTime: "",
    maxSlot: "",
  })
  };

  return (
    <div className="min-h-screen bg-[#f4f6f5] flex justify-center py-6">
      <Sidebar />
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-lg font-bold text-[#038a42]">Quản lý ca</h1>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#038a42] text-white p-2 rounded-xl"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* List */}
        <div className="p-4 space-y-3">
          {shifts.map((shift) => {
            return (
              <div
                key={shift.id}
                className="bg-gray-50 p-3 rounded-xl flex justify-between items-center"
              >
                {/* Info */}
                <div>
                  <div className="font-semibold">{shift.name}</div>
                  <div className="text-sm text-gray-500">
                    {shift.startTime} - {shift.endTime}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    className="p-2 bg-yellow-100 rounded-lg"
                    onClick={() => toast("Edit sau")}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleToggleShift(shift.id)}
                    className={`p-2 rounded-full ${
                      shift.isActive === "Y"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <Ban size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Create */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="bg-white w-[350px] rounded-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold mb-3">Tạo ca</h2>

            {/* Name */}
            <input
              type="text"
              placeholder="Tên ca"
              className="w-full border p-2 mb-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* Start Time */}
            <input
              type="time"
              className="w-full border p-2 mb-2 rounded"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />

            {/* End Time */}
            <input
              type="time"
              className="w-full border p-2 mb-2 rounded"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            />

            {/* Max Slot */}
            <input
              type="number"
              placeholder="Số lượng tối đa"
              className="w-full border p-2 mb-3 rounded"
              value={form.maxSlot}
              onChange={(e) => setForm({ ...form, maxSlot: e.target.value })}
            />

            {/* Submit */}
            <button
              onClick={() => handleSubmit()}
              className="w-full bg-[#038a42] text-white py-2 rounded-lg"
            >
              Tạo ca
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
