import { BASE_URL, API_KEY } from "../config/env";

export const exportData = async (endpoint, options = {}) => {
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
    const result = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!result.ok) {
      throw new Error("Gagal export data");
    }

    const blob = await result.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const now = new Date();
    const formattedDate = now
      .toLocaleString("sv-SE", { hour12: false })
      .replace(" ", "_")
      .replace(/:/g, "-");

    a.download = `export-data_${formattedDate}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Export Error:");
  }
};
