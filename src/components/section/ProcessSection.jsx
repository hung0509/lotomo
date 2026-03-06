const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const data = [
    {
        title: "Khơi nguồn Cảm hứng & Thấu hiểu",
        description: "Chúng tôi bắt đầu bằng việc lắng nghe những mong muốn sâu kín và phong cách sống của bạn, để thấu cảm và định hình nên 'linh hồn' cho không gian tương lai."
    },
    {
        title: "Phác họa Giấc mơ & Concept",
        description: "Từ những ý tưởng sơ khởi, các kiến trúc sư tài hoa sẽ 'vẽ' nên giấc mơ của bạn bằng ngôn ngữ của hình khối và ánh sáng."
    },
    {
        title: "Tinh chỉnh Chi tiết & Kỹ thuật",
        description: "Chúng tôi chuyển hóa những ý tưởng bay bổng thành hệ thống bản vẽ kỹ thuật chính xác tuyệt đối, kết hợp cùng sự tuyển chọn khắt khe về vật liệu để đảm bảo công năng và thẩm mỹ song hành."
    },
    {
        title: "Hiện thực hóa & Trao gửi",
        description: "Đội ngũ thi công lành nghề biến bản vẽ thành công trình hiện hữu vững chãi và tinh tế. Khoảnh khắc trao tay chiếc chìa khóa là lời cam kết trọn vẹn cho một tổ ấm viên mãn."
    }
]

import { motion } from "framer-motion";

export default function ProcessSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full bg-[#0F1F1E] text-white px-6 lg:px-16 py-28"
    >
      {/* ===== HEADER ===== */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 max-w-7xl mx-auto"
      >
        <div>
          <p className="text-[#C6A47E] uppercase tracking-widest mb-4">
            QUY TRÌNH THỰC HIỆN
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            Từ Bản vẽ Sơ phác đến{" "}
            <span className="text-[#C6A47E]">Công trình Hoàn thiện</span>
          </h2>
        </div>

        <div className="text-gray-300 text-lg leading-relaxed">
          Quy trình thiết kế khép kín của chúng tôi sẽ là kim chỉ nam dẫn lối
          cho bạn: từ bước phác thảo concept, phát triển ý tưởng cho đến hiện
          thực hóa không gian sống đẳng cấp.
        </div>
      </motion.div>

      {/* ===== 4 STEPS ===== */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto"
      >
        {data.map((itemData,step) => (
          <motion.div key={step} variants={item}>
            <div className="mb-6 text-4xl text-[#C6A47E]">
              0{step}.
            </div>

            <h3 className="text-xl font-semibold mb-4">
              {itemData.title} {step}
            </h3>

            <p className="text-gray-300 leading-relaxed">
             {itemData.description} 
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}