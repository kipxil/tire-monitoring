// // const BASE_URL = "http://192.168.137.251:8080";
// // const BASE_URL = "https://primatyre-prismaexpress-production.up.railway.app";
// const BASE_URL = "https://517f-103-24-56-35.ngrok-free.app";
// const apiKey = "halodek";

// export const apiFetch = async (endpoint, options = {}) => {
//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": apiKey,
//         "ngrok-skip-browser-warning": "true",
//         ...(options.headers || {}),
//       },
//       ...options,
//     });

//     if (!response.ok) {
//       // throw new Error(`HTTP error! status: ${response.status}`);
//       const errorBody = await response.json().catch(() => null);
//       const errorMessage =
//         errorBody?.message || `HTTP error! status: ${response.status}`;
//       throw new Error(errorMessage);
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("API Fetch Error:", error);
//     throw error; // biar bisa ditangani di level pemanggil
//   }
// };

// import { toast } from "react-toastify";
// const BASE_URL = "http://192.168.137.251:8080";
// const BASE_URL = "https://primatyre-prismaexpress-production.up.railway.app";
const BASE_URL = "https://08b5-103-24-56-35.ngrok-free.app";
const apiKey = "halodek";

export const apiFetch = async (endpoint, options = {}) => {
  const token = sessionStorage.getItem("token");

  // Buat headers dasar
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "ngrok-skip-browser-warning": "true",
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };

  // Jangan tambahkan token untuk endpoint login
  if (!endpoint.includes("/login") && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      if (response.status === 403) {
        // Token expired atau tidak valid
        sessionStorage.clear();
        window.location.href = "/";
        // toast.error("Sesi login Anda telah berakhir.");
        return;
      }
      const errorBody = await response.json().catch(() => null);
      const errorMessage =
        errorBody?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error; // lempar ke pemanggil (bisa ditangani pakai try/catch di komponen)
  }
};
