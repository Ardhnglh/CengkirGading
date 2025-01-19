import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import api from "../../../services/api";
import { FaEdit, FaTrash, FaClipboardCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Karakter = () => {
  const [evaluasiKarakters, setEvaluasiKarakters] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvaluasiKarakters, setFilteredEvaluasiKarakters] = useState(
    []
  );
  const [filteredUsers, setFilteredUsers] = useState([]);

  // State untuk modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvaluasiId, setSelectedEvaluasiId] = useState(null);

  const navigate = useNavigate();

  // Pagination state for both tables
  const [activePageEvaluasi, setActivePageEvaluasi] = useState(1);
  const [activePageUsers, setActivePageUsers] = useState(1);
  const itemsPerPageEvaluasi = 10;
  const itemsPerPageUsers = 10;

  useEffect(() => {
    const fetchEvaluasiKarakters = async () => {
      try {
        const response = await api.get("/evaluasiKarakter");
        setEvaluasiKarakters(response.data);
        setFilteredEvaluasiKarakters(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await api.get("/user");
        const usersWithRoleUser = response.data.filter(
          (user) => user.role === "User"
        );

        const sortedUsers = usersWithRoleUser.sort((a, b) => {
          const aHasEvaluation = evaluasiKarakters.some(
            (evaluasi) => evaluasi.user?.id === a.id
          );
          const bHasEvaluation = evaluasiKarakters.some(
            (evaluasi) => evaluasi.user?.id === b.id
          );

          return aHasEvaluation - bHasEvaluation;
        });

        setUsers(sortedUsers);
        setFilteredUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchEvaluasiKarakters();
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = evaluasiKarakters.filter((item) =>
        item.user?.nama.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEvaluasiKarakters(filtered);
    } else {
      setFilteredEvaluasiKarakters(evaluasiKarakters);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch({ target: { value: searchTerm } });
  };

  const handleCreateEvaluasi = (userId) => {
    navigate(`/admin/karakter/create`, { state: { userId } });
  };

  const handleEditEvaluasi = (id) => {
    navigate(`/admin/karakter/edit/${id}`);
  };

  const handleDeleteEvaluasi = async () => {
    if (selectedEvaluasiId === null) return;

    try {
      await api.delete(`/evaluasiKarakter/${selectedEvaluasiId}`);
      setEvaluasiKarakters((prev) =>
        prev.filter((evaluasi) => evaluasi.id !== selectedEvaluasiId)
      );
      setFilteredEvaluasiKarakters((prev) =>
        prev.filter((evaluasi) => evaluasi.id !== selectedEvaluasiId)
      );
      toast.success("Evaluasi berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting evaluasi karakter:", error);
      toast.error("Gagal menghapus evaluasi.");
    } finally {
      closeModal();
    }
  };

  const openModal = (id) => {
    setSelectedEvaluasiId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedEvaluasiId(null);
    setModalIsOpen(false);
  };

  const indexOfLastEvaluasi = activePageEvaluasi * itemsPerPageEvaluasi;
  const indexOfFirstEvaluasi = indexOfLastEvaluasi - itemsPerPageEvaluasi;
  const currentEvaluasi = filteredEvaluasiKarakters.slice(
    indexOfFirstEvaluasi,
    indexOfLastEvaluasi
  );
  const totalPagesEvaluasi = Math.ceil(
    filteredEvaluasiKarakters.length / itemsPerPageEvaluasi
  );

  const indexOfLastUser = activePageUsers * itemsPerPageUsers;
  const indexOfFirstUser = indexOfLastUser - itemsPerPageUsers;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPagesUsers = Math.ceil(filteredUsers.length / itemsPerPageUsers);

  // SimplePagination component
  const SimplePagination = ({ activePage, setActivePage, totalPages }) => {
    const next = () => {
      if (activePage < totalPages) setActivePage(activePage + 1);
    };

    const prev = () => {
      if (activePage > 1) setActivePage(activePage - 1);
    };

    return (
      <div className="flex items-center justify-center gap-4 mt-4 mb-6">
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
      <div className="p-4">
        <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto mb-6">
          Evaluasi Karakter
          <span className="block h-1 bg-green-800"></span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center max-w-sm mx-auto mb-8"
        >
          <label htmlFor="user-search" className="sr-only">
            Search
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
            <span className="sr-only">Search</span>
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-center rounded-lg shadow-md mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border font-dramatic-header">No</th>
                <th className="py-2 px-4 border font-dramatic-header">Nama</th>
                <th className="py-2 px-4 border font-dramatic-header">
                  Kekurangan
                </th>
                <th className="py-2 px-4 border font-dramatic-header">
                  Evaluasi
                </th>
                <th className="py-2 px-6 border font-dramatic-header">
                  Tanggal Evaluasi
                </th>
                <th className="py-2 px-4 border font-dramatic-header">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentEvaluasi.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border font-dramatic-header">
                    {index + 1 + indexOfFirstEvaluasi}
                  </td>
                  <td className="py-2 px-6 border font-dramatic-body-user">
                    {item.user?.nama || "Nama tidak ditemukan"}
                  </td>
                  <td className="py-2 px-3 border font-natural-body text-justify">
                    {item.kekurangan}
                  </td>
                  <td className="py-2 px-3 border font-dramatic-body-user text-justify">
                    {item.evaluasi}
                  </td>
                  <td className="py-2 px-5 border font-dramatic-body-user text-justify">
                    {new Date(item.tanggal_evaluasi).toLocaleDateString(
                      "en-CA"
                    )}
                  </td>

                  <td className="py-2 px-6 border">
                    <div className="flex justify-center">
                      <button
                        className="text-green-600 hover:text-green-900 mr-2"
                        onClick={() => handleEditEvaluasi(item.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => openModal(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <SimplePagination
            activePage={activePageEvaluasi}
            setActivePage={setActivePageEvaluasi}
            totalPages={totalPagesEvaluasi}
          />

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
                Apakah Anda yakin ingin menghapus evaluasi ini?
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-lg text-black hover:bg-gray-400 font-footer-body"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteEvaluasi}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 font-footer-body"
                >
                  Hapus
                </button>
              </div>
            </div>
          </Modal>
        </div>

        {/* Tabel Pengguna dengan Role User */}
        <h1 className="text-2xl font-dramatic-header-user font-bold text-center relative w-max mx-auto mb-4">
          Daftar Anggota
          <span className="block h-1 bg-green-800"></span>
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-center rounded-lg shadow-md mb-2">
            <thead>
              <tr className="bg-gray-200 font-dramatic-header">
                <th className="py-2 px-4 border">No</th>
                <th className="py-2 px-4 border">Nama</th>
                <th className="py-2 px-4 border">NIM</th>
                <th className="py-2 px-4 border">Catatan</th>
                <th className="py-2 px-4 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border font-dramatic-header">
                    {index + 1 + indexOfFirstUser}
                  </td>
                  <td className="py-2 px-6 border font-dramatic-body-user">
                    {user.nama}
                  </td>
                  <td className="py-2 px-6 border font-dramatic-body-user">
                    {user.nim}
                  </td>
                  <td className="py-2 px-6 border font-dramatic-body-user">
                    <span
                      className={
                        evaluasiKarakters.some(
                          (evaluasi) => evaluasi.user?.id === user.id
                        )
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {evaluasiKarakters.some(
                        (evaluasi) => evaluasi.user?.id === user.id
                      )
                        ? "Sudah Ada Evaluasi"
                        : "Belum Ada Evaluasi"}
                    </span>
                  </td>
                  <td className="py-2 px-6 border">
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleCreateEvaluasi(user.id)}
                    >
                      <FaClipboardCheck />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <SimplePagination
            activePage={activePageUsers}
            setActivePage={setActivePageUsers}
            totalPages={totalPagesUsers}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Karakter;
