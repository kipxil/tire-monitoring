import { BASE_URL, API_KEY } from "../config/env";

export const apiFetch = async (endpoint, options = {}) => {
  const token = sessionStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    "ngrok-skip-browser-warning": "true",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      if (response.status === 403) {
        sessionStorage.clear();
        window.location.href = "/";
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
    console.error("API Fetch Error");
    throw error;
  }
};
