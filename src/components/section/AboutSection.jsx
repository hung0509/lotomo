import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-24 bg-[#f5f0e8] overflow-hidden">
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
          <p className="text-[#04a04d] font-semibold mb-4 opacity-0.5 font-itim ">
            VỀ CHÚNG TÔI
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-[#038a42] font-itim ">
              {" "}
              Câu Chuyện Lơ Tơ Mơ
            </span>
          </h2>

          <p className="mb-6 text-[#04a04d] ">
            Từ tinh hoa Nhật Bản đến từng giác quan của bạn
          </p>

          <div >
            <div className="text-gray-700 text-lg leading-relaxed space-y-6 font-itim">
              <p>
                Lơ Tơ Mơ ra đời từ niềm đam mê với nghệ thuật pha chế matcha
                truyền thống Nhật Bản. Chúng tôi tin rằng mỗi tách trà không chỉ
                là một thức uống, mà là một trải nghiệm — từ cách nguyên liệu
                được chọn lọc, đến quy trình pha chế tỉ mỉ.
              </p>

              <p>
                Với nguồn matcha nhập khẩu trực tiếp từ Uji, Kyoto, chúng tôi
                mang đến hương vị chân thực và tinh tế nhất. Mỗi sản phẩm tại Lơ
                Tơ Mơ đều được pha chế thủ công, đảm bảo chất lượng và sự độc
                đáo trong từng chi tiết.
              </p>

              {/* Divider */}
              <div className="border-t border-gray-300 pt-6" />
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-8">
            <div>
              <h3 className="text-3xl font-bold text-[#04a04d]">100%</h3>
              <p>Matcha Nhật Bản</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#04a04d]">20+</h3>
              <p>Công thức độc quyền</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#04a04d]">Thủ công</h3>
              <p>Từng tách trà</p>
            </div>
          </div>

          {/* <button className="mt-8 px-6 py-3 bg-[#c6a47e] text-white rounded-lg">
            Tìm hiểu thêm →
          </button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
