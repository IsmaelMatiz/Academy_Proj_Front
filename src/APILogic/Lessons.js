import axios from "axios";

// Leer la variable de entorno
const apiUrl = import.meta.env.VITE_API_URL;

export const getWeekLessons = async (careerId,bimesterNum,weekNum) => {
  try{
    const response = await axios.get(`${apiUrl}/api/Lessons?careerId=${careerId}&bimesterNum=${bimesterNum}&weekNum=${weekNum}`);
    return response;
  } catch (error) {
    if (error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado fuera del rango 2xx
      console.log("Error logueando Student or Teacher:", error);
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
  };

  export const createLesson = async (lessonInfo) => {
    try{
      const response = await axios.post(`${apiUrl}/api/Lessons`,lessonInfo);
      return response;
    } catch (error) {
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado fuera del rango 2xx
        console.log("Error creando lesson:", error);
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

export const deleteLesson = async (id) => {
  try{
    const response = await axios.delete(`${apiUrl}/api/Lessons/${id}`);
    return response;
  } catch (error) {
    if (error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado fuera del rango 2xx
      console.log("Error borrando lesson:", error);
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
