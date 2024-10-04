import { useState } from "react";

export const useDisabledDays= ()=>{
    const [selectedDate, setSelectedDate]=useState(null);

    //funcion para deshabilitar domingos y feriados
    const isDayDisabled=(date)=>{
        const day= date.getDay();//0=domingo
        const feriados = ['2024-12-25','2024-01-01'];//lista de dias feriados(se peuden ir agregando personalizados)
    
        const formattedDate= date.toISOString().split('T')[0];//formato YYYY-MM-DD

        //deshabilita domingos (day=0) y feriados

        return !(day===0|| feriados.includes(formattedDate));
    //devuelve true solo si el dia es habilitado y false si el dia es domingo o feriado
    };

    return{
        selectedDate,
        setSelectedDate,
        isDayDisabled,
    };
};

/*useDisabledDays: Encapsula toda la lógica relacionada con la selección de días, 
deshabilitando los domingos y feriados. Exporta el selectedDate, setSelectedDate, 
y la función isDayDisabled.*/