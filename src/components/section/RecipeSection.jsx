import { useEffect } from "react";

export default function RecipeModal({
  item,
  recipes,
  setRecipes,
  ingredients,
  onClose,
}) {
  // 👉 thêm nguyên liệu
  const addIngredient = () => {
    setRecipes((prev) => ({
      ...prev,
      [item.id]: [
        ...(prev[item.id] || []),
        { ingredientId: "", quantity: "" },
      ],
    }));
  };

  // 👉 update
  const updateIngredient = (index, key, value) => {
    setRecipes((prev) => {
      const list = [...(prev[item.id] || [])];
      list[index][key] = value;
      return { ...prev, [item.id]: list };
    });
  };

  // 👉 xoá
  const removeIngredient = (index) => {
    setRecipes((prev) => {
      const list = [...(prev[item.id] || [])];
      list.splice(index, 1);
      return { ...prev, [item.id]: list };
    });
  };

  // 👉 auto add 1 dòng khi mở lần đầu
  useEffect(() => {
    if (!recipes[item.id]) {
      addIngredient();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl p-4">
        <h2 className="font-bold mb-3">
          Công thức: {item.name}
        </h2>

        {/* LIST */}
        <div className="space-y-2 max-h-[300px] overflow-auto">
          {(recipes[item.id] || []).map((r, index) => {
            const ing = ingredients.find(i => i.id == r.ingredientId);

            return (
              <div key={index} className="flex gap-2 items-center">
                <select
                  value={r.ingredientId}
                  onChange={(e) =>
                    updateIngredient(index, "ingredientId", e.target.value)
                  }
                  className="border p-1 rounded flex-1"
                >
                  <option value="">Nguyên liệu</option>
                  {ingredients.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="SL"
                  value={r.quantity}
                  onChange={(e) =>
                    updateIngredient(index, "quantity", e.target.value)
                  }
                  className="border p-1 rounded w-20"
                />

                <span className="text-xs w-6 text-gray-500">
                  {ing?.unit || ""}
                </span>

                <button
                  onClick={() => removeIngredient(index)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        {/* ACTION */}
        <div className="mt-3 flex justify-between">
          <button
            onClick={addIngredient}
            className="text-[#038a42]"
          >
            + Thêm
          </button>

          <button
            onClick={onClose}
            className="bg-[#038a42] text-white px-3 py-1 rounded"
          >
            Xong
          </button>
        </div>
      </div>
    </div>
  );
}