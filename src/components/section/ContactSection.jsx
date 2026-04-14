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
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ContactSection = () => {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="bg-[#f5f0e8] py-28 px-6 "
      //   style={{
      //     backgroundImage: "radial-gradient(#d4d4d4 1px, transparent 1px)",
      //     backgroundSize: "18px 18px",
      //   }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.div
            variants={item}
            className="text-[#04a04d] font-semibold mb-3"
          >
            Liên Hệ
          </motion.div>

          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-bold text-[#04a04d] font-itim"
          >
            Ghé Thăm Lơ Tơ Mơ
          </motion.h2>

          <motion.div
            variants={item}
            className="w-16 h-[2px] bg-[#04a04d] mx-auto mt-4"
          />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div variants={container} className="space-y-8">
            {/* Address */}
            <motion.div variants={item}>
              <h3 className="text-[#04a04d] font-semibold mb-2">Địa Chỉ</h3>
              <p className="text-gray-600">123 Đường ABC, Quận 1</p>
              <p className="text-gray-600">TP. Hồ Chí Minh, Việt Nam</p>
            </motion.div>

            {/* Time */}
            <motion.div variants={item}>
              <h3 className="text-[#04a04d] font-semibold mb-2">Giờ Mở Cửa</h3>
              <div className="flex justify-between max-w-xs text-gray-600">
                <span>Thứ 2 - Thứ 6</span>
                <span className="text-[#04a04d]">7:30 - 22:00</span>
              </div>
              <div className="flex justify-between max-w-xs text-gray-600">
                <span>Thứ 7 - Chủ Nhật</span>
                <span className="text-[#04a04d]">8:00 - 23:00</span>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div variants={item}>
              <h3 className="text-[#04a04d] font-semibold mb-2">Liên Hệ</h3>
              <p className="text-gray-600">Điện thoại: 0123 456 789</p>
              <p className="text-gray-600">Email: hello@lotomo.vn</p>
            </motion.div>
          </motion.div>

          {/* RIGHT - MAP */}
          <motion.div
            variants={item}
            className="relative group rounded-2xl overflow-hidden h-[400px]"
          >
            {/* Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.450604461889!2d106.76687867481921!3d10.853291589300184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175279fcb6b69dd%3A0x41760691e224ff1e!2zNDIgxJAuIHPhu5EgNiwgUGjGsOG7nW5nLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oIDcxMzAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1776146402404!5m2!1svi!2s"
              className="w-full h-full border-0 grayscale-[20%] contrast-95"
              loading="lazy"
            />

            {/* Overlay nhẹ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-80 group-hover:opacity-30 transition duration-500" />

            {/* Card info nổi */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg"
            >
              <p className="text-sm text-gray-500">Địa chỉ</p>
              <p className="font-semibold text-[#04a04d]">
                123 Đường ABC, Quận 1
              </p>

              <button
                onClick={() =>
                  window.open("https://maps.google.com?q=10.853291,106.766878")
                }
                className="mt-2 text-sm text-white bg-[#04a04d] px-3 py-1 rounded-full hover:bg-green-700 transition"
              >
                Mở Google Maps →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
