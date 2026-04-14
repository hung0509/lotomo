import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
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

const items = [
  {
    title: "Matcha Latte",
    price: "55.000đ",
    description: "Matcha Uji nguyên chất kết hợp sữa tươi béo ngậy",
    badge: "Bán chạy",
  },
  {
    title: "Trà Sữa Matcha Trân Châu",
    price: "59.000đ",
    description: "Matcha latte với trân châu đường đen tự làm",
    badge: "Đặc biệt",
  },
  {
    title: "Hojicha Latte",
    price: "55.000đ",
    description: "Trà rang Hojicha thơm nồng với sữa tươi",
  },
];

export default function CTASection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#f5f0e8] py-28 px-6 text-center relative"
      style={{
        backgroundColor: "#f5f0e8",
        backgroundImage: "radial-gradient(#d4d4d4 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={item}
          className="font-bold text-[#04a04d]  mb-6 font-itim"
        >
          Thực đơn
        </motion.div>
        <motion.h2
          variants={item}
          className="text-4xl md:text-5xl font-bold text-[#04a04d]  mb-6 font-itim"
        >
          Tinh Hoa Matcha
        </motion.h2>

        <motion.p
          variants={item}
          className="font-bold mb-6 font-itim"
        >
          <p className="opacity-45">Mỗi món nước được pha chế thủ công từ nguyên liệu tươi, mang đến hương vị chân thực nhất</p>
        </motion.p>

        <motion.div
          variants={item}
          className="text-gray-700 text-lg leading-relaxed space-y-6 font-itim"
        >
          <div className="w-20 border-t-2 border-[#04a04d] mx-auto mt-4"> </div>
        </motion.div>

        <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid md:grid-cols-3 gap-8 mt-8"
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariant}
          >
            <ProductCard {...item} />
          </motion.div>
        ))}
      </motion.div>
      </div>
    </motion.section>
  );
}
