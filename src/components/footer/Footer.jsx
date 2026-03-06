import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f2322] text-white pt-16 pb-8 px-6 lg:px-16">
      
      {/* Top */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
        
        <h2 className="text-3xl font-bold mb-6 lg:mb-0">
          Wolf<span className="font-light">Arch</span>
        </h2>

        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">Kết nối với Wolf Arch</span>

          <div className="flex gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black cursor-pointer hover:scale-110 transition">
              <Facebook size={18} />
            </div>

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black cursor-pointer hover:scale-110 transition">
              <Instagram size={18} />
            </div>

            {/* TikTok chưa có trong lucide */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black cursor-pointer hover:scale-110 transition">
              Tik
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mb-10"></div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <h3 className="font-semibold text-lg mb-6">Wolf Arch</h3>

          <div className="space-y-4 text-gray-300">

            <div className="flex items-start gap-3">
              <Mail className="mt-1" size={20} />
              <span>support@sapo.vn</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-1" size={20} />
              <span>
                70 Lữ Gia, Phường 15, Quận 11, Thành phố Hồ Chí Minh
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={20} />
              <span>1900 6750</span>
            </div>

          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-6">Về chúng tôi</h3>

          <ul className="space-y-3 text-gray-300">
            <li className="hover:text-white cursor-pointer">
              Giới thiệu Wolf Arch
            </li>
            <li className="hover:text-white cursor-pointer">
              Tuyển dụng
            </li>
            <li className="hover:text-white cursor-pointer">
              Dự án đã thực hiện
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-6">Portfolio</h3>

          <ul className="space-y-3 text-gray-300">
            <li className="hover:text-white cursor-pointer">
              Thiết kế nội thất nhà ở
            </li>
            <li className="hover:text-white cursor-pointer">
              Thiết kế nhà sang trọng
            </li>
            <li className="hover:text-white cursor-pointer">
              Thiết kế không gian thương mại
            </li>
            <li className="hover:text-white cursor-pointer">
              Thiết kế cải tạo và phục hồi
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-6">Phong cách nội thất</h3>

          <ul className="space-y-3 text-gray-300">
            <li className="hover:text-white cursor-pointer">
              Minimalist tối giản
            </li>
            <li className="hover:text-white cursor-pointer">
              Modern Hiện đại
            </li>
            <li className="hover:text-white cursor-pointer">
              Cổ điển - Tân Cổ Điển
            </li>
            <li className="hover:text-white cursor-pointer">
              Thô Mộc
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-400 text-sm">
        © Bản quyền thuộc về <span className="text-white">Wolf Themes</span>. 
        Cung cấp bởi <span className="text-white">Sapo</span>
      </div>

    </footer>
  );
}