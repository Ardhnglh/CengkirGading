import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { FaUsers, FaFileAlt, FaCalendarAlt, FaDumbbell } from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DashboardAdmin = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSkenario, setTotalSkenario] = useState(0);
  const [totalKalenderAcara, setTotalKalenderAcara] = useState(0);
  const [totalExercise, setTotalExercise] = useState(0);
  const [kalenderAcaraPerMonth, setKalenderAcaraPerMonth] = useState([]);
  const [skenarioPerMonth, setSkenarioPerMonth] = useState([]);

  const [animatedUsers, setAnimatedUsers] = useState(0);
  const [animatedSkenario, setAnimatedSkenario] = useState(0);
  const [animatedKalenderAcara, setAnimatedKalenderAcara] = useState(0);
  const [animatedExercise, setAnimatedExercise] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await api.get("/user/count/total");
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    const fetchTotalSkenario = async () => {
      try {
        const response = await api.get("/skenario/count/month");
        setTotalSkenario(response.data.totalSkenario);
      } catch (error) {
        console.error("Error fetching total skenario:", error);
      }
    };

    const fetchTotalKalenderAcara = async () => {
      try {
        const response = await api.get(
          "/kalenderAcara/mounth/this-month/total"
        );
        setTotalKalenderAcara(response.data.totalKalenderAcara);
      } catch (error) {
        console.error("Error fetching total acara bulan ini:", error);
      }
    };

    const fetchTotalExercise = async () => {
      try {
        const response = await api.get("/daily-exercise/all/exercise");
        setTotalExercise(response.data.total);
      } catch (error) {
        console.error("Error fetching total exercise:", error);
      }
    };

    const fetchKalenderAcaraPerMonth = async () => {
      try {
        const response = await api.get("/kalenderAcara/per-month/total");
        const kalenderData = response.data["2024"];
        const formattedData = Object.keys(kalenderData).map((month) => ({
          name: monthNames[parseInt(month) - 1],
          KalenderAcara: kalenderData[month].length,
        }));
        setKalenderAcaraPerMonth(formattedData);
      } catch (error) {
        console.error("Error fetching kalender acara per bulan:", error);
      }
    };

    const fetchSkenarioPerMonth = async () => {
      try {
        const response = await api.get("/skenario/count/month/year");
        const skenarioData = response.data.totalSkenarioPerMonth;
        const formattedData = Object.keys(skenarioData).map((month) => ({
          name: monthNames[parseInt(month) - 1],
          Skenario: skenarioData[month],
        }));
        setSkenarioPerMonth(formattedData);
      } catch (error) {
        console.error("Error fetching skenario per bulan:", error);
      }
    };

    fetchTotalUsers();
    fetchTotalSkenario();
    fetchTotalKalenderAcara();
    fetchTotalExercise();
    fetchKalenderAcaraPerMonth();
    fetchSkenarioPerMonth();
  }, []);

  const chartData = kalenderAcaraPerMonth.map((acaraData) => {
    const skenarioData = skenarioPerMonth.find(
      (skenario) => skenario.name === acaraData.name
    );
    return {
      name: acaraData.name,
      KalenderAcara: acaraData.KalenderAcara || 0,
      Skenario: skenarioData ? skenarioData.Skenario : 0,
    };
  });

  useEffect(() => {
    if (totalUsers) {
      animateNumber(totalUsers, setAnimatedUsers);
    }
    if (totalSkenario) {
      animateNumber(totalSkenario, setAnimatedSkenario);
    }
    if (totalKalenderAcara) {
      animateNumber(totalKalenderAcara, setAnimatedKalenderAcara);
    }
    if (totalExercise) {
      animateNumber(totalExercise, setAnimatedExercise);
    }
  }, [totalUsers, totalSkenario, totalKalenderAcara, totalExercise]);

  // Fungsi animasi angka
  const animateNumber = (target, setState) => {
    let current = 0;
    const increment = Math.ceil(target / 300);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setState(target);
        clearInterval(interval);
      } else {
        setState(current);
      }
    }, 200);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-blue-100">
        <nav className="flex justify-between items-center bg-blue-600 p-4 text-white">
          <h1 className="text-2xl font-dramatic-header-user font-bold">
            Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <p className="text-lg font-semibold text-white font-dramatic-body-user">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </nav>

        {/* Dashboard content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Card 1 - Total Users */}
            <div className="bg-white p-4 rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 font-event-header">
                    Total Users
                  </p>
                  <h2 className="text-2xl font-bold font-dramatic-header">
                    {animatedUsers}
                  </h2>
                  <p className="text-green-500 font-dramatic-header">
                    Registered Users
                  </p>
                </div>
                <FaUsers className="text-4xl text-red-500 bg-red-100 p-2 rounded-full" />
              </div>
            </div>

            {/* Card 2 - Skenario Bulan Ini */}
            <div className="bg-white p-4 rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 font-event-header">
                    Skenario Bulan ini
                  </p>
                  <h2 className="text-2xl font-bold font-dramatic-header">
                    {animatedSkenario}
                  </h2>
                  <p className="text-green-500 font-dramatic-header">
                    Latest Scenario
                  </p>
                </div>
                <FaFileAlt className="text-4xl text-purple-500 bg-purple-100 p-2 rounded-full" />
              </div>
            </div>

            {/* Card 3 - Acara Bulan Ini */}
            <div className="bg-white p-4 rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 font-event-header">
                    Acara Bulan ini
                  </p>
                  <h2 className="text-2xl font-bold font-dramatic-header">
                    {animatedKalenderAcara}
                  </h2>
                  <p className="text-green-500 font-dramatic-header">
                    News Event
                  </p>
                </div>
                <FaCalendarAlt className="text-4xl text-green-500 bg-green-100 p-2 rounded-full" />
              </div>
            </div>

            {/* Card 4 - Total Exercise */}
            <div className="bg-white p-4 rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 font-event-header">
                    Total Exercise
                  </p>
                  <h2 className="text-2xl font-bold font-dramatic-header">
                    {animatedExercise}
                  </h2>
                  <p className="text-green-500 font-dramatic-header">
                    All Exercise
                  </p>
                </div>
                <FaDumbbell className="text-4xl text-orange-500 bg-orange-100 p-2 rounded-full" />
              </div>
            </div>
          </div>

          {/* Sales Overview Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 font-dramatic-header">
              Chart Overflow
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="colorKalenderAcara"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorSkenario"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="KalenderAcara"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorKalenderAcara)"
                />
                <Area
                  type="monotone"
                  dataKey="Skenario"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorSkenario)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardAdmin;
