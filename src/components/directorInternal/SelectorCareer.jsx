import React, { useEffect, useState } from "react";
import "../../styles/selectorCareer.scss"
import { getAllCareers } from "../../APILogic/Careers";
import { CardDashBoard } from "../dashboardStudent";
import bimesterPic from '../../assets/bimesterpic.jpg';
import { useNavigate } from "react-router-dom";

export function SelectorCareer() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [errorFetch, setError] = useState(null)
    const [rows, setRows] = useState([]); // Estado para almacenar las filas


    useEffect(() => {
        const fetchCarerrInfo = async() => {
            const carrers = await getAllCareers()

            if (carrers.status == 200) {

                // Agrupar las carreras en filas de 3
                const groupedRows = [];
                for (let i = 0; i < carrers.data.length; i += 3) {
                    groupedRows.push(carrers.data.slice(i, i + 3));
                }
                setRows(groupedRows); // Guardar las filas agrupadas en el estado
            } else{
                setError("Error obteniendo carreras: " + carrers.data.error)
            }

            setLoading(false)
        }

        fetchCarerrInfo()
    },[])
    
    return(
        <React.Fragment>
            <div className="selector-career-edit">
                <p>Elije la carrera a editar o crea una carrera</p>
                <button className="btn-createCareer">Crear nueva Carrera</button>

                {loading?
                    <p>Cargando Carreras...</p>
                :
                    errorFetch == null || errorFetch == undefined ?
                    <div className="container">
                        {rows.map((row, index) => (
                            <div className="row" >
                                {row.map((career, index) => (
                                    <CardDashBoard 
                                        picLink={bimesterPic}
                                        altTxt={"pic logo carrera"}
                                        txtCard={career.careerName}
                                        navToSelector={() => navigate("EditorLesson", {state: career})}
                                    />
                                ))}
                            </div>
                        )
                        )
                        }
                    </div>

                    :

                    <p>{errorFetch}</p>
                }
            </div>
        </React.Fragment>
    )
}
