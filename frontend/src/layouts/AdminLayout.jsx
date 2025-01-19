import React, { useState } from "react";
import api from "../services/api";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaUser,
  FaTasks,
  FaWpforms,
  FaTable,
  FaHome,
  FaSignOutAlt,
  FaChevronLeft,
} from "react-icons/fa";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const nama = localStorage.getItem("nama");
  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    try {
      await api.post("/logout");

      localStorage.removeItem("token");
      localStorage.removeItem("nim");
      localStorage.removeItem("nama");
      localStorage.removeItem("role");
      localStorage.removeItem("id");

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleNavLinkClick = () => {};

  return (
    <div className="flex h-screen bg-white">
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <nav
          className={`flex items-center justify-between h-20 bg-green-700 border-b-2 border-green-700 absolute w-full z-10 transition-all duration-300`}
        >
          <div className="flex items-center justify-center h-20 w-60 bg-gray-100">
            <img src="/logo1.png" alt="Cengkir Gading Logo" className="h-16" />
          </div>

          <div className="flex items-center space-x-4 mr-auto ml-4">
            <button
              onClick={handleLogout}
              className="text-white hover:text-black"
            >
              <FaSignOutAlt className="text-3xl" />
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 mr-2">
              <img
                src="/Admin.jpg"
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
              <div className="text-sm">
                <div className="font-medium text-white text-sm">
                  {nama || "Unknown User"}
                </div>
                <div className="text-gray-900 text-xs">{role || "User"}</div>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "w-60" : "w-16"
          } bg-green-700 text-white flex flex-col fixed h-full mb-2 z-5 mt-20 transition-all duration-300`}
        >
          <div className="flex-1 px-2 py-4 space-y-2 overflow-y-auto relative mb-4">
            <button
              onClick={toggleSidebar}
              className="absolute top-1 right-0 transform translate-x-1/2 text-white focus:outline-none bg-green-700 border hover:bg-gray-600 border-white rounded-full p-1 ml-5 mb-4"
            >
              <FaChevronLeft
                className={`text-2xl transition-transform duration-300 mr-5 ${
                  isSidebarOpen ? "" : "rotate-180"
                }`}
              />
            </button>

            <NavLink
              to="/admin/dashboard"
              onClick={handleNavLinkClick}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded border-b font-sidebar-menu-admin text-base ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-white hover:bg-gray-700"
                }`
              }
            >
              <FaTachometerAlt className="text-xl mt-2" />
              <span className={`ml-3 mt-2 ${!isSidebarOpen ? "hidden" : ""}`}>
                Dashboard
              </span>
            </NavLink>

            {[
              {
                href: "/admin/drama",
                icon: FaTable,
                label: "Perpustakaan Drama",
              },
              {
                href: "/admin/exercise",
                icon: FaUser,
                label: "Daily Exercise",
              },
              {
                href: "/admin/skenario",
                icon: FaTasks,
                label: "Perpustakaan Skenario",
              },
              {
                href: "/admin/karakter",
                icon: FaWpforms,
                label: "Evaluasi Karakter",
              },
              {
                href: "/admin/kalender",
                icon: FaCalendarAlt,
                label: "Kalender Acara",
              },
              { href: "/admin/user", icon: FaUsers, label: "Users List" },
            ].map((menuItem) => (
              <NavLink
                key={menuItem.href}
                to={menuItem.href}
                onClick={handleNavLinkClick}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded border-b font-sidebar-menu-admin text-base border-white ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-white hover:bg-gray-700"
                  }`
                }
              >
                <menuItem.icon className="text-xl mt-2" />
                <span className={`ml-3 mt-2 ${!isSidebarOpen ? "hidden" : ""}`}>
                  {menuItem.label}
                </span>
              </NavLink>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main
          className={`flex-1 p-2 bg-gray-100 mt-20 ${
            isSidebarOpen ? "ml-60" : "ml-16"
          } overflow-y-auto`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
