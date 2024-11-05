import React, { useState } from "react";
import "../../styles/editorLessons.scss"
import { useLocation, useNavigate } from "react-router-dom";
import { deleteLesson, getWeekLessons } from "../../APILogic/Lessons";

export function EditorLessons() {
    const bimestres = []
    const weeks = [1,2,3,4,5,6,7,8]
    const [lessons,setLessons] = useState([])
    const [errorFetch, setError] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()
    const careerInfo = location.state    

    const QueryLessons = async(e) => {
        console.log("Inicio la consulta")
        e.preventDefault();

        const choosenBimester  = e.target.bims.value
        const choosenWeek = e.target.weeks.value

        const resultGetLessons = await getWeekLessons(careerInfo.careerId,choosenBimester,choosenWeek)

        if (resultGetLessons.status == 200) {
            setLessons(resultGetLessons.data)
            setError("")
        }else{
            setError("No se pudo obtener lecciones: "+resultGetLessons.data)
        }
    }

    const HandlerDeleteLesson = async(id) => {
        console.log("Inicio el borrado");
                                
        const deleteResult = await deleteLesson(id)

        if (deleteResult.status == 200) {
            alert("leccion borrada exitosamente")
        }else{
            console.log("error la api retorna: ")
            console.log(deleteResult.data)
            alert("Error borrando la leccion")
        }
    }

    for (let i = 0; i < careerInfo.numBimesters; i++) {
        bimestres.push(i+1)
    }

    return(
        <React.Fragment>
            <div className="EditorLessons">
                <form onSubmit={QueryLessons}>
                    <label for="lang">Bimestres</label>
                    <select name="bims">
                        {bimestres.map((element) =>(
                            <option value={element}>Bimestre {element}</option>
                        ))}
                    </select>
                    <label for="lang">Semanas</label>
                    <select name="weeks">
                        {weeks.map((element) =>(
                            <option value={element}>Semana {element}</option>
                        ))}
                    </select>
                    <input type="submit" className="btn btn-subm" value={"Consultar"}/>
                </form>
                <button className="btn btn-creat" onClick={() => navigate("/SelectorCareer/CreateLesson", {state: careerInfo})} >Crear</button>

                {errorFetch == null?
                <p>Consulta algun bimestre y semana para ver las clases de esta</p>
                :
                errorFetch == ""?
                <span></span>
                :
                <p>{errorFetch}</p>
                }

                <div className="accordion">
                    {lessons.map((element, index) => (
                        <LessonElement 
                            key={index}
                            mainTitle={element.lessonTitle}
                            teacher={element.teacherName}
                            description={element.contentDescrip}
                            link={element.linkToContent}
                            delete={()=>HandlerDeleteLesson(element.lessonId)}
                        />
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

function LessonElement(props) {
    
    return (
        <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne"+props.key} aria-expanded="false" aria-controls="collapseOne">
                {props.mainTitle}
              </button>
            </h2>
            <div id={"collapseOne"+props.key} class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                profesor: {props.teacher}<br />
                descripcion: {props.description}<br />
                link a la leccion: <a href={props.link}>Link a la clase</a> <br />
                <button className="btn btn-delete" onClick={props.delete}>Borrar Leccion</button>
              </div>
            </div>
        </div>
    )
}
