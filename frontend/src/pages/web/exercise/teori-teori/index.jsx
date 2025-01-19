import React, { useEffect, useState } from "react";
import UserLayout from "../../../../layouts/UserLayout";
import api from "../../../../services/api";

const ExerciseAkting = () => {
  const [theories, setTheories] = useState([]);
  const [expandedTheoryId, setExpandedTheoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTheories = async () => {
      try {
        const { data } = await api.get("/daily-exercise");
        const filteredTheories = data.filter(
          (theory) => theory.tipe === "Teori-teori Akting"
        );
        setTheories(filteredTheories);
      } catch (error) {
        console.error("Error fetching acting theories:", error);
      }
    };

    fetchTheories();
  }, []);

  const toggleDescription = (id) => {
    setExpandedTheoryId((prevId) => (prevId === id ? null : id));
  };

  const filteredTeori = theories.filter((teori) =>
    teori.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 underline underline-offset-2 decoration-green-800">
            Teori-teori Akting
          </h1>
          <div className="w-full  xl:w-72">
            <div className="relative flex items-stretch">
              <input
                type="search"
                className="block w-full rounded border bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out placeholder-black focus:z-[3] focus:border-primary focus:text-black focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-green-600 dark:placeholder:text-neutral-600 dark:focus:border-primary"
                placeholder="Cari Teori Akting..."
                aria-label="Search"
                aria-describedby="button-addon2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="input-group-text flex items-center px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-neutral-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {filteredTeori.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredTeori.map((theory) => {
              const isExpanded = expandedTheoryId === theory.id;
              return (
                <div
                  key={theory.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-green-500"
                >
                  <div className="p-4 bg-blue-200 rounded-t-lg">
                    <h2 className="text-base font-dramatic-body-user font-bold text-gray-900">
                      {theory.judul}
                    </h2>
                  </div>
                  <div className="p-6">
                    <p
                      className={`text-gray-700 font-dramatic-body-user text-justify text-sm ${
                        !isExpanded ? "line-clamp-3" : ""
                      }`}
                    >
                      {theory.deskripsi}
                    </p>
                    <button
                      onClick={() => toggleDescription(theory.id)}
                      className="mt-2 text-sm text-blue-900 hover:underline"
                    >
                      {isExpanded
                        ? "Lihat lebih sedikit"
                        : "Lihat selengkapnya"}
                    </button>
                    <div className="mt-4 flex flex-col space-y-2">
                      {theory.file_path.map((file, index) => {
                        const fileExtension = file.split(".").pop();
                        const isPdf = fileExtension === "pdf";
                        const isWord =
                          fileExtension === "docx" || fileExtension === "doc";

                        return isPdf || isWord ? (
                          <a
                            key={index}
                            href={file}
                            className={`font-dramatic-subtitle text-base ${
                              isPdf ? "text-red-700" : "text-blue-700"
                            } hover:underline`}
                            download
                          >
                            Download {isPdf ? "PDF" : "Word"}
                          </a>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center h-24">
            <p className="text-gray-500 text-center">
              Tidak ada teori akting yang cocok dengan pencarian.
            </p>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default ExerciseAkting;
