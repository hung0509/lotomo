import { Search, User, Heart, ShoppingCart } from "lucide-react";

export default function HeaderWeb() {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-10 py-4 bg-black/40 backdrop-blur-md text-white">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-wide">
          Wolf<span className="font-light">Arch</span>
        </div>

        {/* Menu */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          <a href="#" className="hover:text-yellow-400 transition">
            Trang chủ
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            Giới thiệu
          </a>
          <a
            href="#"
            className="hover:text-yellow-400 transition flex items-center gap-1"
          >
            Tin tức
          </a>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-yellow-400 transition">
              Dự án
              <span className="text-xs transition-transform duration-300 group-hover:rotate-180">
                ▾
              </span>
            </button>

            <div
              className="absolute left-0 top-full mt-3 w-60 bg-white text-black rounded-xl shadow-2xl
                  opacity-0 invisible translate-y-3 scale-95
                  transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:opacity-100
                  group-hover:visible
                  group-hover:translate-y-0
                  group-hover:scale-100"
            >
              <ul className="py-2 text-sm">
                <li className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition">
                  Biệt thự - Nhà phố
                </li>
                <li className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition">
                  Nhà hàng - Coffee
                </li>
                <li className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition">
                  Hotel - Homestay
                </li>
                <li className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition">
                  Office - Apartment
                </li>
              </ul>
            </div>
          </div>

          <a href="#" className="hover:text-yellow-400 transition">
            Sản phẩm
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            Dịch vụ
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            Xu hướng
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            Liên hệ
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            FAQs
          </a>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Search className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition" />
          <User className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition" />

          <div className="relative">
            <Heart className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition" />
            <span className="absolute -top-2 -right-2 bg-green-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          <div className="relative">
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
