export default function ProductBasicForm({ form, onChange, categories }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className='text-[#038a42] font-bold'>Thông tin cơ bản</div>

      <input
        value={form.name}
        onChange={(e) => onChange("name", e.target.value)}
        placeholder="Tên sản phẩm"
        className="border p-3 rounded-xl"
      />

      <input
        type="number"
        value={form.price}
        onChange={(e) => onChange("price", e.target.value)}
        placeholder="Giá"
        className="border p-3 rounded-xl"
      />

      <input
        value={form.image}
        onChange={(e) => onChange("image", e.target.value)}
        placeholder="Link ảnh"
        className="border p-3 rounded-xl md:col-span-2"
      />

      {form.image && (
        <img src={form.image} className="w-full h-48 object-cover rounded-xl md:col-span-2" />
      )}

      <select
        value={form.categoryId}
        onChange={(e) => onChange("categoryId", e.target.value)}
        className="border p-3 rounded-xl"
      >
        <option value="">-- Chọn danh mục --</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select
        value={form.status}
        onChange={(e) => onChange("status", e.target.value)}
        className="border p-3 rounded-xl"
      >
        <option value="ACTIVE">Đang bán</option>
        <option value="INACTIVE">Ngừng bán</option>
      </select>
    </div>
  );
}