import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import api from "../../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const EditRating = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ratingMap, setRatingMap] = useState({});
  const [tanggalRating, setTanggalRating] = useState("");
  const location = useLocation();
  const userName = location.state?.userName || "User Tidak Diketahui";

  const fetchUserRating = async () => {
    try {
      const formattedTanggalRating = tanggalRating
        ? tanggalRating
        : new Date().toISOString().split("T")[0];

      const response = await api.get("/user-rating/rating/user/tanggal", {
        params: { user_id: id, tanggal_rating: formattedTanggalRating },
      });

      const data = response.data.data;

      if (data.length > 0) {
        setUserRating(data);

        const date = new Date(data[0].tanggal_rating);
        setTanggalRating(date.toISOString().split("T")[0]);

        const ratings = data.reduce((acc, item) => {
          acc[item.parameter_id] = item.rating;
          return acc;
        }, {});
        setRatingMap(ratings);
      } else {
        console.log("Tidak ada data rating untuk user_id:", id);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error in API call:", err);
      setError(err.response ? err.response.data.error : "Error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRating();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Pastikan tanggal dalam format 'YYYY-MM-DD'
    const formattedTanggalRating = tanggalRating
      ? tanggalRating
      : new Date().toISOString().split("T")[0]; // fallback jika kosong, tanggal hari ini

    console.log("Tanggal Rating yang akan dikirim:", formattedTanggalRating); // cek format tanggal

    try {
      const ratings = userRating.map((ratingData) => ({
        parameter_id: ratingData.parameter_id,
        rating: Number(ratingMap[ratingData.parameter_id] || ratingData.rating),
        tanggal_rating: formattedTanggalRating, // pastikan dalam format yang benar
      }));

      console.log("Data yang akan dikirim:", {
        user_id: id,
        ratings,
      });

      // Kirim data ke backend
      await api.put("/user-rating/update/rating", {
        user_id: id,
        ratings,
      });

      toast.success("Rating Berhasil Diperbarui!");
      setTimeout(() => {
        navigate("/admin/drama");
      }, 2000);
    } catch (err) {
      toast.error("Error updating rating");
      console.error("Error updating rating:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="py-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-semibold text-center mb-2 font-dramatic-header">
            Edit User Rating
          </h2>

          <p className="text-xl text-center font-dramatic-header text-gray-700 mb-6">
            <span className="font-bold text-green-800">{userName}</span>
          </p>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label
                htmlFor="tanggal-rating"
                className="block text-lg font-natural-body text-gray-700"
              >
                Edit Tanggal Rating
              </label>
              <input
                id="tanggal-rating"
                type="date"
                value={tanggalRating}
                onChange={(e) => {
                  const newDate = e.target.value; // tanggal dalam format YYYY-MM-DD
                  setTanggalRating(newDate); // simpan dalam state tanggalRating
                  console.log("Tanggal Rating yang dipilih:", newDate); // cek formatnya
                }}
                className="w-auto font-natural-body text-sm px-4 py-2 border rounded-md focus:outline-none focus:border-green-400"
              />
            </div>

            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {userRating.map((ratingData) => (
                <div
                  key={ratingData.parameter_id}
                  className="flex flex-col items-start font-dramatic-header"
                >
                  <label
                    htmlFor={`rating-${ratingData.parameter_id}`}
                    className="block text-sm font-medium text-gray-700 font-dramatic-header"
                  >
                    {ratingData.drama.nama}:
                  </label>
                  <input
                    id={`rating-${ratingData.parameter_id}`}
                    type="range"
                    min="1"
                    max="100"
                    value={ratingMap[ratingData.parameter_id] || 50}
                    onChange={(e) =>
                      setRatingMap((prev) => ({
                        ...prev,
                        [ratingData.parameter_id]: e.target.value,
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-green"
                  />
                  <p>{ratingMap[ratingData.parameter_id] || 50} / 100</p>
                </div>
              ))}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-green-700 font-dramatic-body-user py-2 px-4 rounded-md hover:bg-green-800 text-lg mb-3 text-white"
              >
                Update Rating
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/drama")}
                className="w-full bg-blue-600 text-white font-dramatic-body-user py-2 px-4 rounded-md hover:bg-blue-800 text-lg"
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

export default EditRating;
