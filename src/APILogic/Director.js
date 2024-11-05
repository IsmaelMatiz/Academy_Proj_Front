import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function getADirector(email) {
  try {
    const response = await axios.get(`${apiUrl}/api/Directores/${email}`);
    return response;
  } catch (error) {
    if (error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado fuera del rango 2xx
      console.log("Error logueando Director:", error);
      console.log("API status:", error.response.status);
      console.log("API content:", error.response.data);

      // Devolver el estado y el contenido del error
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      // La solicitud se realizó pero no hubo respuesta
      console.log("No se recibió respuesta de la API:", error.request);
      return {
        status: null,
        data: "No response received from the API",
      };
    } else {
      // Algo ocurrió al configurar la solicitud
      console.log("Error al configurar la solicitud:", error.message);
      return {
        status: null,
        data: error.message,
      };
    }
  }
}
