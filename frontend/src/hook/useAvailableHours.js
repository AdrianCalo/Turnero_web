import { useState,useEffect } from "react";

export const useAvailableHours=(selectedDate)=>{

    const [availableHours,setAvailableHours]=useState([]);

    useEffect(()=>{
        //definimos el rango de horas
        const hours=[];
        const openingHours=[
            {start:'08:00',end:'13:00'},
            {start:'16:00',end:'21:00'}
        ];

        //comprobamos si hay una fecha seleccionada
        if(selectedDate){
            const day= selectedDate.getDay();//0= domingo, 1= lunes...

            //si es domingo, no mostramos horas disponibles
            if(day===0){
                setAvailableHours([]);
                return;
            }
            //aca agregamos logica para dias feriados

            //generar horas disponibles segun el horario de apertura

            openingHours.forEach(({start,end})=>{
                const startHour=new Date(selectedDate);
                const endHour= new Date(selectedDate);

                const[startHourH, startHourM]= start.split(':');
                const[endHourH, endHourM]=end.split(':');

                startHour.setHours(startHourH,startHourM);
                endHour.setHours(endHourH,endHourM);

                for(let hour=new Date(startHour); hour<= endHour; hour.setMinutes(hour.getMinutes()+30)){
                    hours.push(new Date(hour));//aca se añade al array hours
                }
            });
            //aca podemos filtrar las horas que ya estan ocupadas, si tenes una lista de reserva
            setAvailableHours(hours);
        }else{
            setAvailableHours([]);
        }
    },[selectedDate]);
    return availableHours;
}