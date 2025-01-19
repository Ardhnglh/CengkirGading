import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import "../../../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateExercise = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    tipe: "",
    files: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      files: Array.from(e.target.files),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("judul", formData.judul);
    form.append("deskripsi", formData.deskripsi);
    form.append("tipe", formData.tipe);

    formData.files.forEach((file) => {
      form.append("file", file);
    });

    try {
      const response = await api.post("/daily-exercise", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Exercise berhasil dibuat!");
      setTimeout(() => {
        navigate("/admin/exercise");
      }, 2000);
    } catch (error) {
      toast.error("Error membuat exercise. Silakan coba lagi.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/exercise");
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="py-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-semibold text-center mb-8 font-dramatic-header">
            Tambah Exercise
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold">
                Judul
              </label>
              <input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleInputChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Judul Exercise"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold">
                Deskripsi
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Deskripsi Exercise"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold">
                Tipe Exercise
              </label>
              <select
                name="tipe"
                value={formData.tipe}
                onChange={handleInputChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                required
              >
                <option value="" disabled>
                  Pilih tipe exercise
                </option>
                <option value="Video Tutorial">Video</option>
                <option value="Artikel">Artikel</option>
                <option value="Buku">Buku</option>
                <option value="Teori-teori Akting">Teori-teori Akting</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold">
                Upload File (Opsional)
              </label>
              <input
                type="file"
                name="files"
                onChange={handleFileChange}
                multiple
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 font-dramatic-body-user text-lg mb-3"
            >
              Simpan Exercise
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

export default CreateExercise;
