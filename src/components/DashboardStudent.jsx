import React from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import "../styles/dashboardstudent.scss"
import cronogramaPic from '../assets/cronograma_pic.jpg';
import bimesterPic from '../assets/bimesterpic.jpg';

export function DashStudent() {
    const location = useLocation()
    const progresStudent = location.state

    const navigate = useNavigate()

    const cardData = [
        { picLink: cronogramaPic, altTxt: "imagen de cronograma academico", txtCard: "Cronograma" }
    ]

    for (let i = 0; i < progresStudent.currentBimester; i++) {
        cardData.push({ picLink: bimesterPic, altTxt: "imagen de cronograma academico", txtCard: "Bimestre " + (i+1)})
    }

    // Función para dividir las tarjetas en filas de 3 elementos cada una
    const rows = [];
    for (let i = 0; i < cardData.length; i += 3) {
        rows.push(cardData.slice(i, i + 3));
    }

    const navToSelector = (txtCard) => {
        console.log("progress: ")
        console.log(progresStudent)

        if (txtCard === "Cronograma") {
            window.open("https://firebasestorage.googleapis.com/v0/b/academy-it-2024.appspot.com/o/Calendario-academico-ing-software.pdf?alt=media&token=70734519-bb45-4472-9c2d-f8cb14996744", "_blank");
        }else{
            navigate('/SelectorWeek', {state: {isRepeatExam: false, 
                bimesterName: txtCard, careerid: progresStudent.student.choosenCareer.careerId}})
        }
    }

    return (
        <React.Fragment>
            {progresStudent ? (
                <>
                    <h1 className="title-career">{progresStudent.student.choosenCareer.careerName}</h1>
                    <div class="container">
                    {rows.map((row, rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {row.map((card, index) => (
                                <CardDashBoard
                                    key={index}
                                    picLink={card.picLink}
                                    altTxt={card.altTxt}
                                    txtCard={card.txtCard}
                                    navToSelector={() => navToSelector(card.txtCard)}
                                />
                            ))}
                        </div>
                    ))}
                    </div>
                </>
            ) : (
                <p>Loading student information...</p>
            )}
        </React.Fragment>
    )
}

export function CardDashBoard(props) {
    return (
        <React.Fragment>
            <div class="col-sm">
                <div className="card card-dash-board" onClick={props.navToSelector}>
                    <img className="card-img-top" src={props.picLink} alt={props.altTxt} />
                    <p className="card-text">{props.txtCard}</p>
                    <div className="overlay"></div>
                </div>
            </div>
        </React.Fragment>
    )
}


