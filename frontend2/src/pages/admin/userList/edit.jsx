import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    kataSandi: "",
    nim: "",
    role: "", // Default kosong
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${id}`);
        setFormData({
          nama: response.data.nama,
          email: response.data.email,
          kataSandi: "",
          nim: response.data.nim,
          role: response.data.role || "", // Pastikan role ada atau kosong
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi: Pastikan role sudah dipilih
    if (!formData.role) {
      toast.error("Harap pilih role terlebih dahulu.");
      return;
    }

    try {
      await api.put(`/user/${id}`, formData);
      toast.success("User Berhasil Diperbarui!");
      setTimeout(() => {
        navigate("/admin/user");
      }, 2000);
    } catch (error) {
      toast.error("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/user");
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="py-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-bold text-center mb-8 font-dramatic-header">
            Edit User
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
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
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
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
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
                htmlFor="kataSandi"
              >
                Kata Sandi (Opsional)
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
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
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
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
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
                  disabled
                >
                  Pilih Role
                </option>
                <option
                  className="block text-gray-600 font-dramatic-subtitle"
                  value="admin"
                >
                  Admin
                </option>
                <option
                  className="block text-gray-600 font-dramatic-subtitle mb-2"
                  value="user"
                >
                  User
                </option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 font-dramatic-body-user text-lg mb-3"
            >
              Update User
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
    </AdminLayout>
  );
};

export default EditUser;
