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
    <section className="bg-[#f5f5f5] py-28">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
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
            Khám phá{" "}
            <span className="text-[#c6a47e]">giá trị chúng tôi mang lại</span>{" "}
            trong mỗi dự án
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-6 text-gray-600 leading-relaxed"
          >
            Chúng tôi kết hợp sự sáng tạo, quy trình tối ưu và kinh nghiệm
            chuyên môn để mang đến những dự án chất lượng cao, bền vững và đạt
            chuẩn quốc tế.
          </motion.p>

          <div className="mt-12 space-y-8">
            {[
              {
                title: "Kiến tạo Dấu ấn Độc bản",
                desc: "Kiến trúc không chỉ là sắp đặt vật liệu mà là giao hưởng của không gian.",
              },
              {
                title: "Vẻ đẹp Thách thức Thời gian",
                desc: "Một công trình hoàn mỹ là di sản bền vững cho tương lai.",
              },
              {
                title: "Tinh hoa từ Tâm huyết & Kinh nghiệm",
                desc: "Hơn 15 năm sáng tạo với trái tim và khối óc tinh anh.",
              },
              {
                title: "Hành trình Đồng hành Trọn vẹn",
                desc: "Xây nhà là hành trình kiến tạo hạnh phúc.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="pt-6 border-t border-gray-200"
              >
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGES */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-2"
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-2">
            <motion.div
              variants={item}
              className="h-[300px] overflow-hidden rounded-3xl"
            >
              <img
                src="https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-why-img-1.jpg?1765523822921"
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </motion.div>

            <motion.div
              variants={item}
              className="h-[300px] overflow-hidden "
            >
                <img
                  src="https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-why-img-3.jpg?1765523822921"
                  className="w-full object-cover hover:scale-105 transition duration-700 rounded-3xl"
                />
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-2">
            <motion.div
              variants={item}
              className="h-[300px] overflow-hidden flex items-end"
            >
                <img
                  src="https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-why-img-2.jpg?1765523822921"
                  className="w-full object-cover hover:scale-105 transition duration-700 rounded-3xl"
                />
            </motion.div>

            <motion.div
              variants={item}
              className="h-[300px] overflow-hidden rounded-3xl"
            >
              <img
                src="https://bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-why-img-4.jpg?1765523822921"
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
