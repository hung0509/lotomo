"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../../../hooks/useAuthentication";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const handleLogin = () => {
    if (username && password) {
      login({username: username, password: password})
      navigate("/select-role");
    } else {
      alert("Vui lòng nhập đầy đủ thông tin");
    }
  };


  return (
    <div className="min-h-screen bg-[#038a42] flex justify-center items-center">
      {/* 📱 Mobile Frame */}
      <div className="w-full max-w-[420px] bg-white min-h-screen rounded-[30px] shadow-2xl overflow-hidden flex flex-col justify-center px-6">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#038a42]">
            🍵 Lơ tơ mơ
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Đăng nhập để tiếp tục
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Email */}
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-3 focus-within:ring-2 focus-within:ring-[#038a42]">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="ml-3 bg-transparent outline-none flex-1 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-3 focus-within:ring-2 focus-within:ring-[#038a42]">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="ml-3 bg-transparent outline-none flex-1 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#038a42] text-white py-3 rounded-xl font-semibold shadow hover:opacity-90 active:scale-95 transition"
          >
            Đăng nhập
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-10">
          © Lơ tơ mơ Coffee
        </p>
      </div>
    </div>
  );
}