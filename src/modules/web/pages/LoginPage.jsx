"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../../../hooks/useAuthentication";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      await login({ username, password });

      toast.success("Đăng nhập thành công 🎉");

      navigate("/select-role");
    } catch (error) {
      toast.error("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-[#038a42] text-white items-center justify-center relative overflow-hidden">
        {/* Content */}
        <div className="z-10 max-w-md w-full px-12">
          <h2 className="text-4xl font-semibold leading-tight mb-6">
            Matcha House
          </h2>

          <p className="text-base opacity-90 leading-relaxed mb-10">
            Giải pháp quản lý bán hàng và vận hành cửa hàng matcha hiện đại, đơn
            giản và hiệu quả.
          </p>

          <button
            className="px-8 py-3 rounded-full border border-white 
      hover:bg-white hover:text-[#038a42] transition font-medium"
          >
            SIGN UP
          </button>
        </div>

        {/* Curve */}
        <div className="absolute right-[-120px] top-0 h-full w-[300px] bg-[#f3f4f6] rounded-l-[200px]" />

        {/* Light overlay (depth nhẹ) */}
        <div className="absolute inset-0 bg-white/5" />
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 bg-[#f3f4f6] flex items-center justify-center px-6">
        {/* CARD */}
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
            Sign in
          </h1>

          <div className="space-y-5">
            {/* Username */}
            <div className="flex items-center bg-gray-100 rounded-full px-5 py-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Email / Username"
                className="ml-3 bg-transparent outline-none flex-1 text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-gray-100 rounded-full px-5 py-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="ml-3 bg-transparent outline-none flex-1 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-[#038a42] text-white py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition"
            >
              LOGIN
            </button>
          </div>

          {/* Social */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Or sign in with
          </p>

          <div className="flex justify-center gap-4 mt-4">
            <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer">
              f
            </div>
            <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer">
              G
            </div>
            <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer">
              in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
