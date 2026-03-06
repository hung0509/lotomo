import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-6">
        {/* LEFT SIDE - IMAGES */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index_about_img_1.jpg?1763537642200"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
            />
          </div>

          <div className="overflow-hidden rounded-2xl mt-10">
            <img
              src="https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index_about_img_2.jpg?1763537642200"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
            />
          </div>

          <div className="overflow-hidden rounded-2xl mb-10">
            <img
              src="https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index_about_img_3.jpg?1763537642200"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
            />
          </div>

          <div className="overflow-hidden rounded-2xl ">
            <img
              src="https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index_about_img_4.jpg?1763537642200"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
            />
          </div>
        </motion.div>

        {/* RIGHT SIDE - CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-[#c6a47e] font-semibold mb-4">VỀ CHÚNG TÔI</p>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Tạo ra những <span className="text-[#c6a47e]">không gian đẹp</span>
          </h2>

          <p className="text-gray-600 mb-6">
            Với hơn 15 năm kinh nghiệm trong lĩnh vực kiến trúc...
          </p>

          {/* Stats */}
          <div className="flex gap-12 mt-8">
            <div>
              <h3 className="text-3xl font-bold text-[#c6a47e]">500+</h3>
              <p>Dự án hoàn thành</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#c6a47e]">50+</h3>
              <p>Giải thưởng</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#c6a47e]">100%</h3>
              <p>Hài lòng khách hàng</p>
            </div>
          </div>

          <button className="mt-8 px-6 py-3 bg-[#c6a47e] text-white rounded-lg">
            Tìm hiểu thêm →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
