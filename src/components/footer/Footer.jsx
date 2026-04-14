import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Footer() {
  return (
    <div className="relative">
      {/* ✅ Wave nằm ngoài footer */}
      <div className="w-full overflow-hidden leading-none bg-[#f5f0e8]">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="block w-full h-[120px]"
        >
          <path
            d="M0,30 C200,80 400,0 720,30 C1040,60 1240,10 1440,40 L1440,100 L0,100 Z"
            fill="#038a42"
          />
        </svg>
      </div>

      {/* ✅ Footer thật */}
      <motion.footer
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-[#038a42] text-white pt-16 pb-8 px-6 lg:px-16 font-itim"
      >
        {/* 🔥 MOBILE VERSION */}
        <div className="block lg:hidden text-center">
          <motion.div variants={item}>
            <h2 className="text-3xl font-bold mb-6">Lơ tơ mơ</h2>

            <p className="mb-6 text-sm text-gray-200">Kết nối với lơ tơ mơ</p>

            <div className="flex justify-center gap-4 mb-6">
              {[Facebook, Instagram].map((Icon, i) => (
                <div
                  key={i}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black"
                >
                  <Icon size={20} />
                </div>
              ))}

              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black">
                Tik
              </div>
            </div>

            <div className="text-xs text-gray-300">© Lơ tơ mơ</div>
          </motion.div>
        </div>

        {/* 💻 DESKTOP VERSION */}
        <div className="hidden lg:block">
          {/* Top */}
          <motion.div
            variants={item}
            className="flex flex-col lg:flex-row justify-between items-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 lg:mb-0">Lơ tơ mơ</h2>

            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">
                Kết nối với lơ tơ mơ
              </span>

              <div className="flex gap-3">
                {[Facebook, Instagram].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-110 transition"
                  >
                    <Icon size={18} />
                  </div>
                ))}

                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black">
                  Tik
                </div>
              </div>
            </div>
          </motion.div>

          <div className="border-t border-white/10 mb-12"></div>

          {/* Grid */}
          <motion.div variants={container} className="grid grid-cols-4 gap-10">
            {/* giữ nguyên phần grid của bạn */}
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
