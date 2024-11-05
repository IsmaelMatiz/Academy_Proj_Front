import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getWeekLessons } from "../../APILogic/Lessons";
import "../../styles/Lesson.scss"

export function LessonView() {
    const [lessonData, setLessonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [choosenLesson, setChoosenLesson] = useState(0);

    const location = useLocation()
    const selectedWeekInfo = location.state
    
    //Una vez el endpoint este listo hacer fetch de toda la data de las lecciones de la semana y mostrar contenido dependiendo de si es pdf o video
    useEffect(() => {
        console.log("Inicia el UseEffec")

        const fetchLesson = async() => {
            var careerId = selectedWeekInfo.careerId
            var bimesterNum = selectedWeekInfo.bimesterNum
            var weekNum = selectedWeekInfo.weekNum

            console.log("Inicio el proceso las variables son: "+
                + "\ncareerId: "+ careerId+
                + "\nbimesterNum: "+ bimesterNum+
                + "\nweekNum: "+ weekNum
            )

            try {
                const lessonInfo = await getWeekLessons(careerId,bimesterNum,weekNum)
                
                console.log("la funcion devuelve: ")
                console.log(lessonInfo)

                if (lessonInfo.status == 404) {
                    throw new Error(lessonInfo.data);
                } else if (lessonInfo.status != 200) {
                    throw new Error("Error en la solicitudo o en el servidor: "+lessonInfo.data+
                        " | status: " +lessonInfo.status);
                }

                setLessonData(lessonInfo.data)
            } catch (error) {
                setError(error.message);
            }finally {
                setLoading(false);
            }
        }

        fetchLesson()
    }, [])
    
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return(
        <React.Fragment>
            <h1 className="title-career">{lessonData[0].career.careerName}</h1>
            <div className="Lesson-v">
                <ul class="nav flex-column vertical-menu">
                  {lessonData.map(((lessonElement, index) => (
                    <li class="nav-item">
                       <button class="nav-link active" onClick={() => setChoosenLesson(index)}>Clase {index+1}</button>
                    </li>
                  )))}
                </ul>
                {ShowLesson(lessonData[choosenLesson])}
            </div>            
        </React.Fragment>
    )
}

function ShowLesson(props) {
    
    if (props.contentType == "VIDEO") {
        return (
            <>
                <video controls width="60%">
                    <source src={props.linkToContent} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                </video>
                <div className="class-info">
                    <div className="con-container">
                        <h3>{props.lessonTitle}</h3>
                        <p className="teacherInfo">{props.teacherName}</p>
                        <p className="descriptionClass">{props.contentDescrip}</p>
                    </div>
                </div>
            </>
        )
    }else{
        console.log("Entro al else, me llego: "+props.linkToContent+ " y "+ props.contentType)
        return (
            <>
                <div className="class-info">
                    <div className="con-container">
                        <h3>{props.lessonTitle}</h3>
                        <p className="teacherInfo">{props.teacherName}</p>
                        <p className="descriptionClass">{props.contentDescrip}</p>
                    </div>
                </div>
                <embed src={props.linkToContent} type="application/pdf" width="70%" height="400px" />
            </>
        )
    }
}
