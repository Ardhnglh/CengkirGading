import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import "../../../index.css";
import { ToastContainer, toast } from "react-toastify";

const CreateKalender = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    tanggal_event: "",
    files: [],
  });
  const [error, setError] = useState(null);

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
    form.append("tanggal_event", formData.tanggal_event);

    formData.files.forEach((file) => {
      form.append("file", file);
    });

    try {
      await api.post("/kalenderAcara", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Kalender Acara berhasil dibuat!");
      setTimeout(() => {
        navigate("/admin/kalender");
      }, 2000);
    } catch (error) {
      toast.error("Error membuat user. Silakan coba lagi.");
      console.error("Submission error:", error);
      setError(error.response?.data?.message || "Error creating event");
    }
  };

  const handleCancel = () => {
    navigate("/admin/kalender");
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="py-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-semibold text-center mb-8 font-dramatic-header">
            Tambah Kalender Acara
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold">
                Judul Acara
              </label>
              <input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleInputChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Judul Acara"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold">
                Deskripsi Acara
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Deskripsi Acara"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold">
                Tanggal Event
              </label>
              <input
                type="date"
                name="tanggal_event"
                value={formData.tanggal_event}
                onChange={handleInputChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                required
              />
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
              Simpan Acara
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

export default CreateKalender;
