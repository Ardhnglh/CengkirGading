import React, { useState, useEffect } from "react";
import {
  FaDoorOpen,
  FaChevronDown,
  FaBook,
  FaRunning,
  FaTheaterMasks,
  FaCalendarAlt,
  FaPhone,
  FaUserCheck,
  FaSignOutAlt,
  FaArrowUp,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const UserLayout = ({ children }) => {
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const navigate = useNavigate();
  const nama = localStorage.getItem("nama");
  const nim = localStorage.getItem("nim");
  const id = localStorage.getItem("id");

  const toggleExerciseLibrary = () => {
    setIsExerciseOpen(!isExerciseOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nim");
    localStorage.removeItem("nama");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/login");
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (activeLink.includes("/user/daily-exercise")) {
      setIsExerciseOpen(true);
    } else {
      setIsExerciseOpen(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeLink]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-3 py-2 fixed top-0 left-0 right-0 z-10 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold flex items-center space-x-2 font-dramatic-header-user">
            <Link
              to="/user/drama/:id"
              className="flex items-center space-x-2"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <FaDoorOpen className="text-green-600 text-2xl" />
              <span>Welcome To Cengkir Gading</span>
            </Link>
          </div>

          <div className="flex items-center mr-14">
            <Link to="/user/drama/:id">
              <img
                src="/logo1.png"
                alt="Logo"
                className="w-48 h-auto"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ maxWidth: "none", maxHeight: "none" }}
              />
            </Link>
          </div>
          <div className="flex items-center space-x-2 font-sidebar-menu ">
            <Link
              to="/user/drama/:id"
              className="text-green-600"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {nim || "Unknown User"}
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-green-700 "
            >
              <FaSignOutAlt className="text-xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="bg-white shadow-xl border-r border-gray-500 h-full overflow-y-auto">
          <div className="p-4 flex flex-col items-center mt-6">
            <div className="mt-2 text-gray-700 font-bold text-base font-sidebar-heading">
              {nama || "Unknown User"}
            </div>
            <Link
              to="/user/drama/:id"
              className="text-sm text-green-600 mt-1 font-sidebar-menu"
            >
              {nim || "Unknown User"}
            </Link>
            <div className="w-full mt-2 border-b-2 border-gray-600"></div>
          </div>

          <nav className="p-4">
            <ul>
              {/* Drama Library */}
              <li className="mb-3">
                {id && (
                  <Link
                    to={`/user/drama/${id}`}
                    className={`text-gray-700 text-sm border-b-2 border-green-700 font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 ${
                      activeLink === `/user/drama/${id}`
                        ? "bg-green-700 text-white"
                        : "hover:bg-green-700 hover:text-white"
                    }`}
                    onClick={() => {
                      handleLinkClick(`/user/drama/${id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <FaTheaterMasks className="mr-3 text-xl" />
                    <span>Perpustakaan Drama</span>
                  </Link>
                )}
              </li>

              {/* Daily Exercise */}
              <li className="mb-2">
                <Link
                  to="/user/daily-exercise"
                  className={`text-gray-700 border-b-2 border-green-700 text-sm font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 ${
                    activeLink === "/user/daily-exercise" || isExerciseOpen
                      ? "bg-green-700 text-white"
                      : "hover:bg-green-700 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleExerciseLibrary();
                    handleLinkClick("/user/daily-exercise");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <FaRunning className="mr-3 text-base" />
                  <span>Daily Exercise</span>
                  <FaChevronDown
                    className={`ml-auto transition-transform ${
                      isExerciseOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </Link>

                {/* Sub-menu */}
                <ul
                  className={`ml-8 mt-2 space-y-2 transition-all duration-300 ease-in-out ${
                    isExerciseOpen
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <li>
                    <Link
                      to="/user/daily-exercise/artikel"
                      className={`text-gray-700 text-sm font-sidebar-menu flex items-center px-2 py-2 rounded transition duration-300 border-b-2 border-green-700 ${
                        activeLink === "/user/daily-exercise/artikel"
                          ? "bg-green-700 text-white"
                          : "hover:bg-green-700 hover:text-white"
                      }`}
                      onClick={() =>
                        handleLinkClick("/user/daily-exercise/artikel")
                      }
                    >
                      Artikel
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/daily-exercise/buku"
                      className={`text-gray-700 text-sm font-sidebar-menu flex items-center px-2 py-2 rounded transition duration-300 border-b-2 border-green-700 ${
                        activeLink === "/user/daily-exercise/buku"
                          ? "bg-green-700 text-white"
                          : "hover:bg-green-700 hover:text-white"
                      }`}
                      onClick={() =>
                        handleLinkClick("/user/daily-exercise/buku")
                      }
                    >
                      Buku
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/daily-exercise/akting"
                      className={`text-gray-700 text-sm font-sidebar-menu flex items-center px-2 py-2 rounded transition duration-300 border-b-2 border-green-700 ${
                        activeLink === "/user/daily-exercise/akting"
                          ? "bg-green-700 text-white"
                          : "hover:bg-green-700 hover:text-white"
                      }`}
                      onClick={() =>
                        handleLinkClick("/user/daily-exercise/akting")
                      }
                    >
                      Teori-teori Akting
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/daily-exercise/video"
                      className={`text-gray-700 text-sm font-sidebar-menu flex items-center px-2 py-2 rounded transition duration-300 border-b-2 border-green-700 ${
                        activeLink === "/user/daily-exercise/video"
                          ? "bg-green-700 text-white"
                          : "hover:bg-green-700 hover:text-white"
                      }`}
                      onClick={() =>
                        handleLinkClick("/user/daily-exercise/video")
                      }
                    >
                      Video
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Perpustakaan Skenario */}
              <li className="mb-2">
                <Link
                  to="/user/skenario"
                  className={`text-sm text-gray-700 border-b-2 border-green-700 font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 ${
                    activeLink === "/user/skenario"
                      ? "bg-green-700 text-white"
                      : "hover:bg-green-700 hover:text-white"
                  }`}
                  onClick={() => {
                    handleLinkClick("/user/skenario");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <FaBook className="mr-3 text-base" />
                  <span>Perpustakaan Skenario</span>
                </Link>
              </li>

              {/* Evaluasi Karakter */}
              {id && (
                <li className="mb-2">
                  <Link
                    to={`/user/evaluasi-karakter/${id}`}
                    className={`text-sm text-gray-700 border-b-2 border-green-700 font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 ${
                      activeLink === `/user/evaluasi-karakter/${id}`
                        ? "bg-green-700 text-white"
                        : "hover:bg-green-700 hover:text-white"
                    }`}
                    onClick={() => {
                      handleLinkClick(`/user/evaluasi-karakter/${id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <FaUserCheck className="mr-3 text-base" />
                    <span>Evaluasi Karakter</span>
                  </Link>
                </li>
              )}

              {/* Kalender Acara */}
              <li className="mb-2">
                <Link
                  to="/user/kalender-acara"
                  className={`text-sm text-gray-700 border-b-2 border-green-700 font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 ${
                    activeLink === "/user/kalender-acara"
                      ? "bg-green-700 text-white"
                      : "hover:bg-green-700 hover:text-white"
                  }`}
                  onClick={() => {
                    handleLinkClick("/user/kalender-acara");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <FaCalendarAlt className="mr-3 text-base" />
                  <span>Kalender Acara</span>
                </Link>
              </li>

              {/* Kontak */}
              <li className="mb-2">
                <Link
                  to="/user/kontak"
                  className={`text-sm text-gray-700 border-b-2 border-green-700 font-sidebar-menu font-bold flex items-center px-2 py-2 rounded transition duration-300 ${
                    activeLink === "/user/kontak"
                      ? "bg-green-700 text-white"
                      : "hover:bg-green-700 hover:text-white"
                  }`}
                  onClick={() => {
                    handleLinkClick("/user/kontak");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <FaPhone className="mr-3 text-base" />
                  <span>Kontak & Dukungan</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 mt-6">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 shadow-md py-4 border-t border-gray-300">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <Link to="/user/drama/:id" onClick={scrollToTop}>
              <img
                src="/logo2.png"
                alt="Logo"
                className="w-36 mb-2 cursor-pointer"
              />
            </Link>
            <p className="text-white text-sm text-center md:text-left font-dramatic-body-user">
              © 2024 Pusat Latihan Drama Cengkir Gading. All rights reserved.
            </p>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-black mb-2 font-dramatic-header">
              Our Menu
            </h3>
            <ul className="space-y-2 font-dramatic-body">
              <li>
                <Link
                  to="/user/drama/:id"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Perpustakaan Drama
                </Link>
              </li>
              <li>
                <Link
                  to="/user/daily-exercise/artikel"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Daily Exercise
                </Link>
              </li>
              <li>
                <Link
                  to="/user/skenario"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Perpustakaan Skenario
                </Link>
              </li>
              <li>
                <Link
                  to="/user/evaluasi-karakter/${id}"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Evaluasi Karakter
                </Link>
              </li>
              <li>
                <Link
                  to="/user/kalender-acara"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Kalender Acara
                </Link>
              </li>
              <li>
                <Link
                  to="/user/kontak"
                  className="text-white hover:text-gray-700"
                  onClick={scrollToTop}
                >
                  Kontak dan Dukungan
                </Link>
              </li>
            </ul>
          </div>

          {/* Operational Hours Section */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-black mb-2 font-dramatic-header">
              Jam Operasional
            </h3>
            <p className="text-white font-dramatic-body-user">Senin-Jumat</p>
            <p className="text-white font-dramatic-body-user">16:00 - 18:00</p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-black mb-2 font-dramatic-header">
              Kontak Kami
            </h3>
            <p className="text-white font-dramatic-body">Ardhana@gmail.com</p>
            <p className="text-white font-dramatic-body">PusatDramaITTP</p>
            <p className="text-white font-dramatic-body">089602516060</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-7 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-base" />
        </button>
      )}
    </div>
  );
};

export default UserLayout;
