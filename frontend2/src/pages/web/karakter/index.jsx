import React, { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import api from "../../../services/api";

const EvaluasiKarakter = () => {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("id");

  const fetchEvaluationByUserId = async (userId) => {
    try {
      const response = await api.get(`/evaluasiKarakter/user/${userId}`);
      if (response.data.message) {
        setMessage(response.data.message);
        setEvaluation([]);
      } else {
        setEvaluation(response.data);
      }
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchEvaluationByUserId(userId);
    }
  }, [userId]);

  if (loading)
    return (
      <UserLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-green-700 font-semibold text-lg">Loading...</div>
        </div>
      </UserLayout>
    );
  if (error)
    return (
      <UserLayout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500 font-semibold text-lg">Error: {error}</p>
        </div>
      </UserLayout>
    );

  return (
    <UserLayout>
      <div className="bg-white min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center mb-10">
            <h1 className="font-dramatic-header text-3xl font-extrabold text-green-900 underline underline-offset-4 decoration-green-700">
              Evaluasi Karakter Anggota
            </h1>
          </div>

          {message && (
            <div className="bg-green-700 text-white p-4 text-center mb-6 rounded-md shadow-md">
              {message}
            </div>
          )}

          {evaluation && evaluation.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {evaluation.map((evalItem) => (
                <div
                  key={evalItem.id}
                  className="relative bg-gray-50 border-l-4 border-green-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Tanggal Evaluasi */}
                  <p className="text-xs font-event-body text-gray-500 text-center mb-3">
                    {new Date(evalItem.tanggal_evaluasi).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>

                  {/* Judul Evaluasi */}
                  <h2 className="text-lg font-bold font-natural-body text-green-900 mb-4 text-center">
                    {evalItem.judul_evaluasi}
                  </h2>

                  {/* Kekurangan */}
                  <div className="mb-4">
                    <h3 className="text-sm font-natural-body font-semibold text-green-700 mb-2">
                      Kekurangan
                    </h3>
                    <ul className="list-disc font-serif pl-4 text-sm text-gray-700 space-y-1">
                      {evalItem.kekurangan
                        ?.split("\n")
                        .map((weakness, index) => (
                          <li key={index}>{weakness}</li>
                        ))}
                    </ul>
                  </div>

                  {/* Evaluasi */}
                  <div>
                    <h3 className="text-sm font-natural-body font-semibold text-green-700 mb-2">
                      Evaluasi yang Harus Dilakukan
                    </h3>
                    <ul className="list-disc font-serif pl-4 text-sm text-gray-700 space-y-1">
                      {evalItem.evaluasi
                        ?.split("\n")
                        .map((improvement, index) => (
                          <li key={index}>{improvement}</li>
                        ))}
                    </ul>
                  </div>

                  {/* Decorative Line */}
                  <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-400 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-10">
              Tidak ada data evaluasi untuk ditampilkan. Silakan tambahkan
              evaluasi terlebih dahulu.
            </p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default EvaluasiKarakter;
