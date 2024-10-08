import React, { useEffect, useState } from "react"
import { getAllCareers } from "../APILogic/Careers";
import { postAStudent } from "../APILogic/Students";
import { createStudentCredentials } from "../firebase/Users";
export function RegisterView(){
    const [careers, setCareers] = useState([])
    const [success, setSuccess] = useState(0)

    useEffect(() => {
          const fetchItems = async () => {
          const data = await getAllCareers();
          setCareers(data);
        };
    
        fetchItems();
      }, []);

    const RegisterUser = async(e) => {
        e.preventDefault();

        console.log("Inicio el registro")

        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const verifyPassword = e.target.verify.value
        const career = e.target.career.value

         //Validar que contraseña y verify sean iguales
         if(password != verifyPassword) 
            {
                setSuccess(2)
                return
            }

        if ((name == null || name == "")||(email == null || email == "")||(career == null || career == "")) {
            setSuccess(3)
            return
        }

        if (await createStudentCredentials(email,password) == false ) {
            setSuccess(4)
            return
        }
        
        if (await postAStudent({
            "fullName": name,
            "email": email,
            "profilePic": "R0lGODlhAQABAIAAAAUEBA==",
            "userType": "STUDENT",
            "choosenCareer": {
            "careerId": career
        }
        })) {
            setSuccess(1)
            return
        }else{
            setSuccess(3)
            return
        }
    }
    
    return (
        <React.Fragment>
            <div class="container">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Registrate</h5>
                            <form onSubmit={RegisterUser}>
                        <div class="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person"></i></div>
                                <input type="text" class="form-control" placeholder="Nombre completo" name="name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class=" bi bi-envelope-fill"></i></div>
                                <input type="email" class="form-control" name="email" placeholder="Correo electrónico" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-key"></i></div>
                                <input type="password" name="password" class="form-control" placeholder="Contraseña" />
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-key-fill"></i></div>
                                <input type="password" name="verify" class="form-control" placeholder="Verificar Contraseña" />
                            </div>
                        </div>

                        <div className="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person-circle"></i></div>
                                <select class="form-select" name="career" aria-label="Default select example">
                                    <option selected>Elige una carrera</option>
                                        {careers.map(
                                            career => (
                                                <option value={career.careerId}>{career.careerName}</option>
                                            )
                                        )
                                        }
                                </select>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </form>
                        </div>
                    </div>
                </div>
            </div>
            {
                success == 0? <span></span> 
                : success == 1? 
                <div class="alert alert-success" role="alert">
                    Usuario creado exitosamente
                </div>
              : success == 2? 
                <div class="alert alert-warning" role="alert">
                    Erro al crear usuario: Contraseñas no coinciden
                </div>
                : success == 3? 
                <div class="alert alert-warning" role="alert">
                    Erro al crear usuario: Verifica que los campos no esten vacios
                </div>
                : success == 4? 
                <div class="alert alert-warning" role="alert">
                    Erro al crear usuario: Crea unas credenciales fuertes
                </div>
                :<span></span>
            }
        </React.Fragment>
    )
}
