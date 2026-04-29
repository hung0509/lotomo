import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useIngredient } from "../../../hooks/useIngredient";
import { useUnit } from "../../../hooks/useUnit";
import toast from "react-hot-toast";

const mockIngredients = [
  { id: 1, name: "Matcha" },
  { id: 2, name: "Sữa" },
  { id: 3, name: "Đường" },
];

const mockUnits = [
  { id: 1, code: "g", name: "Gram (g)" },
  { id: 2, code: "kg", name: "Kilogram (kg)" },
  { id: 3, code: "ml", name: "Milliliter (ml)" },
  { id: 4, code: "l", name: "Liter (l)" },
  { id: 5, code: "pcs", name: "Cái (pcs)" },
];

export default function IngredientList() {
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [units, setUnits] = useState([]);
  const { fetchAllIngredient, createIngredient } = useIngredient();
  const { fectAllUnits } = useUnit();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    unitId: "",
    quantity: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resIngredient = await fetchAllIngredient();
        const resUnit = await fectAllUnits();

        if (resIngredient && resIngredient.length > 0) {
          const unitMap = new Map(resUnit.map((u) => [u.id, u.name]));

          const merged = resIngredient.map((i) => ({
            ...i,
            unitName: unitMap.get(i.unitId) || "",
          }));

          setIngredients(merged);
          setUnits(resUnit);
        } else {
          setIngredients(mockIngredients);
          setUnits(mockUnits);
        }
      } catch (err) {
        console.log(err);
        setIngredients(mockIngredients);
        setUnits(mockUnits);
      }
    };

    fetchData();
  }, []);

  const filtered = ingredients.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async () => {
    const { name, unitId, quantity } = form;

    if (!name || !unitId || !quantity) {
      toast.error("Vui lòng nhập đầy đủ");
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        unitId: Number(unitId),
        quantity: Number(quantity),
      };

      const res = await createIngredient(payload);

      // fallback nếu API không trả về đầy đủ
      const unitName = units.find((u) => u.id === payload.unitId)?.name || "";

      const newItem = {
        id: res?.id ?? Date.now(),
        name: payload.name,
        unitId: payload.unitId,
        unitName,
        availableQuantity: payload.quantity,
      };

      setIngredients((prev) => [...prev, newItem]);

      // reset form
      setForm({
        name: "",
        unitId: "",
        quantity: "",
      });

      setShowModal(false);
      toast.success("Tạo nguyên liệu thành công");
    } catch (err) {
      console.error(err);
      toast.error("Tạo nguyên liệu thất bại");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-itim">
      {/* Sidebar (desktop) */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 p-4 md:p-6 flex justify-center">
        <div className="w-full ">
          {/* Card */}
          <div className="rounded-2xl p-4 md:p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-[#038a42]">
                Nguyên vật liệu
              </h1>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-[#038a42] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#027a39] transition"
              >
                + Thêm nguyên liệu
              </button>
            </div>

            {/* Search */}
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl mb-4">
              <Search size={16} className="text-gray-400" />
              <input
                placeholder="Tìm nguyên liệu..."
                className="ml-2 bg-transparent outline-none text-sm w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* List */}
            <div className="space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    navigate(`/admin/ingredient/${item.id}`, {
                      state: { ingredient: item },
                    })
                  }
                  className="p-4 bg-gray-50 rounded-xl flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    {/* <p className="text-sm text-gray-500">
                      {item.stock} {item.unit}
                    </p> */}
                  </div>

                  <span className="text-[#038a42] font-bold">Xem →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-10">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Thêm nguyên liệu</h2>

            {/* Name */}
            <input
              placeholder="Tên nguyên liệu"
              className="w-full mb-3 px-3 py-2 border rounded-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* Unit */}
            <select
              value={form.unitId}
              onChange={(e) => setForm({ ...form, unitId: e.target.value })}
            >
              <option value="">-- Chọn đơn vị --</option>
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            {/* Stock */}
            <input
              type="number"
              placeholder="Tồn kho ban đầu"
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Hủy
              </button>

              <button
                onClick={() => handleSubmit()}
                className="px-4 py-2 rounded-lg bg-[#038a42] text-white"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
