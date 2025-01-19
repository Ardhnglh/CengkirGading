import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";

const EditSkenario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState([]);
  const [prevFiles, setPrevFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkenario = async () => {
      try {
        const response = await api.get(`/skenario/${id}`);
        setJudul(response.data.judul);
        setDeskripsi(response.data.deskripsi);
        setPrevFiles(response.data.file_paths || []);
      } catch (error) {
        setError("Failed to fetch skenario data");
      }
    };

    fetchSkenario();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);

    if (file.length > 0) {
      file.forEach((f) => formData.append("file", f));
    }

    try {
      await api.put(`/skenario/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Skenario Berhasil Diperbarui!");
      setTimeout(() => {
        navigate("/admin/skenario");
      }, 2000);
    } catch (error) {
      toast.error("Error updating evaluasi");
      setError("Failed to update skenario");
    }
  };

  const handleFileChange = (e) => {
    setFile(Array.from(e.target.files));
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="py-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-bold font-dramatic-header text-center mb-8">
            Edit Skenario
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2">
                Judul Skenario
              </label>
              <input
                type="text"
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2">
                Deskripsi Skenario
              </label>
              <textarea
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                rows="4"
                required
              ></textarea>
            </div>

            {prevFiles.length > 0 && (
              <div className="mb-4">
                <label className="block text-green-700 font-semibold font-dramatic-subtitle mb-2">
                  File Sebelumnya
                </label>
                <div className="flex overflow-x-auto">
                  {prevFiles.map((filePath, index) => (
                    <a
                      key={index}
                      href={filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline mr-4"
                    >
                      Lihat File {index + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2">
                Upload File Baru
              </label>
              <input
                type="file"
                multiple
                className="w-full px-4 py-2 border rounded-md hover:border-green-500 focus:border-green-400"
                onChange={handleFileChange}
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
                onClick={() => navigate("/admin/skenario")}
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

export default EditSkenario;
