import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";

const EditKarakter = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    judul_evaluasi: "",
    evaluasi: "",
    kekurangan: "",
    user_id: "",
    tanggal_evaluasi: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvaluasiKarakter = async () => {
      try {
        const response = await api.get(`/evaluasiKarakter/${id}`);
        setFormData({
          judul_evaluasi: response.data.judul_evaluasi,
          evaluasi: response.data.evaluasi,
          kekurangan: response.data.kekurangan,
          user_id: response.data.user_id,
          tanggal_evaluasi: response.data.tanggal_evaluasi, // Populate existing date
        });
      } catch (error) {
        console.error("Error fetching evaluasi karakter:", error);
        setError("Gagal mengambil data evaluasi karakter.");
      }
    };

    fetchEvaluasiKarakter();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/evaluasiKarakter/${id}`, formData);
      toast.success("Evaluasi Berhasil Diperbarui!");
      setTimeout(() => {
        navigate("/admin/karakter");
      }, 2000);
    } catch (error) {
      toast.error("Error updating evaluasi");
      console.error("Error updating evaluasi karakter:", error);
      setError("Gagal mengupdate evaluasi karakter.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/karakter");
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="py-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-bold text-center mb-8 font-dramatic-header">
            Edit Evaluasi Karakter
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
                htmlFor="judul_evaluasi"
              >
                Judul Evaluasi
              </label>
              <input
                type="text"
                id="judul_evaluasi"
                name="judul_evaluasi"
                value={formData.judul_evaluasi}
                onChange={handleChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Judul Evaluasi"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
                htmlFor="kekurangan"
              >
                Kekurangan
              </label>
              <textarea
                id="kekurangan"
                name="kekurangan"
                value={formData.kekurangan}
                onChange={handleChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Kekurangan"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
                htmlFor="evaluasi"
              >
                Evaluasi
              </label>
              <textarea
                id="evaluasi"
                name="evaluasi"
                value={formData.evaluasi}
                onChange={handleChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Evaluasi"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
                htmlFor="tanggal_evaluasi"
              >
                Tanggal Evaluasi
              </label>
              <input
                type="date"
                id="tanggal_evaluasi"
                name="tanggal_evaluasi"
                value={formData.tanggal_evaluasi}
                onChange={handleChange}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 font-dramatic-body-user text-lg mb-3"
            >
              Update Evaluasi
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

export default EditKarakter;
