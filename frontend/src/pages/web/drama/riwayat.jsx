import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../../services/api";
import UserLayout from "../../../layouts/UserLayout";
import { Link } from "react-router-dom";

const Riwayat = () => {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);
  const [groupedRatings, setGroupedRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingsPerPage] = useState(10);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (userId) {
      api
        .get(`/userRating/user/rating/riwayat/${userId}`)
        .then((response) => {
          const data = response.data.data;
          setRatings(data);
          groupRatingsByDate(data);
        })
        .catch((err) => {
          setError(err.response?.data?.message || "Terjadi kesalahan");
        });
    } else {
      setError("User ID tidak ditemukan.");
    }
  }, [userId]);

  const groupRatingsByDate = (ratings) => {
    const grouped = ratings.reduce((acc, rating) => {
      const date = new Date(rating.tanggal_rating).toLocaleDateString("id-ID");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(rating);
      return acc;
    }, {});

    setGroupedRatings(Object.entries(grouped));
  };

  const indexOfLastRating = currentPage * ratingsPerPage;
  const indexOfFirstRating = indexOfLastRating - ratingsPerPage;
  const currentRatings = ratings.slice(indexOfFirstRating, indexOfLastRating);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    const totalPages = Math.ceil(ratings.length / ratingsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const totalPages = Math.ceil(ratings.length / ratingsPerPage);

  const calculateAverageRating = (ratings) => {
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return total / ratings.length;
  };

  return (
    <UserLayout>
      <div className="container mx-auto p-4">
        <Link
          to={`/user/drama/${userId}`}
          className="flex items-center text-green-700 mb-4 hover:text-green-900 font-event-subtext"
        >
          <FaArrowLeft className="mr-2" /> Kembali ke Perpustakaan Drama
        </Link>

        <h2 className="text-2xl text-green-700 font-dramatic-body-user font-semibold mb-4 text-center border-b pb-2">
          Riwayat Rating Anggota
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mt-4">
          <table className="table-auto w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border font-natural-body px-4 py-2 bg-gray-100 text-left">
                  Tanggal Rating
                </th>
                <th className="border font-natural-body px-4 py-2 bg-gray-100 text-left">
                  Nilai Parameter
                </th>
              </tr>
            </thead>
            <tbody>
              {groupedRatings.length > 0 ? (
                groupedRatings.map(([date, ratings], groupIndex) => {
                  const filteredRatings = ratings.filter((rating, index) => {
                    const indexInPage =
                      index >= indexOfFirstRating && index < indexOfLastRating;
                    return indexInPage;
                  });

                  if (filteredRatings.length > 0) {
                    return (
                      <React.Fragment key={date}>
                        <tr>
                          <td
                            className="border font-dramatic-header px-4 py-2 font-semibold text-xl text-green-800 bg-gray-200"
                            colSpan="2"
                          >
                            {date}
                          </td>
                        </tr>
                        {filteredRatings.map((rating, index) => (
                          <tr
                            key={index}
                            className={`hover:bg-gray-50 ${
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <td className="border px-4 py-2 font-natural-body">
                              {rating.drama?.nama}
                            </td>
                            <td className="border px-4 py-2 font-dramatic-header">
                              {rating.rating}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td
                            colSpan="2"
                            className="border px-4 py-2 text-center text-gray-700 font-natural-body font-bold"
                          >
                            Rata-rata Nilai:{" "}
                            {calculateAverageRating(filteredRatings).toFixed(2)}
                          </td>
                        </tr>
                        {groupIndex !== groupedRatings.length - 1 && (
                          <tr>
                            <td colSpan="2" className="h-4"></td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  } else {
                    return null;
                  }
                })
              ) : (
                <tr>
                  <td colSpan="2" className="border px-4 py-2 text-center">
                    Tidak ada rating ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={prevPage}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded hover:bg-gray-200 ${
                currentPage === index + 1
                  ? "bg-green-700 text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default Riwayat;
