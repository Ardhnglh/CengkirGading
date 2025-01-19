import React, { useEffect, useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import api from "../../../services/api";
import { FaPrint } from "react-icons/fa";

const KalenderAcara = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/kalenderAcara");

        // Sort events by date in ascending order (upcoming first)
        const sortedEvents = response.data.sort((b, a) => {
          return new Date(a.tanggal_event) - new Date(b.tanggal_event);
        });

        setEvents(sortedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handlePrint = () => {
    const printContents =
      document.getElementById("printable-section").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload React state after print
  };

  const upcomingEvents = events.filter(
    (event) => new Date(event.tanggal_event) >= new Date()
  );

  return (
    <UserLayout>
      <div className="container mx-auto p-6 bg-white">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-dramatic-header text-3xl font-extrabold text-left text-green-800 underline underline-offset-2 decoration-green-800">
            Kalender Acara
          </h1>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
          >
            <FaPrint className="text-base" />
          </button>
        </div>

        {/* Semua Event Ditampilkan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
            const { day, month, year } = formatDate(event.tanggal_event);
            return (
              <div
                key={event.id}
                className="bg-white shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl rounded-lg"
              >
                <div>
                  <div className="relative">
                    <img
                      src={event.file_paths[0]}
                      alt={event.judul}
                      className="font-dramatic-header-user w-full h-56 object-cover cursor-pointer rounded-lg"
                      onClick={() => handleImageClick(event.file_paths[0])}
                    />
                    <div className="absolute top-4 left-4 bg-black text-white text-center p-2 rounded-lg">
                      <span className="block text-sm font-bold">{month}</span>
                      <span className="block text-2xl font-extrabold">
                        {day}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-dramatic-body-user text-lg font-bold text-gray-800 mt-2">
                      {event.judul}
                    </h3>
                    <p className="font-sans text-xs text-gray-600 text-justify mt-1">
                      {event.deskripsi}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-event-subtext text-sm text-green-700">
                    Tel-U Purwokerto {event.room}
                  </p>
                  <p className="text-xs text-green-700">
                    Event Date: {day} {month}, {year}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div id="printable-section" className="hidden">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold mb-4 font-dramatic-body">
              Upcoming Events
            </h2>
          </div>
          {upcomingEvents.map((event) => {
            const { day, month, year } = formatDate(event.tanggal_event);
            return (
              <div
                key={event.id}
                className="flex items-center gap-4 mb-8 border-b pb-4"
              >
                {/* Gambar di sebelah kiri */}
                <img
                  src={event.file_paths[0]}
                  alt={event.judul}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
                {/* Detail acara di sebelah kanan */}
                <div>
                  <h3 className="text-lg font-bold">{event.judul}</h3>
                  <p className="text-sm text-gray-600">
                    {day} {month}, {year}
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    {event.deskripsi}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out ${
              isModalOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`relative transform transition-transform duration-300 ease-in-out ${
                isModalOpen ? "scale-100" : "scale-95"
              }`}
            >
              <img
                src={selectedImage}
                alt="Selected event"
                className="w-full max-w-sm h-auto object-cover"
              />
              <button
                className="absolute top-2 right-2 bg-white text-black p-2 rounded-full focus:outline-none focus:ring-0"
                onClick={handleCloseModal}
              >
                <span className="text-black">✖</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default KalenderAcara;
