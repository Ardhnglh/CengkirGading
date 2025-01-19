import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaUser,
  FaPhone,
  FaPaperPlane,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";

const BerandaLayout = ({ children }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (path) => {
    setActiveLink(path);
    setIsMenuOpen(false);
    handleScrollToTop();
  };

  const handleScrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#2e9e46] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white py-2 px-2 shadow-sm sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="/"
            className={`mx-4 font-bold transition-colors duration-300 flex items-center ${
              activeLink === "/"
                ? "text-[#0B771D] text-xl"
                : "text-gray-800 text-xl"
            } hover:text-[#0B771D]`}
            onClick={() => handleClick("/")}
          >
            <FaHome className="mr-1 hidden md:block" />
            <span className="hidden md:inline  font-dramatic-body">
              Beranda
            </span>
          </a>
        </div>

        <div className="flex justify-center items-center">
          <a href="/">
            <img
              src="/logo1.png"
              alt="Company Logo"
              className="w-44 h-auto md:w-44 md:ml-32"
            />
          </a>
        </div>

        {/* Links di layar besar */}
        <div className="hidden md:flex items-center">
          <a
            href="/login"
            className={`mx-4 font-bold transition-colors duration-300 flex items-center  font-dramatic-body ${
              activeLink === "/login"
                ? "text-[#0B771D] text-xl"
                : "text-gray-800 text-xl"
            } hover:text-[#0B771D]`}
            onClick={() => handleClick("/login")}
          >
            <FaSignInAlt className="mr-1" />
            Login
          </a>
          <a
            href="/signup"
            className={`mx-4 font-bold transition-colors duration-300 flex items-center font-dramatic-body ${
              activeLink === "/signup"
                ? "text-[#0B771D] text-xl"
                : "text-gray-800 text-xl"
            } hover:text-[#0B771D]`}
            onClick={() => handleClick("/signup")}
          >
            <FaUserPlus className="mr-1" />
            Sign up
          </a>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            className={`text-gray-800 hover:text-[#0B771D] focus:outline-none transition-transform duration-300 ${
              isMenuOpen ? "rotate-180" : "rotate-0"
            }`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`fixed top-0 right-0 h-full bg-white shadow-md py-4 z-50 transition-transform duration-500 ease-in-out transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } w-1/2 flex flex-col items-center space-y-4`}
          >
            <div className="w-full flex justify-end px-4">
              <button
                className="text-gray-800 hover:text-[#0B771D] focus:outline-none"
                onClick={toggleMenu}
              >
                <FaTimes size={28} />
              </button>
            </div>

            <a
              href="/"
              className={`font-bold transition-colors duration-300 flex items-center font-dramatic-body ${
                activeLink === "/"
                  ? "text-[#0B771D] text-lg"
                  : "text-gray-800 text-lg"
              } hover:text-[#0B771D]`}
              onClick={() => handleClick("/")}
            >
              <FaHome className="mr-1" />
              Beranda
            </a>
            <a
              href="/login"
              className={`font-bold transition-colors duration-300 flex items-center font-dramatic-body ${
                activeLink === "/login"
                  ? "text-[#0B771D] text-lg"
                  : "text-gray-800 text-lg"
              } hover:text-[#0B771D]`}
              onClick={() => handleClick("/login")}
            >
              <FaSignInAlt className="mr-1" />
              Login
            </a>
            <a
              href="/signup"
              className={`font-bold transition-colors duration-300 flex items-center font-dramatic-body ${
                activeLink === "/signup"
                  ? "text-[#0B771D] text-lg"
                  : "text-gray-800 text-lg"
              } hover:text-[#0B771D]`}
              onClick={() => handleClick("/signup")}
            >
              <FaUserPlus className="mr-1" />
              Sign up
            </a>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer>
        <div className="bg-custom-gray py-4 px-4 text-white mt-auto shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:space-x-6 space-y-6 md:space-y-0">
            {/* Section Ajakan Bergabung */}
            <div className="w-full md:w-1/3">
              <h2 className="text-xl font-footer-heading font-bold mb-4">
                Silahkan Daftar dan Bergabung dengan Kami!
              </h2>
              <div className="flex items-center space-x-4">
                <p className="text-gray-400 text-sm font-footer-body">
                  Dapatkan berita terbaru, pelatihan, dan informasi acara
                  langsung dari kami!
                </p>
              </div>
              <div className="flex items-start py-4">
                <a
                  href="/signup"
                  onClick={handleScrollToTop}
                  className="text-sm py-2 rounded-lg font-bold text-white hover:text-green-700 flex items-center"
                >
                  <FaUser className="mr-2 text-sm" /> Gabung
                </a>
              </div>

              <p className="text-xs text-gray-400 font-footer-body">
                By signing up, you agree to our{" "}
                <a
                  href="/"
                  onClick={handleScrollToTop}
                  className="underline text-green-900 hover:text-green-700"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            {/* Section Info Kontak */}
            <div className="w-full md:w-1/3 flex justify-center items-center mt-4 md:mt-0">
              <img src="/logo.png" alt="Footer Logo" className="w-24 h-auto" />
              <div className="ml-4 text-left">
                <p className="font-footer-body text-sm">
                  Jl. DI Panjaitan No.128, Karangreja, Purwokerto Kidul
                </p>
                <p className="font-footer-body text-sm">
                  Kec. Purwokerto Sel., Kabupaten Banyumas
                </p>
                <p className="mt-2 text-gray-400 flex items-center font-footer-body">
                  <FaPhone className="mr-2 text-sm" />
                  (628) 7770-8333-47
                </p>
                <button
                  className="bg-green-800 text-sm hover:bg-green-900 px-3 py-2 rounded-md mt-4 text-white flex items-center"
                  onClick={() =>
                    window.open(
                      "https://wa.me/6287770833347?text=Halo%20Admin%2C%20saya%20mau%20bertanya...",
                      "_blank"
                    )
                  }
                >
                  <FaPaperPlane className="mr-2 text-sm" /> Contact
                </button>
              </div>
            </div>

            {/* Section Media Sosial */}
            <div className="w-full md:w-1/4 text-center">
              <h2 className="text-xl font-footer-heading mb-4">Follow Us</h2>
              <div className="flex justify-center space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-700"
                >
                  <FaFacebookF size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-700"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-700"
                >
                  <FaLinkedinIn size={24} />
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-700"
                >
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black py-2">
          <div className="container mx-auto text-center text-gray-500 text-xs font-footer-body">
            <span className="mr-2">
              © 2024 Cengkir Gading. All rights reserved.
            </span>

            <a
              href="/"
              onClick={handleScrollToTop}
              className="underline hover:text-white"
            >
              Privacy Policy
            </a>
            <span className="mx-2">•</span>
            <a
              href="/"
              onClick={handleScrollToTop}
              className="underline hover:text-white"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BerandaLayout;
