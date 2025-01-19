import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Skenario = () => {
  const [skenarios, setSkenarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkenarios, setFilteredSkenarios] = useState([]);

  // Pagination state
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;

  // State untuk modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSkenarioId, setSelectedSkenarioId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkenarios = async () => {
      try {
        const response = await api.get("/skenario");
        setSkenarios(response.data);
        setFilteredSkenarios(response.data);
      } catch (error) {
        console.error("Failed to fetch skenarios", error);
      }
    };

    fetchSkenarios();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = skenarios.filter((skenario) =>
        skenario.judul.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkenarios(filtered);
    } else {
      setFilteredSkenarios(skenarios);
    }
    setActivePage(1);
  };

  const handleEditClick = (id) => {
    navigate(`/admin/skenario/edit/${id}`);
  };

  const extractFileName = (filePath) => {
    if (!filePath) return "Tidak ada file";

    const fileNameWithExt = filePath.split("/").pop();
    const fileName = fileNameWithExt.replace(/^\d+-/, "");

    return fileName.charAt(0).toUpperCase() + fileName.split(".")[0].slice(1);
  };

  const handleDeleteClick = async () => {
    if (selectedSkenarioId === null) return;
    try {
      await api.delete(`/skenario/${selectedSkenarioId}`);
      setSkenarios(
        skenarios.filter((skenario) => skenario.id !== selectedSkenarioId)
      );
      setFilteredSkenarios(
        filteredSkenarios.filter(
          (skenario) => skenario.id !== selectedSkenarioId
        )
      );
      toast.success("Skenario berhasil dihapus!");
    } catch (error) {
      toast.error("Gagal menghapus skenario.");
      console.error("Failed to delete skenario", error);
    }
    closeModal();
  };

  const openModal = (id) => {
    setSelectedSkenarioId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedSkenarioId(null);
    setModalIsOpen(false);
  };

  // Pagination logic
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSkenarios = filteredSkenarios.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredSkenarios.length / itemsPerPage);

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

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-center relative w-max mx-auto font-dramatic-header">
            Perpustakaan Skenario
            <span className="block h-1 bg-green-800"></span>
          </h1>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center max-w-sm mx-auto mb-4"
        >
          <label htmlFor="user-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="user-search"
              className="bg-white border border-green-300 hover:border-green-700 text-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-full pl-4 p-2.5 focus:outline-none"
              placeholder="Cari judul..."
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
            <span className="sr-only">Search</span>
          </button>
        </form>

        <button
          className="font-dramatic-header flex items-center text-white bg-green-700 hover:bg-green-900 rounded-lg px-2 py-2 mb-3"
          onClick={() => navigate("/admin/skenario/create")}
        >
          <FaPlus className="mr-2" />
          <span>Tambah Skenario</span>
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md mb-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border text-center font-dramatic-header">
                  No
                </th>
                <th className="px-4 py-2 border text-center font-dramatic-header">
                  Judul
                </th>
                <th className="px-4 py-2 border text-center font-dramatic-header">
                  Deskripsi
                </th>
                <th className="px-4 py-2 border text-center font-dramatic-header">
                  Naskah Drama
                </th>
                <th className="px-4 py-2 border text-center font-dramatic-header">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSkenarios.length > 0 ? (
                currentSkenarios.map((skenario, index) => (
                  <tr key={skenario.id} className="border-b hover:bg-gray-100">
                    <td className="px-2 py-2 border text-center font-dramatic-header">
                      {index + 1 + indexOfFirstItem}
                    </td>
                    <td className="px-4 py-2 border text-center font-dramatic-body-user">
                      {skenario.judul}
                    </td>
                    <td className="px-3 py-2 border items-center font-natural-body text-justify">
                      {skenario.deskripsi}
                    </td>
                    <td className="px-2 py-2 border text-center font-dramatic-header">
                      {skenario.file_paths.length > 0 ? (
                        <div className="flex flex-col">
                          {skenario.file_paths.map((filePath, i) => (
                            <a
                              key={i}
                              href={filePath}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {extractFileName(filePath)}
                            </a>
                          ))}
                        </div>
                      ) : (
                        "Tidak ada file"
                      )}
                    </td>
                    <td className="px-6 py-2 border text-center align-middle">
                      <div className="flex justify-center items-center space-x-2">
                        <button
                          className="text-green-600 hover:text-green-900"
                          onClick={() => handleEditClick(skenario.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => openModal(skenario.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Tidak ada skenario ditemukan
                  </td>
                </tr>
              )}
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
              Apakah Anda yakin ingin menghapus skenario ini?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="mr-2 px-4 py-2 bg-gray-300 rounded-lg text-black hover:bg-gray-400 font-footer-body"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteClick}
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

export default Skenario;
