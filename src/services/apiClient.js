// const BASE_URL = "http://192.168.137.251:8080";
// const BASE_URL = "https://primatyre-prismaexpress-production.up.railway.app";
const BASE_URL = "https://d91f-103-24-58-37.ngrok-free.app";
const apiKey = "halodek";

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "ngrok-skip-browser-warning": "true",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`);
      const errorBody = await response.json().catch(() => null);
      const errorMessage =
        errorBody?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error; // biar bisa ditangani di level pemanggil
  }
};
