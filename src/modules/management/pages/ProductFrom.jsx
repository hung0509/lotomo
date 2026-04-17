"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useProduct } from "../../../hooks/useProduct";
import { useOptionGroup } from "../../../hooks/useOptionGroup";

// const mockData = [
//   {
//     id: 1,
//     name: "Size",
//     items: [
//       { id: 1, name: "M", price: 0 },
//       { id: 2, name: "L", price: 5000 },
//     ],
//   },
//   {
//     id: 2,
//     name: "Topping",
//     items: [
//       { id: 3, name: "Trân châu", price: 5000 },
//       { id: 4, name: "Kem cheese", price: 7000 },
//     ],
//   },
// ];

const mockCategories = [
  { id: 1000000, name: "Matcha" }
];

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [groups, setGroups] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { createProduct, updateProduct, findById } = useProduct();
  const { fetchAll} = useOptionGroup();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    categoryId: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    // setGroups(mockData);
    setCategories(mockCategories);

    if (isEdit) {
      const fetchData = async () => {
        const res = await findById(id);
        console.log("DATA:", res);

        setSelectedItems(res.selectedItems);
        setGroups(res.options);
        setForm({
          name: res.name || "",
          price: res.price || "",
          image: res.image || "",
          categoryId: res.categoryId || "",
          status: res.status,
        });
      };

      fetchData();
    }else{
      const fetchData = async () => {
      const res = await fetchAll();
      console.log("DATA:", res);

      setGroups(res);
    };

    fetchData();
    }
  }, [id]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleSubmit = async () => {
    const payload = {
      id: id,
      name: form.name,
      basePrice: form.price,
      imageUrl: form.image,
      categoryId: form.categoryId,
      optionsItems: selectedItems, // hoặc convert nếu BE cần object
    };

    if (isEdit) {
      await updateProduct(payload);
    } else {
      await createProduct(payload);
    }

    console.log(isEdit ? "UPDATE" : "CREATE", payload);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* 👉 Sidebar chỉ hiện desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* 👉 Content */}
      <div className="flex-1 flex justify-center md:justify-start p-4 md:p-6">
        <div className="w-full  bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* HEADER */}
          <div className="p-4 border-b flex justify-between items-center">
            <button onClick={() => navigate(-1)}>←</button>
            <h1 className="font-bold text-[#038a42]">
              {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
            </h1>
            <div />
          </div>

          <div className="p-4 md:p-6 space-y-6">
            {/* 👉 FORM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Tên sản phẩm"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border p-3 rounded-xl"
              />

              <input
                type="number"
                placeholder="Giá"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="border p-3 rounded-xl"
              />

              <input
                placeholder="Link ảnh"
                value={form.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className="border p-3 rounded-xl md:col-span-2"
              />

              {form.image && (
                <img
                  src={form.image}
                  className="w-full h-48 object-cover rounded-xl md:col-span-2"
                />
              )}

              <select
                value={form.categoryId}
                onChange={(e) => handleChange("categoryId", e.target.value)}
                className="border p-3 rounded-xl"
              >
                <option value="">-- Chọn danh mục --</option>

                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="border p-3 rounded-xl"
              >
                <option value="ACTIVE">Đang bán</option>
                <option value="INACTIVE">Ngừng bán</option>
              </select>
            </div>

            {/* 👉 OPTION CONFIG */}
            <div>
              <h2 className="font-bold text-[#038a42] mb-3">
                Cấu hình thuộc tính
              </h2>

              <div className="space-y-3">
                {groups.map((group) => (
                  <div key={group.id} className="bg-gray-50 rounded-xl">
                    {/* Header */}
                    <div
                      onClick={() => toggleExpand(group.id)}
                      className="p-3 flex justify-between items-center cursor-pointer"
                    >
                      <span className="font-semibold">{group.name}</span>
                      {expanded[group.id] ? <ChevronUp /> : <ChevronDown />}
                    </div>

                    {/* Items */}
                    {expanded[group.id] && (
                      <div className="border-t p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {group.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center bg-white p-2 rounded-lg"
                          >
                            <div>
                              <span className="text-sm">{item.name}</span>
                              <p className="text-xs text-[#038a42]">
                                +{item.price.toLocaleString()}đ
                              </p>
                            </div>

                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => toggleItem(item.id)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SUBMIT */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#038a42] text-white py-3 rounded-xl font-semibold"
            >
              {isEdit ? "Cập nhật" : "Tạo sản phẩm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
