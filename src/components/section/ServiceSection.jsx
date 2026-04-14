// import { motion } from "framer-motion";

// const container = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const item = {
//   hidden: {
//     opacity: 0,
//     y: 60,
//   },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: [0.22, 1, 0.36, 1], // easeOutExpo kiểu cao cấp
//     },
//   },
// };

// const data = [
//   "//bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-service-img-1.jpg?1765523822921",
//   "//bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-service-img-2.jpg?1765523822921",
//   "//bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-service-img-3.jpg?1765523822921",
//   "//bizweb.dktcdn.net/100/613/180/themes/1059578/assets/index-service-img-4.jpg?1765523822921",
// ];

// export default function ServiceSection() {
//   return (
//     <section className="py-24 bg-gray-50 overflow-hidden ">
//       <div className="max-w-7xl mx-auto">
//         {/* ===== HEADER ===== */}
//         <motion.div
//           variants={container}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.3 }}
//           className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
//         >
//           {/* Left */}
//           <motion.div variants={item}>
//             <p className="text-sm tracking-widest text-[#C6A47E] uppercase mb-4">
//               DỊCH VỤ CỦA CHÚNG TÔI
//             </p>

//             <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
//               Kiến tạo <span className="text-[#C6A47E]">Sự khác biệt</span> –
//               Gói trọn mọi Ý tưởng
//             </h2>
//           </motion.div>

//           {/* Right */}
//           <motion.div
//             variants={item}
//             className="text-gray-600 text-lg leading-relaxed mt-10"
//           >
//             Thổi hồn vào không gian với dịch vụ thiết kế nội thất độc bản, nơi
//             mọi mong muốn của bạn được lắng nghe và hiện thực hóa. Chúng tôi
//             đồng hành cùng bạn từ khâu định hình ý tưởng cho đến ngày hoàn thiện
//             từng chi tiết lắp đặt cuối cùng.
//           </motion.div>
//         </motion.div>

//         <motion.div
//           variants={container}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.2 }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
//         >
//           {data.map((itemData, index) => (
//             <motion.div
//               key={index}
//               variants={item}
//               className="relative rounded-3xl overflow-hidden group cursor-pointer"
//             >
//               <img
//                 src={itemData}
//                 className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-700"
//               />

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
//                 <h3 className="text-xl font-semibold mb-3">Tiêu đề dịch vụ</h3>
//                 <p className="text-sm text-gray-200 mb-4">
//                   Mô tả ngắn gọn dịch vụ ở đây...
//                 </p>
//                 <span className="underline">Xem thêm</span>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
