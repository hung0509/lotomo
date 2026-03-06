import { motion } from "framer-motion";

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
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // easeOutExpo kiểu cao cấp
    },
  },
};

const data = [
  "https://bizweb.dktcdn.net/thumb/large/100/613/180/products/ezgif-68691e0abddb40ec.jpg?v=1763626852633",
  "https://bizweb.dktcdn.net/thumb/large/100/613/180/products/ezgif-59e8e5eba7439912.jpg?v=1763627115037",
  "https://bizweb.dktcdn.net/thumb/large/100/613/180/products/ezgif-55f47bd46b871930.jpg?v=1763627076023",
];

export default function OutstandingSection() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        {/* ===== HEADER ===== */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Left */}
          <motion.div variants={item}>
            <p className="text-sm tracking-widest text-[#C6A47E] uppercase mb-4">
              Dự án nổi bật
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
             Dấu ấn Sáng tạo -<span className="text-[#C6A47E]"> Tuyên ngôn Phong cách</span>
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div
            variants={item}
            className="text-gray-600 text-lg leading-relaxed mt-10"
          >
           Khám phá bộ sưu tập đa sắc màu của chúng tôi: nơi hội tụ từ những tổ ấm bình yên được chạm khắc tinh tế,
            đến những không gian thương mại đẳng cấp, nơi công năng và nghệ thuật giao hòa tuyệt đối.
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16"
        >
          {data.map((itemData, index) => (
            <motion.div
              className="relative overflow-hidden cursor-pointer group"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* IMAGE */}
              <motion.img
                src={itemData}
                alt="Nhà hiện đại"
                className="w-full h-[320px] object-cover"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.05 },
                }}
                transition={{ duration: 0.6 }}
              />

              {/* OVERLAY CONTAINER */}
              <div
                className="absolute bottom-0 left-0 w-full p-6 
                      bg-gradient-to-t from-black/80 via-black/50 to-transparent"
              >
                {/* TITLE - luôn hiển thị */}
                <h3 className="text-white text-2xl font-bold">
                  Nhà Hiện Đại 1 Tầng Tại Đà Nẵng
                </h3>

                {/* DESCRIPTION - chỉ hiện khi hover */}
                <motion.p
                  className="text-white/90 text-sm mt-3"
                  variants={{
                    rest: { opacity: 0, y: 20, height: 0 },
                    hover: { opacity: 1, y: 0, height: "auto" },
                  }}
                  transition={{ duration: 0.4 }}
                >
                  Nhà hiện đại với kiến trúc sang trọng, tối giản với không gian
                  mở, thiết kế phù hợp cho gia đình trẻ yêu thích sự tinh tế.
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
