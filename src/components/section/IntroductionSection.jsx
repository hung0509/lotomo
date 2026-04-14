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
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const images = [
  "https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-why-img-1.jpg?1765523822921",
  "https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-why-img-3.jpg?1765523822921",
  "https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-why-img-2.jpg?1765523822921",
  "https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-why-img-4.jpg?1765523822921",
];

export default function IntroductionSection() {
  return (
    <section className="relative bg-[#026b33] text-white py-24 overflow-hidden ">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="block w-full h-[60px] md:h-[80px]"
        >
          <path
            d="M0,60 C400,100 1000,0 1440,60 L1440,100 L0,100 Z"
            fill="#f5f0e8"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start font-itim py-28">
        {/* LEFT CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={item}
            className="text-4xl lg:text-5xl font-bold leading-tight"
          >
            Trà Sữa Matcha{" "}
            <span className="text-[#c6a47e]">Trân Châu Đường Đen</span>
          </motion.h2>

          <motion.p variants={item} className="mt-6 leading-relaxed">
            Sự kết hợp hoàn hảo giữa matcha Uji nguyên chất và trân châu đường
            đen tự làm mỗi ngày. Vị matcha đậm đà hoà quyện cùng sữa tươi béo
            ngậy, điểm xuyết bởi những viên trân châu dẻo thơm — tạo nên một tác
            phẩm khiến bạn nhớ mãi.
          </motion.p>

          <div className="mt-12 space-y-8">
            {[
              {
                title: "Sữa tươi nguyên kem, không dùng bột kem",
              },
              {
                title: "Trân châu đường đen tự nấu mỗi ngày",
              },
              {
                title: "Matcha nguyên chất nhập từ Uji, Kyoto",
              },
            ].map((feature, index) => (
              <motion.li key={index} variants={item} className="ml-4">
                <p className="leading-relaxed">{feature.title}</p>
              </motion.li>
            ))}
          </div>

          
          <button className="bg-[#04a04d] text-white px-8 py-4 mt-5 rounded-3xl hover:scale-105 transition">
            Xem thực đơn
          </button>
        </motion.div>

        {/* RIGHT IMAGES */}
        <motion.div
          variants={item}
          initial="hidden"
          className="relative w-full max-w-md mx-auto px-12"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* CARD */}
          <div className="bg-[#1f7a45] rounded-3xl h-[400px] flex items-center justify-center">
            {/* Ảnh sản phẩm */}
            <img
              src="https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-why-img-1.jpg?1765523822921"
              className="w-full h-full object-cover rounded-3xl opacity-80"
            />

            {/* Overlay nhẹ */}
            <div className="absolute inset-0 bg-[#026b33]/60 rounded-3xl" />
          </div>

          {/* PRICE BADGE */}
          <div className="absolute top-6 right-[-20px] bg-white text-[#026b33] px-6 py-3 rounded-2xl shadow-lg font-semibold text-xl">
            59.000 <span className="text-sm text-gray-500 ml-1">VNĐ</span>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="block w-full h-[60px] md:h-[80px]"
        >
          <path
            d="M0,60 C400,100 1000,0 1440,60 L1440,100 L0,100 Z"
            fill="#f5f0e8"
          />
        </svg>
      </div>
    </section>
  );
}
