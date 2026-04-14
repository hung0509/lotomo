import { motion } from "framer-motion";

export default function ProductCard({
  title,
  price,
  description,
  image,
  badge,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
      }}
      transition={{ type: "spring", stiffness: 180, damping: 15 }}
      className="h-full flex flex-col rounded-2xl overflow-hidden bg-white cursor-pointer"
    >
      {/* Image */}
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="h-60 bg-[#cfe3d9] flex items-center justify-center"
        >
          {image ? (
            <img src={image} className="w-full h-full object-cover" />
          ) : (
            <div className="w-16 h-16 bg-green-300 rounded-full opacity-40" />
          )}
        </motion.div>

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm"
          >
            {badge}
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-green-700 line-clamp-2 min-h-[48px]">
            {title}
          </h3>
          <span className="text-green-600 font-bold">{price}</span>
        </div>

        <p className="text-gray-500 mt-2 text-sm line-clamp-2 min-h-[40px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
