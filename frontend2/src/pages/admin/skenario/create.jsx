import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import "../../../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSkenario = () => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    try {
      const response = await api.post("/skenario", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Skenario berhasil dibuat!");
      setTimeout(() => {
        navigate("/admin/skenario");
      }, 2000);
    } catch (error) {
      toast.error("Error membuat skenario. Silakan coba lagi.");
      console.error("Gagal membuat skenario:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/skenario");
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="py-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-semibold text-center mb-8 font-dramatic-header">
            Tambah Skenario
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="judul"
              >
                Judul
              </label>
              <input
                type="text"
                id="judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Masukkan judul skenario"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="deskripsi"
              >
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                rows="4"
                placeholder="Masukkan deskripsi skenario"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-dramatic-subtitle mb-2 font-semibold"
                htmlFor="file"
              >
                Upload File
              </label>
              <input
                type="file"
                id="file"
                multiple
                onChange={handleFileChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 mb-3 font-dramatic-body-user text-lg"
            >
              Tambah Skenario
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

export default CreateSkenario;
