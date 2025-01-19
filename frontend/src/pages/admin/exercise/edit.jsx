import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const EditExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await api.get(`/daily-exercise/${id}`);
        const { judul, deskripsi, tipe, file_path } = response.data;

        const filesArray = Array.isArray(file_path)
          ? file_path
          : typeof file_path === "string"
          ? file_path.split(",")
          : [];

        setExistingFiles(filesArray);
        setValue("judul", judul);
        setValue("deskripsi", deskripsi);
        setValue("tipe", tipe);
      } catch (error) {
        console.error("Error fetching exercise data", error);
        setError("Failed to load exercise data");
      }
    };

    fetchExercise();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("judul", data.judul);
      formData.append("deskripsi", data.deskripsi);
      formData.append("tipe", data.tipe);

      files.forEach((file) => {
        formData.append("file", file);
      });

      await api.put(`/daily-exercise/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Exercise Berhasil Diperbarui!");
      setTimeout(() => {
        navigate("/admin/exercise");
      }, 2000);
    } catch (error) {
      toast.error("Error updating exercise");
      console.error("Error updating exercise", error);
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const getFileName = (url) => {
    try {
      const urlObject = new URL(url);
      return urlObject.pathname.split("/").pop();
    } catch (e) {
      console.error("Invalid URL", e);
      return "";
    }
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="py-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-bold font-dramatic-header text-center mb-8">
            Edit Exercise
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="judul"
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
              >
                Judul
              </label>
              <input
                id="judul"
                {...register("judul")}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Judul"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="deskripsi"
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
              >
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                {...register("deskripsi")}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                placeholder="Deskripsi"
                rows="4"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="tipe"
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
              >
                Tipe
              </label>
              <select
                id="tipe"
                {...register("tipe")}
                className="text-gray-600 w-full px-4 py-2 border focus:border-green-400 hover:border-green-500 focus:outline-none rounded-md"
                required
              >
                <option value="Artikel">Artikel</option>
                <option value="Buku">Buku</option>
                <option value="Teori-teori Akting">Teori-teori Akting</option>
                <option value="Video Tutorial">Video Tutorial</option>
              </select>
            </div>

            {existingFiles.length > 0 && (
              <div className="mb-4">
                <label className="block text-green-700 font-semibold font-dramatic-subtitle mb-2">
                  File Sebelumnya
                </label>
                <div className="flex flex-col gap-2">
                  {existingFiles.map((file, index) => (
                    <a
                      key={index}
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {getFileName(file)}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-gray-700 font-semibold font-dramatic-subtitle mb-2"
              >
                Upload File Baru
              </label>
              <input
                type="file"
                id="file"
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
                Update Exercise
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/exercise")}
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

export default EditExercise;
