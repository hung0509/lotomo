"use client";
import { useEffect, useState } from "react";
import { Plus, ChevronDown, ChevronUp, X } from "lucide-react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useOptionGroup } from "../../../hooks/useOptionGroup";
import toast from "react-hot-toast";
import { useOptionItem } from "../../../hooks/useOptionItem";

export default function OptionManagement() {
  const [groups, setGroups] = useState([]);
  const [expanded, setExpanded] = useState({});
  const { loading, fetchAll, create } = useOptionGroup();
  const { createItem, updateItem } = useOptionItem();

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAll();
      console.log("DATA:", res);

      setGroups(res);
    };

    fetchData();
  }, []);

  const [newGroup, setNewGroup] = useState({
    name: "",
    type: "SINGLE",
  });

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
  });

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleItemStatus = async (groupId, item) => {
    const res = await updateItem({
        id: item.id,
        isActive: item.status === "ACTIVE" ? "1" : "0"
    });


    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              items: g.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      status: i.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
                    }
                  : i,
              ),
            }
          : g,
      ),
    );
  };

  const handleAddGroup = async () => {
    if (!newGroup.name) return;

    try {
      const res = await create({
        name: newGroup.name,
        type: newGroup.type,
      });

      toast.success("Tạo thành công");

      setGroups((prev) => [...prev, newGroup]);

      setShowGroupModal(false);
      setNewGroup({ name: "", type: "SINGLE" });
    } catch (err) {
      toast.error(err.message || "Tạo thất bại");
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name) return;

    const res = await createItem({
        name: newItem.name,
        price: newItem.price,
        optionGroupId: selectedGroupId
    });

    toast.success("Tạo thành công");

    setGroups((prev) =>
      prev.map((g) =>
        g.id === selectedGroupId
          ? {
              ...g,
              items: [
                ...g.items,
                {
                  id: res.id,
                  name: res.name,
                  price: Number(res.price || 0),
                  status: res.status,
                },
              ],
            }
          : g,
      ),
    );

    setShowItemModal(false);
    setNewItem({ name: "", price: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-itim">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-4 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-[#038a42]">
            Quản lý thuộc tính
          </h1>

          <button
            onClick={() => setShowGroupModal(true)}
            className="bg-[#038a42] text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus size={16} />
            Thêm nhóm
          </button>
        </div>

        {/* Groups */}
        <div className="space-y-3">
          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-xl shadow">
              {/* Group header */}
              <div
                onClick={() => toggleExpand(group.id)}
                className="p-4 flex justify-between items-center cursor-pointer"
              >
                <div>
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-xs text-gray-500">
                    {group.type === "SINGLE" ? "Chọn 1" : "Chọn nhiều"}
                  </p>
                </div>

                {expanded[group.id] ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* Items */}
              {expanded[group.id] && (
                <div className="border-t p-3 space-y-2">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
                    >
                      <div>
                        <span className="text-sm font-medium">{item.name}</span>
                        <p className="text-xs text-[#038a42]">
                          +{item.price.toLocaleString()}đ
                        </p>
                      </div>

                      <button
                        onClick={() => toggleItemStatus(group.id, item)}
                        className={`text-xs px-2 py-1 rounded ${
                          item.status === "ACTIVE"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {item.status === "ACTIVE" ? "Đang dùng" : "Tắt"}
                      </button>
                    </div>
                  ))}

                  {/* 👉 ADD ITEM */}
                  <button
                    onClick={() => {
                      setSelectedGroupId(group.id);
                      setShowItemModal(true);
                    }}
                    className="w-full mt-2 border border-dashed py-2 rounded-lg text-sm text-gray-500"
                  >
                    + Thêm lựa chọn
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setShowGroupModal(true)}
          className="fixed bottom-4 right-4 md:hidden w-14 h-14 bg-[#038a42] text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus />
        </button>
      </div>

      {/* ========================= */}
      {/* 👉 MODAL ADD GROUP */}
      {/* ========================= */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-sm p-4 rounded-xl">
            <div className="flex justify-between mb-3">
              <h2 className="font-bold">Thêm nhóm</h2>
              <X onClick={() => setShowGroupModal(false)} />
            </div>

            <input
              placeholder="Tên nhóm"
              className="w-full border p-2 rounded mb-3"
              value={newGroup.name}
              onChange={(e) =>
                setNewGroup({ ...newGroup, name: e.target.value })
              }
            />

            <select
              className="w-full border p-2 rounded mb-3"
              value={newGroup.type}
              onChange={(e) =>
                setNewGroup({ ...newGroup, type: e.target.value })
              }
            >
              <option value="SINGLE">Chọn 1</option>
              <option value="MULTIPLE">Chọn nhiều</option>
            </select>

            <button
              onClick={handleAddGroup}
              className="w-full bg-[#038a42] text-white py-2 rounded"
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* 👉 MODAL ADD ITEM */}
      {/* ========================= */}
      {showItemModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-sm p-4 rounded-xl">
            <div className="flex justify-between mb-3">
              <h2 className="font-bold">Thêm lựa chọn</h2>
              <X onClick={() => setShowItemModal(false)} />
            </div>

            <input
              placeholder="Tên"
              className="w-full border p-2 rounded mb-3"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />

            <input
              type="number"
              placeholder="Giá thêm"
              className="w-full border p-2 rounded mb-3"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />

            <button
              onClick={handleAddItem}
              className="w-full bg-[#038a42] text-white py-2 rounded"
            >
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
