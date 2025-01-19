import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WebLayout from "../../layouts/BerandaLayout";
import api from "../../services/api";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    scrollToTop();
    try {
      const response = await api.post("/login", {
        email,
        kataSandi: password,
      });

      const { token, role, nama, nim, userId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("nama", nama);
      localStorage.setItem("nim", nim);
      localStorage.setItem("id", userId);

      if (role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/drama/:id");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login gagal. Coba lagi."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <WebLayout>
      <div className="flex justify-center items-start min-h-screen bg-white">
        <div className="flex-1 flex flex-col items-center mt-10 ml-4">
          <img
            src="/logo2.png"
            alt="Cengkir Gading Logo"
            className="w-60 h-auto mb-4"
          />
          <p className="text-center px-24 text-gray-900 text-sm mb-8 font-dramatic-body">
            Bergabunglah dengan Cengkir Gading, dan Jadilah Bagian dari
            Komunitas Kreatif yang Menghidupkan Seni Peran di Panggung!
          </p>
        </div>

        <div className="flex-1 max-w-md p-8 mt-16 mr-36">
          <h2 className="text-green-700 text-xl font-dramatic-body font-bold mb-4 border-b border-gray-300 inline-block pb-0.5">
            Masuk ke Akun Kamu
          </h2>

          <form className="space-y-6 font-dramatic-body" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded duration-300 focus:border-green-400 hover:border-green-400 focus:outline-none"
                placeholder="Masukkan email kamu"
                required
              />
            </div>

            <div className="relative mt-4">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Kata Sandi<span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded duration-300 focus:border-green-400 hover:border-green-400 focus:outline-none"
                placeholder="Masukkan kata sandi kamu"
                required
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 mt-6 hover:text-green-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition"
            >
              Login
            </button>
          </form>

          <p className="text-gray-700 text-sm mt-6">
            Belum Mempunyai Akun?{" "}
            <a
              href="/signup"
              className="text-blue-500 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
                navigate("/signup");
              }}
            >
              Buat Akun
            </a>
          </p>
        </div>
      </div>
    </WebLayout>
  );
};

export default Login;
