import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardDashBoard } from "./dashboardStudent";
import picEditContent from "../assets/editContentCareers.jpg";

export function DashboardDirector() {
    const location = useLocation()
    const navigate = useNavigate()
    const DirectorInfo = location.state

    return(
        <React.Fragment>
            <h1 className="title-career">Bienvenido {DirectorInfo.fullName}</h1>
            <CardDashBoard
                picLink={picEditContent}
                altTxt={""}
                txtCard={"Subir contenido  o editar carreras"}
                navToSelector={() => {navigate("/SelectorCareer")}}
            />
        </React.Fragment>
    )
}
