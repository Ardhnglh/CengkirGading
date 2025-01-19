import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";

const EditCalender = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    tanggal_event: "",
    files: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKalenderAcara = async () => {
      try {
        const response = await api.get(`/kalenderAcara/${id}`);
        setFormData({
          judul: response.data.judul,
          deskripsi: response.data.deskripsi,
          tanggal_event: response.data.tanggal_event.split("T")[0],
          files: response.data.file_paths || [],
        });
      } catch (error) {
        console.error("Failed to fetch event data:", error);
        setError("Failed to load event data");
      }
    };

    fetchKalenderAcara();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("judul", formData.judul);
    form.append("deskripsi", formData.deskripsi);
    form.append("tanggal_event", formData.tanggal_event);

    if (formData.files.length > 0) {
      for (const file of formData.files) {
        form.append("file", file);
      }
    }

    try {
      await api.put(`/kalenderAcara/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Kalender Acara Berhasil Diperbarui!");
      setTimeout(() => {
        navigate("/admin/Kalender");
      }, 2000);
    } catch (error) {
      toast.error("Error updating user");
      console.error("Failed to update event:", error);
      setError(error.response?.data?.message || "Failed to update event");
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
          <h2 className="text-3xl text-green-600 font-bold font-dramatic-header text-center mb-8">
            Edit Kalender Acara
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
                htmlFor="judul"
              >
                Judul Acara
              </label>
              <input
                type="text"
                id="judul"
                name="judul"
                value={formData.judul}
                onChange={handleInputChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Judul Acara"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
                htmlFor="deskripsi"
              >
                Deskripsi Acara
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Deskripsi Acara"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
                htmlFor="tanggal_event"
              >
                Tanggal Event
              </label>
              <input
                type="date"
                id="tanggal_event"
                name="tanggal_event"
                value={formData.tanggal_event}
                onChange={handleInputChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
                htmlFor="files"
              >
                Upload Files (Opsional)
              </label>
              {formData.files.length > 0 && (
                <div className="mb-4">
                  <label className="block text-green-700 font-semibold font-dramatic-subtitle mb-2">
                    Gambar Sebelumnya
                  </label>
                  <div className="flex overflow-x-auto">
                    {formData.files.map(
                      (filePath, index) =>
                        typeof filePath === "string" &&
                        filePath.startsWith("http") && (
                          <img
                            key={index}
                            src={filePath}
                            alt={`Gambar Acara Sebelumnya ${index + 1}`}
                            className="w-32 h-32 object-cover mr-2"
                          />
                        )
                    )}
                  </div>
                </div>
              )}
              <input
                type="file"
                id="files"
                name="files"
                multiple
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-md hover:border-green-500 focus:border-green-400"
              />
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 font-dramatic-body-user text-lg"
              >
                Simpan Perubahan
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-dramatic-body-user text-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditCalender;
