import React from "react";
import WebLayout from "../../layouts/BerandaLayout";

const Beranda = () => {
  return (
    <WebLayout>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start min-h-screen bg-white px-4 lg:px-0">
        {/* Bagian Logo */}
        <div className="flex-1 flex justify-center items-center lg:items-start mt-5 lg:mt-0">
          <img
            src="/logo2.png"
            alt="Cengkir Gading Logo"
            className="w-48 sm:w-60 md:w-72 h-auto"
          />
        </div>

        {/* Bagian Konten */}
        <div className="flex-1 max-w-full lg:max-w-2xl p-6 lg:p-8 mt-8 lg:mt-12">
          <h2 className="font-dramatic-header text-green-700 text-xl sm:text-2xl lg:text-3xl font-bold mb-4 border-b border-gray-400 inline-block pb-0.5">
            Menjelajah Karakter, Menghidupkan Kisah
          </h2>

          <p className="font-dramatic-body text-gray-600 mb-4 text-base sm:text-lg">
            Mengasah Kemampuan Akting, Menggali Potensi, dan Menghidupkan Setiap
            Karakter dengan Dedikasi Penuh di Atas Panggung.
          </p>

          {/* Tombol Login dan Signup */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <a href="/login" className="w-full">
              <button className="w-full py-2 text-base sm:text-lg lg:text-xl font-dramatic-body bg-green-500 text-white font-bold rounded hover:bg-green-600 transition">
                Login
              </button>
            </a>
            <a href="/signup" className="w-full">
              <button className="w-full py-2 text-base sm:text-lg lg:text-xl font-dramatic-body bg-green-500 text-white font-bold rounded hover:bg-green-600 transition">
                Sign Up
              </button>
            </a>
          </div>

          {/* Quote Section */}
          <p className="font-dramatic-body text-gray-700 text-sm lg:text-base text-justify">
            “Di Pusat Latihan Drama Cengkir Gading, setiap aktor tidak hanya
            belajar menghafal naskah, tetapi juga menguasai seni mendalam dalam
            menghidupkan karakter di atas panggung. Melalui bimbingan yang penuh
            dedikasi, kami menggali potensi tersembunyi dalam diri Anda,
            mengasah kemampuan akting, improvisasi, dan kolaborasi tim yang
            solid. Setiap sesi latihan dirancang untuk memupuk kepercayaan diri,
            memperkuat apresiasi terhadap seni, dan menyempurnakan keterampilan
            teknis seperti desain kostum dan panggung, penyutradaraan, hingga
            penulisan naskah. Kami percaya bahwa panggung adalah cermin dari
            kehidupan, dan bersama-sama”
          </p>
        </div>
      </div>
    </WebLayout>
  );
};

export default Beranda;
