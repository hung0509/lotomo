import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    y: -60,
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

export default function CTASection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#f5f5f5] py-28 px-6 text-center relative"
       style={{
        backgroundColor: "#f5f5f5",
        backgroundImage: "radial-gradient(#d4d4d4 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="max-w-4xl mx-auto">

        <motion.h2
          variants={item}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
        >
          Sẵn sàng bắt đầu dự án của bạn?
        </motion.h2>

        <motion.p
          variants={item}
          className="text-gray-600 text-lg leading-relaxed mb-10"
        >
          Liên hệ với chúng tôi ngay hôm nay để tư vấn miễn phí về dự án kiến
          trúc của bạn. Đội ngũ chuyên gia của chúng tôi sẵn sàng giúp bạn.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <button className="bg-[#c5a47e] text-white px-8 py-4 rounded-lg flex items-center gap-3 hover:scale-105 transition">
            Liên hệ ngay
            <ArrowRight size={18} />
          </button>

          <button className="border border-gray-400 px-8 py-4 rounded-lg flex items-center gap-3 hover:bg-gray-200 transition">
            Xem portfolio
            <ArrowRight size={18} />
          </button>
        </motion.div>

      </div>
    </motion.section>
  );
}