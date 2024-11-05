import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getAllSubjects } from "../../APILogic/Subjects"
import { createLesson } from "../../APILogic/Lessons"

export function CreateLesson() {
    const [subjects, setSubjects] = useState([])
    const [success, setSuccess] = useState(0)
    const bimesters = []
    const weeks = [1,2,3,4,5,6,7,8]

    const location = useLocation()
    const careerInfo = location.state

    for (let i = 0; i < careerInfo.numBimesters; i++) {
        bimesters.push(i+1)
    }

    useEffect(() => {
        const fetchSubjects = async() => {
            const subjectsResponse = await getAllSubjects()

            if (subjectsResponse.status == 200) {
                setSubjects(subjectsResponse.data)
            }else{
                console.log("Error trayendo las materias: "+ 
                    "Status: "+ subjectsResponse.status+
                    "Body: "+ subjectsResponse.data);
            }
        }

        fetchSubjects()
    },[])

    const HandlerCreateLesson = async(e) => {
        e.preventDefault();
        const subject = e.target.subject.value
        const bimesters = e.target.bims.value
        const weeks = e.target.weeks.value
        const posWeek = e.target.positionInWeek.value
        const lessonTitle = e.target.title.value
        const teacherName = e.target.teacher.value
        const descrip = e.target.description.value
        const linkContent = e.target.link.value
        const docType = e.target.type.value


        if (isNullOrEmpty(subject) ||
        isNullOrEmpty(bimesters) ||
        isNullOrEmpty(weeks) ||
        isNullOrEmpty(posWeek) ||
        isNullOrEmpty(lessonTitle) ||
        isNullOrEmpty(teacherName) ||
        isNullOrEmpty(descrip) ||
        isNullOrEmpty(linkContent) ||
        isNullOrEmpty(docType)) {
            setSuccess(2)
            return
        }

        var lesssonToPost = {
            subject: {
                subjectId: subject
            },
            career: {
                careerId: careerInfo.careerId
            },
            numBimester: bimesters,
            numWeek: weeks,
            posWeek: posWeek,
            lessonTitle: lessonTitle,
            teacherName: teacherName,
            contentDescrip: descrip,
            linkToContent: linkContent,
            contentType: docType
        }

        const responseLesson = await createLesson(lesssonToPost)
        
        if (responseLesson.status == 200) {
            setSuccess(1)
            return
        }else{
            console.log("Error posteando: ");
            console.log(responseLesson.data);
            
            setSuccess(3)
            return
        }
    }

    return(
        <React.Fragment>
            <div class="container">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Crear Leccion</h5>
                        <form onSubmit={HandlerCreateLesson}>
                        <div className="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person-circle"></i></div>
                                <select name="subject" class="form-select">
                                    {subjects.map((element) =>(
                                        <option value={element.subjectId}>{element.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person-circle"></i></div>
                                <select name="bims" class="form-select">
                                    {bimesters.map((element) =>(
                                        <option value={element}>Bimestre {element}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        <div className="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person-circle"></i></div>
                                <select name="weeks" class="form-select">
                                    {weeks.map((element) =>(
                                        <option value={element}>Semana {element}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person"></i></div>
                                <input type="number" class="form-control" placeholder="Num posicion de la clase" name="positionInWeek" />
                            </div>
                        </div>  
                        <div class="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class=" bi bi-envelope-fill"></i></div>
                                <input type="text" class="form-control" name="title" placeholder="Titulo de la leccion"/>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-key"></i></div>
                                <input type="text" name="teacher" class="form-control" placeholder="nombre del profesor" />
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-key-fill"></i></div>
                                <input type="text" name="description" class="form-control" placeholder="descripcion de la leccion" />
                            </div>
                        </div>

                        <div class="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-key-fill"></i></div>
                                <input type="text" name="link" class="form-control" placeholder="link al contenido" />
                            </div>
                        </div>

                        <div className="mb-3">
                            <div class="my-input">
                                <div class="icono"><i class="bi bi-person-circle"></i></div>
                                <select class="form-select" name="type" aria-label="Default select example">
                                    <option value="PDF">pdf</option>
                                    <option value="VIDEO">video</option>
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
                    leccion creada exitosamente
                </div>            
                : success == 2? 
                <div class="alert alert-warning" role="alert">
                    Erro al crear usuario: Verifica que los campos no esten vacios
                </div>
                : success == 3?
                <div class="alert alert-warning" role="alert">
                    Erro al crear usuario: Intenta mas tarde
                </div>
                :
                <span></span>
            }
        </React.Fragment>
    )
}

function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}
