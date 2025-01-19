import React, { useEffect, useState, useRef } from "react";
import UserLayout from "../../../layouts/UserLayout";
import api from "../../../services/api";
import { Radar } from "react-chartjs-2";
import { FaPrint, FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Drama = () => {
  const [dramaData, setDramaData] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartImage, setChartImage] = useState("");

  const userId = localStorage.getItem("id");
  const printRef = useRef();
  const chartRef = useRef();

  // Ambil data
  const fetchDramaData = async () => {
    try {
      const response = await api.get("/drama");
      setDramaData(response.data);
    } catch (error) {
      console.error("Error fetching drama data:", error);
    }
  };

  const fetchUserRatings = async () => {
    try {
      const response = await api.get(`/userRating/user/rating/${userId}`);
      setUserRatings(response.data);
    } catch (error) {
      console.error("Error fetching user ratings:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchDramaData();
      await fetchUserRatings();
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Tunggu hingga chart selesai di-render dan ambil sebagai gambar
    if (chartRef.current) {
      const image = chartRef.current.toBase64Image();
      setChartImage(image);
    }
  }, [userRatings]);

  if (loading) return <p>Loading...</p>;

  // Handle empty data
  const nilaiAktor1 =
    userRatings.length > 0
      ? userRatings.map((rating) => rating.rating)
      : Array(dramaData.length).fill(0);
  const rataRataNilai =
    nilaiAktor1.length > 0
      ? nilaiAktor1.reduce((a, b) => a + b, 0) / nilaiAktor1.length
      : 0;

  const data = {
    labels: dramaData.map((drama) => drama.nama),
    datasets: [
      {
        label: "Nilai Parameter",
        data: nilaiAktor1,
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Rata-Rata Nilai",
        data: Array(nilaiAktor1.length).fill(rataRataNilai),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrint = async () => {
    if (printRef.current) {
      const element = printRef.current;

      // Ambil tangkapan layar elemen
      const canvas = await html2canvas(element, {
        scale: 2, // Meningkatkan kualitas gambar
        useCORS: true, // Mendukung sumber gambar lintas domain
      });

      const imgData = canvas.toDataURL("image/png");

      // Inisialisasi jsPDF
      const pdf = new jsPDF("p", "mm", "a4");

      // Konversi ukuran elemen ke skala PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Tambahkan gambar ke PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Unduh PDF
      pdf.save("laporan-drama.pdf");
    }
  };

  return (
    <UserLayout>
      <div className="bg-white p-8 rounded-lg max-w-5xl mx-auto mt-2">
        <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 mb-4 underline underline-offset-2 decoration-green-800">
          Perpustakaan Drama
        </h1>

        {/* Deskripsi fitur */}
        <p className="text-gray-700 mb-8 text-base text-justify font-dramatic-body-user">
          Kami menyajikan laporan mendetail mengenai kinerja dan statistik
          individu dalam berbagai latihan. Data yang ditampilkan mencakup
          penilaian terhadap berbagai parameter penting seperti parameter yang
          sudah ada. Memberikan gambaran menyeluruh mengenai kemajuan dan
          keterampilan individu. Data yang dihimpun diolah dengan menggunakan
          metode SCRUM untuk memberikan wawasan yang lebih mendalam mengenai
          area kekuatan dan kesempatan perbaikan. Melalui fitur ini, kalian
          dapat dengan mudah memantau dan mengevaluasi pencapaian serta progres
          latihan dari waktu ke waktu.
        </p>

        <div ref={printRef}>
          <div className="w-full max-w-lg mx-auto mb-2">
            <Radar
              ref={chartRef}
              data={data}
              options={{ maintainAspectRatio: true }}
            />
          </div>

          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="p-4 text-left font-natural-body">Parameter</th>
                <th className="p-4 text-center font-dramatic-header">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {dramaData.map((drama, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="p-4 text-left font-natural-body">
                    {drama.nama}
                  </td>
                  <td className="p-4 text-center font-dramatic-header">
                    {nilaiAktor1[index] || 0}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-200">
                <td className="p-4 font-bold text-left font-natural-body">
                  Rata-Rata
                </td>
                <td className="p-4 font-bold text-center font-dramatic-header">
                  {rataRataNilai.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center mb-4">
          <button
            onClick={handlePrint}
            className="font-natural-body flex items-center text-gray-700 px-4 py-2 rounded-lg hover:text-gray-900 mr-4"
          >
            <FaPrint className="mr-2" />
            <span>Cetak laporan</span>
          </button>

          <div className="flex items-center">
            <FaHistory className="text-gray-700 text-xl mr-2" />
            <Link
              to={`/user/drama/riwayat/${userId}`}
              className="text-gray-700 text-sm font-natural-body hover:text-gray-900"
              onClick={handleScrollToTop}
            >
              Riwayat Nilai
            </Link>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Drama;
