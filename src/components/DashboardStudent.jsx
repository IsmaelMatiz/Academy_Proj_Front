import React from "react"
import { useLocation } from "react-router-dom"

export function DashStudent() {
    const location = useLocation()
    const student = location.state

    return (
        <React.Fragment>
            {student ? (
                <p>Bienvenido {student.fullName}</p>
            ) : (
                <p>Loading student information...</p>
            )}
        </React.Fragment>
    )
}
