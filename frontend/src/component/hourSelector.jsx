import React from "react";
//import { useAvailableHours } from "../hook/useAvailableHours";
/*
const HourSelector=({selectedDate})=>{
    const availableHours= useAvailableHours(selectedDate);

    return(
        <div>
            <h3>Selecciona una hora</h3>
            {availableHours.length > 0 ? (
                <ul>
                    {availableHours.map((hour, index) => (
                        <li key={index}>
                            {hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay horas disponibles para este día.</p>
            )}
        </div>
    );
};*/

const HourSelector = ({ selectedDate, setSelectedHour, availableHours, selectedHour }) => {
    return (
        <div>
            <select onChange={(e) => setSelectedHour(e.target.value)} value={selectedHour || ""}>
                <option value="">Selecciona una hora</option>
                {availableHours && availableHours.length > 0 ? (
                    availableHours.map((hour, index) => (
                        <option key={index} value={hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}>
                            {hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </option>
                    ))
                ) : (
                    <option disabled>No hay horas disponibles</option>
                )}
            </select>
        </div>
    );
};
export default HourSelector;