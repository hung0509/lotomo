import { motion } from "framer-motion";

const SliderWeb = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* Background Image Zoom nhẹ khi load */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/slider_2.jpg?1765523822921')" }}
        />
      </motion.div>

      {/* Overlay fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-black"
      />

      {/* Text content */}
      <div className="relative z-10 flex items-center h-full px-10 lg:px-24">
        <div className="text-white max-w-2xl">
          
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mb-4 text-lg"
          >
            Sáng tạo không giới hạn
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-5xl lg:text-7xl font-bold mb-6"
          >
            Thiết kế độc đáo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-lg lg:text-xl mb-8"
          >
            Mỗi dự án là một câu chuyện, mỗi thiết kế là một tác phẩm nghệ thuật độc lập.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="px-6 py-3 bg-white text-black font-semibold rounded-md"
          >
            Khám phá ngay
          </motion.button>

        </div>
      </div>
    </div>
  );
};

export default SliderWeb;