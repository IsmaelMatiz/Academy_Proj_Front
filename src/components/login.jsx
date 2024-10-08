import React, { useState } from "react"
import "../styles/login.scss"
import { Link, useNavigate } from "react-router-dom"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { getAStudent } from "../APILogic/Students"
import { isNullOrEmpty } from "../globalFunctions"

export function Login() {
    const [error, setError] = useState(0)
    const navigate = useNavigate();

    const RegisterUser = async(e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        var isLoginRight = true

        if (isNullOrEmpty(email) || isNullOrEmpty(password)) {
            setError(2)
            return
        }

        await setPersistence(auth,browserSessionPersistence).then(
            async() =>
            {
                return signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    setError(1)
                })
                .catch((error) => {
                    console.error("algo no salio bien iniciando sesion: "+ error)
                    setError(2)
                    isLoginRight = false
                })
            }
        )

        if (isLoginRight == false) {
            return
        }

        const userInfo = await getAStudent(email)

        if (userInfo.status == 200) {
            console.log("User Info: ", userInfo)

            navigate('DashboardStudent', {state: userInfo.data.student})            
        }else{
            setError(3)
            return
        }

    }

    return (
        <React.Fragment>
            <div class="container">
                    <div class="d-flex justify-content-center align-items-center">
                    <div class="card">
                      <div class="card-body">
                        <h1 class="card-title">Iniciar Sesion</h1>
                        <p class="card-text">Introduce tus datos para iniciar sesión</p>
                        <form className="my-sign-p-4" id='cuadro' onSubmit={RegisterUser}>
                            <div class="my-input">
                                <i class="bi bi-person"></i>
                                <input type="email" class="form-control" name="email" placeholder="Email" />
                            </div>
                            <div class="my-input">
                                <i class="bi bi-lock"></i>
                                <input type="password" name="password" class="form-control" placeholder="Password"  />
                            </div>
                            <p>Aun no te has registrado? <Link to={"/RegisterStudent"}>Registrate aqui</Link></p>
                            <button type="submit" className="btn btn-sesion">Ingresar</button>    
                        </form>
                        {
                            error == 0?
                            <span></span> 
                            : error == 2?
                            <div class="alert alert-warning" role="alert">
                                    Error al iniciar sesion verifica correo y contaseña
                            </div> 
                            :  error == 3?
                            <div class="alert alert-warning" role="alert">
                                    Incio de sesion correcto pero no fue posible obtener tu informacion en este momento intenta mas tarde
                            </div> 
                            :
                            <div class="alert alert-success" role="alert">
                                   Usuario Logueado exitosamente
                            </div>
                        }
                      </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
