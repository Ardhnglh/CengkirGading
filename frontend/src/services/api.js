import axios from "axios";

const api = axios.create({
  baseURL: "https://api1.cengkirgading.my.id/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Menambahkan interceptor untuk menyertakan token di setiap permintaan
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fungsi untuk mendapatkan URL gambar dengan baseURL
const getImageURL = (path) => {
  return `https://api1.cengkirgading.my.id/${path}`; 
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
export { getImageURL };
