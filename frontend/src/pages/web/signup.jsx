import React, { useState } from "react";
import WebLayout from "../../layouts/BerandaLayout";
import api from "../../services/api";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const Signup = () => {
  const initialFormData = {
    nama: "",
    email: "",
    kataSandi: "",
    konfirmasiKataSandi: "",
    nim: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Inisialisasi notyf
  const notyf = new Notyf({
    duration: 3000,
    position: { x: "center", y: "top", yOffset: "150px" },
    dismissible: true,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.kataSandi !== formData.konfirmasiKataSandi) {
      notyf.error("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      return;
    }

    try {
      await api.post("/user", {
        nama: formData.nama,
        email: formData.email,
        kataSandi: formData.kataSandi,
        nim: formData.nim,
        role: "User",
      });

      notyf.success("Pendaftaran berhasil!");
      setFormData(initialFormData);
      setError("");
      navigate("/login");
    } catch (err) {
      let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";

      if (err.response?.status === 409) {
        errorMessage = "Email sudah terdaftar. Silakan gunakan email lain.";
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }

      notyf.error(errorMessage);
    }
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

        <div className="flex-1 max-w-md p-10 mt-4 mr-36">
          <h2 className="text-green-700 text-xl font-dramatic-body font-bold mb-4 border-b border-gray-300 inline-block pb-0.5">
            Daftar Akun Baru
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 font-dramatic-body"
          >
            <div>
              <label htmlFor="nama" className="block text-gray-700 mb-1">
                Nama<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nama"
                className="w-full px-4 py-2 border border-gray-300 rounded transition duration-300 focus:border-green-400 hover:border-green-400 focus:outline-none"
                placeholder="Masukkan nama kamu"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded transition duration-300 focus:border-green-400 hover:border-green-400 focus:outline-none"
                placeholder="Masukkan email kamu"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="kataSandi" className="block text-gray-700 mb-1">
                Kata Sandi<span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="kataSandi"
                className="w-full px-4 py-2 border border-gray-300 rounded transition duration-300 focus:border-green-400 hover:border-green-400 focus:outline-none"
                placeholder="Masukkan kata sandi kamu"
                value={formData.kataSandi}
                onChange={handleChange}
                required
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 mt-6 hover:text-green-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="konfirmasiKataSandi"
                className="block text-gray-700 mb-1"
              >
                Konfirmasi Kata Sandi<span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="konfirmasiKataSandi"
                className="w-full px-4 py-2 border border-gray-300 rounded transition duration-300 focus:border-green-400 hover:border-green-400 focus:outline-none"
                placeholder="Masukkan ulang kata sandi kamu"
                value={formData.konfirmasiKataSandi}
                onChange={handleChange}
                required
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 mt-6 hover:text-green-500"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={19} />
                ) : (
                  <FiEye size={19} />
                )}
              </div>
            </div>

            <div>
              <label htmlFor="nim" className="block text-gray-700 mb-1">
                NIM<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nim"
                className="w-full px-4 py-2 border border-gray-300 rounded transition duration-300 focus:border-green-400 hover:border-green-400 focus:outline-none"
                placeholder="Masukkan NIM kamu"
                value={formData.nim}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition"
            >
              Daftar
            </button>
          </form>

          <p className="text-gray-700 text-sm mt-6">
            Sudah Punya Akun?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
                navigate("/login");
              }}
            >
              Masuk
            </a>
          </p>
        </div>
      </div>
    </WebLayout>
  );
};

export default Signup;
