import { motion } from "framer-motion";

const SliderWeb = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* ✅ Background xanh + pattern */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-[#038a42]"
      >
        {/* Pattern dấu + */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 10 V30 M10 20 H30"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
      </motion.div>

      {/* Overlay fade (giữ nguyên) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-black"
      />

      {/* Text content (GIỮ NGUYÊN) */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="text-white max-w-3xl flex flex-col items-center font-itim ">
          {/* Icon (optional) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-4"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              🌿
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-4 text-sm tracking-wide text-white/70"
          >
            Nghệ thuật Matcha Thủ Công
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-5xl lg:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Itim', cursive" }}
          >
            Lơ Tơ Mơ
          </motion.h1>

          {/* Line */}
          <div className="w-16 h-[2px] bg-white/40 mb-6" />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-base lg:text-lg text-white/70 leading-relaxed mb-10"
          >
            Nơi hương vị truyền thống Nhật Bản hòa quyện cùng phong cách hiện
            đại. Mỗi tách trà là một tác phẩm nghệ thuật.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex gap-4 flex-wrap justify-center"
          >
            <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold">
              Khám Phá Thực Đơn
            </button>

            <button className="px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10">
              Câu Chuyện Của Chúng Tôi
            </button>
          </motion.div>

          {/* Scroll text */}
          <p className="mt-10 text-white/40 text-sm">Cuộn xuống</p>
        </div>
      </div>
    </div>
  );
};

export default SliderWeb;
