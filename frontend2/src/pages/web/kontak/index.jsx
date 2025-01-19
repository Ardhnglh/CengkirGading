import React, { useState } from "react";
import UserLayout from "../../../layouts/UserLayout";
import { FaPaperPlane } from "react-icons/fa";

const Kontak = () => {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    const whatsappNumber = "6289602516060";
    const whatsappMessage = `Halo, saya ${name} dengan NIM ${nim}. Pesan saya: ${message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(url, "_blank");

    setName("");
    setNim("");
    setMessage("");
  };

  return (
    <UserLayout>
      <div className="bg-white min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center mb-10">
            <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 underline underline-offset-2 decoration-green-800">
              Kontak dan Dukungan
            </h1>
          </div>
          <p className="text-justify text-sm text-gray-600 mb-6 font-dramatic-body-user leading-relaxed">
            Silahkan hubungi kami jika ada yang perlu ditanyakan mengenai
            latihan, evaluasi, atau dukungan teknis lainnya. Website Pusat
            Latihan Cengkir Gading adalah platform yang didedikasikan untuk
            membantu anggota drama dalam mengembangkan kemampuan seni peran
            mereka. Kami menyediakan berbagai sumber daya, termasuk perpustakaan
            skenario, latihan harian, evaluasi karakter, dan banyak lagi. Jika
            Anda memiliki pertanyaan terkait materi latihan, evaluasi karakter,
            atau membutuhkan bantuan teknis untuk mengakses fitur yang ada,
            jangan ragu untuk menghubungi kami. Tim dukungan kami siap membantu
            Anda dengan segala kebutuhan yang berhubungan dengan pengembangan
            seni drama dan aktivitas yang tersedia di platform ini.
          </p>

          <div className="bg-gray-100 shadow-md rounded-lg p-8">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-dramatic-body-user text-gray-700">
                  Nama
                </label>
                <input
                  type="text"
                  className="text-sm font-dramatic-body-user mt-1 block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm duration-300 focus:border-green-400 hover:border-green-400 focus:outline-none"
                  placeholder="Nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="font-dramatic-body-user block text-sm font-medium text-gray-700">
                  NIM
                </label>
                <input
                  type="text"
                  className="text-sm font-dramatic-body-user mt-1 block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm duration-300 focus:border-green-400 hover:border-green-400 focus:outline-none"
                  placeholder="Nomor Induk Mahasiswa"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                />
              </div>

              <div>
                <label className="font-dramatic-body-user block text-base font-medium text-gray-700">
                  Pesan
                </label>
                <textarea
                  className="text-sm font-dramatic-body-user mt-1 block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm duration-300 focus:border-green-400 hover:border-green-400 focus:outline-none"
                  placeholder="Tuliskan pesan Anda"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button
                type="button"
                className="text-sm font-event-subtext w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center space-x-2 transform hover:scale-105 transition-transform"
                onClick={handleSendMessage}
              >
                <FaPaperPlane />
                <span>Kirim Pesan</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Kontak;
