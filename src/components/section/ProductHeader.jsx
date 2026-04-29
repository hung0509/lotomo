export default function ProductHeader({ isEdit, navigate }) {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <button onClick={() => navigate("/admin")}>←</button>
      <h1 className="font-bold text-[#038a42]">
        {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
      </h1>
      <div />
    </div>
  );
}