import { useLocation, useNavigate } from "react-router-dom"
import React from "react"

export function SelectorWeek() {
    const location = useLocation()
    const navigate = useNavigate()
    const selectorInfo = location.state

    const weekElements = [
        "Semana 1",
        "Semana 2",
        "Semana 3",
        "Semana 4",
        "Semana 5",
        "Semana 6",
        "Semana 7",
        "Semana 8", 
        "Examen Final"
    ]

    if (selectorInfo.isRepeatExam) {
        weekElements.push("Examen de recuperación")
    }

    const navToWeekLessons = (weekElement) => {
            var dividedWeekElement = weekElement.split(" ")

            if (dividedWeekElement[0] === "Examen") {
                //TODO: esto llevara mas adelante a la vista de los examenes
            }else {
                navigate("/LessonView", {state: {careerId: selectorInfo.careerid,
                    bimesterNum: Number(selectorInfo.bimesterName.split(" ")[1]),
                    weekNum: Number(dividedWeekElement[1])
                }})
            }
    }

    return (
        <React.Fragment>
                <h1 className="title-career">{selectorInfo.bimesterName}</h1>
                {weekElements.map((weekElement => (
                    <div className="wee-selector-btns">
                            <button className="btn" onClick={() => navToWeekLessons(weekElement)}>{weekElement}</button>
                    </div>
                )))                    
                }
        </React.Fragment>
    )
}
