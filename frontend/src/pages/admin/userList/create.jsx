import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../index.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    kataSandi: "",
    konfirmasiKataSandi: "",
    nim: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.kataSandi !== formData.konfirmasiKataSandi) {
      toast.error("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      return;
    }

    try {
      const response = await api.post("/user", formData);
      toast.success("User berhasil dibuat!");
      setTimeout(() => {
        navigate("/admin/user/");
      }, 2000);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Email sudah terdaftar. Silakan gunakan email lain.");
      } else {
        toast.error("Error membuat user. Silakan coba lagi.");
      }
      console.error("Error creating user:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/user");
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-semibold text-center mb-8 font-dramatic-header">
            Create User
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="nama"
              >
                Nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Nama Lengkap"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Email"
              />
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="kataSandi"
              >
                Kata Sandi
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="kataSandi"
                name="kataSandi"
                value={formData.kataSandi}
                onChange={handleChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md pr-10"
                placeholder="*********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5 text-gray-500 mt-8" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500 mt-8" />
                )}
              </button>
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="konfirmasiKataSandi"
              >
                Konfirmasi Kata Sandi
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="konfirmasiKataSandi"
                name="konfirmasiKataSandi"
                value={formData.konfirmasiKataSandi}
                onChange={handleChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md pr-10"
                placeholder="*********"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmPassword ? (
                  <EyeIcon className="h-5 w-5 text-gray-500 mt-8" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500 mt-8" />
                )}
              </button>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="nim"
              >
                NIM
              </label>
              <input
                type="text"
                id="nim"
                name="nim"
                value={formData.nim}
                onChange={handleChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Masukkan NIM"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="role"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
              >
                <option
                  className="block text-gray-600 font-dramatic-subtitle"
                  value=""
                  disabled
                >
                  Pilih Role
                </option>
                <option
                  className="block text-gray-600 font-dramatic-subtitle"
                  value="Admin"
                >
                  Admin
                </option>
                <option
                  className="block text-gray-600 font-dramatic-subtitle mb-2"
                  value="User"
                >
                  User
                </option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 mb-3 font-dramatic-body-user text-lg"
            >
              Create User
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 font-dramatic-body-user text-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default CreateUser;
