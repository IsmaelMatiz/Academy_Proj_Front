import axios from "axios";

// Leer la variable de entorno
const apiUrl = import.meta.env.VITE_API_URL;

// Crear un Student (POST)
export const postAStudent = async (data) => {
    const response = await axios.post(`${apiUrl}/api/Student`,data);
    return response.status == 200;
  };

export async function getAStudent (email) {
  const response = await axios.get(`${apiUrl}/api/Student/${email}`)
  return {
    status: response.status,
    data: response.data
  }
}
