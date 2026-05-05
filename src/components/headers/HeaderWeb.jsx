import { useEffect, useState } from "react";
import { Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeaderWeb() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md text-black" : "bg-transparent text-white"
      }`}
    >
      <div className="flex items-center justify-between px-10 py-4 backdrop-blur-md">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-wide">
          <span className="font-light font-itim">Lơ Tơ Mơ</span>
        </div>

        {/* Menu */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          <a href="#top" className="hover:text-yellow-400 transition font-itim">
            Trang chủ
          </a>

          <a
            href="#about"
            className="hover:text-yellow-400 transition font-itim"
          >
            Câu chuyện
          </a>

          <a
            href="#intro"
            className="hover:text-yellow-400 transition font-itim"
          >
            Thực đơn
          </a>

          <a href="#cta" className="hover:text-yellow-400 transition font-itim">
            Không gian
          </a>

          <a
            href="#contact"
            className="hover:text-yellow-400 transition font-itim"
          >
            Liên hệ
          </a>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <User
            onClick={() => handleLogin()}
            className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition"
          />
        </div>
      </div>
    </header>
  );
}
