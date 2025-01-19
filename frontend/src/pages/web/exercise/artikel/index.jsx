import React, { useEffect, useState } from "react";
import UserLayout from "../../../../layouts/UserLayout";
import api from "../../../../services/api";

const ExerciseArtikel = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await api.get("/daily-exercise");
        const filteredArticles = data.filter(
          (article) => article.tipe === "Artikel"
        );
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  // Filter artikel berdasarkan judul sesuai search query
  const filteredArticles = articles.filter((article) =>
    article.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-6 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="mt-2 font-dramatic-header text-2xl font-extrabold text-left text-green-800 underline underline-offset-2 decoration-green-800">
            Daftar Semua Artikel
          </h1>
          <div className="mb-3 xl:w-72 mt-6">
            <div className="relative flex w-full flex-wrap items-stretch">
              <input
                type="search"
                className="relative m-0 block flex-auto rounded border bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out placeholder-black focus:z-[3] focus:border-primary focus:text-black focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-green-600  dark:placeholder:text-neutral-600 dark:focus:border-primary"
                placeholder="Cari Artikel..."
                aria-label="Search"
                aria-describedby="button-addon2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <span
                className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                id="basic-addon2"
              >
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

        <div className="grid gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg hover:border-green-500 transition-all duration-300"
              >
                <h2 className="text-base font-semibold text-green-700 mb-2 font-dramatic-body-user">
                  {article.judul}
                </h2>
                <p className="text-gray-700 mb-4 text-sm font-dramatic-body-user">
                  {article.deskripsi}
                </p>
                <div className="flex items-center space-x-4">
                  {article.file_path.map((file, index) => {
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
            ))
          ) : (
            <p className="text-gray-500 text-center">
              Tidak ada artikel yang cocok dengan pencarian.
            </p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default ExerciseArtikel;
