import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FaEdit, FaTrash, FaPlus, FaCaretDown, FaPrint } from "react-icons/fa";
import api from "../../../services/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  // State untuk modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user");
        const userList = response.data;
        setUsers(userList);
        setFilteredUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Gagal memuat pengguna");
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    navigate("/admin/user/create");
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/user/${selectedUserId}`);
      setUsers(users.filter((user) => user.id !== selectedUserId));
      setFilteredUsers(
        filteredUsers.filter((user) => user.id !== selectedUserId)
      );
      toast.success("Pengguna berhasil dihapus", { id: "deleteUser" });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Gagal menghapus pengguna", { id: "deleteUser" });
    }
    closeModal();
  };

  const openModal = (id) => {
    setSelectedUserId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setModalIsOpen(false);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch = user.nama
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole =
        selectedRole === "" ||
        user.role.toLowerCase() === selectedRole.toLowerCase();
      return matchesSearch && matchesRole;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, selectedRole, users]);

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // SimplePagination component
  const SimplePagination = () => {
    const next = () => {
      if (activePage < totalPages) setActivePage(activePage + 1);
    };

    const prev = () => {
      if (activePage > 1) setActivePage(activePage - 1);
    };

    return (
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={prev}
          disabled={activePage === 1}
          className={`border border-green-300 rounded-full p-2 ${
            activePage === 1
              ? "text-green-300 cursor-not-allowed"
              : "text-gray-700 hover:text-green-700"
          }`}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>

        <span className="text-gray-500">
          Page <strong className="text-green-700">{activePage}</strong> of{" "}
          <strong className="text-green-600">{totalPages}</strong>
        </span>

        <button
          onClick={next}
          disabled={activePage === totalPages}
          className={`border border-green-300 rounded-full p-2 ${
            activePage === totalPages
              ? "text-green-300 cursor-not-allowed"
              : "text-black hover:text-green-700"
          }`}
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    );
  };

  const handlePrintPDF = async () => {
    const element = document.getElementById("print-table");

    const hiddenElements = document.querySelectorAll(".print-hidden");
    hiddenElements.forEach((el) => (el.style.display = "none"));

    const dropdownButton = document.querySelector(
      "button[aria-expanded='true']"
    );
    const dropdownMenu = document.querySelector(".absolute");

    if (dropdownButton) {
      dropdownButton.style.display = "none";
    }
    if (dropdownMenu) {
      dropdownMenu.style.display = "none";
    }

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Daftar_Pengguna.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Gagal mencetak PDF");
    } finally {
      hiddenElements.forEach((el) => (el.style.display = ""));

      if (dropdownButton) {
        dropdownButton.style.display = "";
      }
      if (dropdownMenu) {
        dropdownMenu.style.display = "";
      }
    }
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="mt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto">
            Semua Pengguna
            <span className="block h-1 bg-green-800"></span>
          </h1>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center max-w-sm mx-auto mb-4"
        >
          <label htmlFor="user-search" className="sr-only">
            Cari
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="user-search"
              className="bg-white border border-green-300 hover:border-green-700 text-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-full pl-4 p-2.5 focus:outline-none"
              placeholder="Cari nama..."
              value={searchTerm}
              onChange={handleSearch}
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-900 focus:outline-none"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Cari</span>
          </button>
        </form>

        <div className="flex space-x-4">
          <button
            onClick={handleClick}
            className="font-natural-body flex items-center text-white bg-green-700 hover:bg-green-900 px-4 py-2 rounded-lg mb-3"
          >
            <FaPlus className="mr-2" />
            <span>User</span>
          </button>
          <button
            onClick={handlePrintPDF}
            className="font-natural-body flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900 mb-3"
          >
            <FaPrint className="mr-2" />
            <span>Cetak PDF</span>
          </button>
        </div>

        {/* Tabel Pengguna */}
        <div className="overflow-x-auto">
          <table
            id="print-table"
            className="min-w-full bg-white border border-gray-300 text-center rounded-lg shadow-md mb-2"
          >
            <thead>
              <tr className="bg-gray-200 font-dramatic-header">
                <th className="py-2 px-4">No</th>
                <th className="py-2 px-4">Nama</th>
                <th className="py-2 px-4">NIM</th>
                <th className="py-2 px-4 relative">
                  Role
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="ml-2 text-gray-500 focus:outline-none"
                  >
                    <FaCaretDown />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg z-10">
                      <button
                        onClick={() => handleRoleFilter("")}
                        className={`block w-full text-left text-gray-600 px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedRole === "" ? "bg-gray-100" : ""
                        }`}
                      >
                        Semua
                      </button>
                      <button
                        onClick={() => handleRoleFilter("admin")}
                        className={`block w-full text-left text-gray-600 px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedRole === "admin" ? "bg-gray-100" : ""
                        }`}
                      >
                        Admin
                      </button>
                      <button
                        onClick={() => handleRoleFilter("user")}
                        className={`block w-full text-left text-gray-600 px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedRole === "user" ? "bg-gray-100" : ""
                        }`}
                      >
                        User
                      </button>
                    </div>
                  )}
                </th>
                <th className="py-2 px-4 print-hidden">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="font-dramatic-header hover:bg-gray-100"
                >
                  <td className="py-2 px-4">{indexOfFirstItem + index + 1}</td>
                  <td className="py-2 px-4">{user.nama}</td>
                  <td className="py-2 px-4">{user.nim}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4 print-hidden">
                    <button
                      onClick={() => navigate(`/admin/user/edit/${user.id}`)}
                      className="text-green-600 hover:text-green-900 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => openModal(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SimplePagination />

        {/* Modal Konfirmasi */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Konfirmasi Hapus"
          className="fixed inset-0 flex ml-64 items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 font-footer-body">
              Konfirmasi Hapus
            </h2>
            <p className="font-footer-body text-base text-gray-600">
              Apakah Anda yakin ingin menghapus pengguna ini?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="font-footer-body mr-2 px-4 py-2 bg-gray-300 rounded-lg text-black hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 font-footer-body"
              >
                Hapus
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default UserList;
