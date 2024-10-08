import axios from "axios";

// Leer la variable de entorno
const apiUrl = import.meta.env.VITE_API_URL;

// Leer todos (GET)
export const getAllCareers = async () => {
    const response = await axios.get(`${apiUrl}/api/Careers`);
    return response.data;
  };