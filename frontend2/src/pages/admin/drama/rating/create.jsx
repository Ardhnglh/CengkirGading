import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import api from "../../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const CreateRating = () => {
  const location = useLocation();
  const { id: userId } = useParams();
  const [parameters, setParameters] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); 
  const navigate = useNavigate();
  const userName = location.state?.userName || "User Tidak Diketahui";

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await api.get("/drama");
        setParameters(response.data);
      } catch (error) {
        console.error("Error fetching parameters:", error);
      }
    };
    fetchParameters();
  }, []);

  const handleRatingChange = (paramId, rating) => {
    setSelectedRatings((prevRatings) => ({
      ...prevRatings,
      [paramId]: rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ratings = parameters.map((param) => ({
      parameter_id: param.id,
      rating: selectedRatings[param.id] || 50, 
      tanggal_rating: selectedDate, 
    }));

    const data = {
      user_id: userId,
      ratings, 
    };

    try {
      await api.post("/user-rating", data);
      toast.success("Rating berhasil dibuat!");
      setTimeout(() => {
        navigate("/admin/drama");
      }, 2000);
    } catch (error) {
      toast.error("Error membuat rating. Silakan coba lagi.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/drama");
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="py-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl text-green-600 font-semibold text-center mb-4 font-dramatic-header">
            Buat User Rating
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex justify-center items-center mb-6">
                <label className="text-xl font-bold font-dramatic-subtitle text-gray-800 mr-2">
                  Pilih Rating Parameter
                </label>
                <p className="text-xl font-dramatic-header text-gray-900">
                  <span className="font-bold text-green-800">{userName}</span>
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-natural-body text-gray-700">
                  Tanggal Rating
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-auto font-natural-body text-sm px-4 py-2 border rounded-md focus:outline-none focus:border-green-400"
                  required
                />
              </div>

              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {parameters.map((param) => (
                  <div key={param.id} className="flex flex-col items-start">
                    <label className="block text-sm font-medium text-gray-700 font-dramatic-body-user">
                      {param.nama}
                    </label>

                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={selectedRatings[param.id] || 50}
                      onChange={(e) =>
                        handleRatingChange(param.id, e.target.value)
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-green"
                    />
                    <div className="mt-2 text-sm text-gray-500 font-dramatic-header">
                      {selectedRatings[param.id] || 50} / 100
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 font-dramatic-body-user text-lg mb-3"
              >
                Submit Rating
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 font-dramatic-body-user text-lg"
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

export default CreateRating;
