import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { auth } from "./firebaseConfig";

//Create
export async function createStudentCredentials(email,password){
    let success = false
  
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async() => {
      success = true
      console.log("Creado Exitosamente")
    })
    .catch((error) => {
      console.error("Error al crear admin: "+error) //Alertar de error al crear el usuario
      success = false
      return false
    });
  
    //Si la operacion anterior salio mal detener ejecucion
    if (!success) {
      console.log("Algo salio mal al momento de crear al usuario afectado, se detiene el proceso")
      return false
    }
  
      return success
    }