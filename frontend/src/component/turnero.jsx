/*implementamos el componente turnero que permite seleccionar 
un dia , deshabilitando los domingos y los feriados*/
import React, { useState } from "react";
import DatePicker, { registerLocale } from 'react-datepicker';
//instalar dependencia con npm i react-datepicker
import 'react-datepicker/dist/react-datepicker.css'
/*debes importar los estilos CSS de react-datepicker */

/* Configurar el Idioma en Español (Opcional)
Si también quieres que los días y los meses aparezcan en español 
(en lugar de inglés), puedes usar react-datepicker con la configuración 
de localización.*/
//paso 1: instalar: npm i date-fns 
//paso 2: importamos el idioma español (es) y configuramos en el componenete DatePicker
import { es } from 'date-fns/locale';//importa el idioma español
import {useDisabledDays} from '../hook/useDisabledDays';
//importamos el componente hourselector
import HourSelector from "./hourSelector";
import { useAvailableHours } from "../hook/useAvailableHours";

//registrar el idiioma español para que funcione
registerLocale('es',es);

const Turnero= ()=>{
    const {selectedDate,setSelectedDate,isDayDisabled}= useDisabledDays();
    const availableHours= useAvailableHours(selectedDate);
    const [selectedHour,setSelectedHour]=useState(null);
    const [customerData,setCustomerData]=useState({
        nombre:'',
        apellido:'',
        contacto:''
    });

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setCustomerData((prevData)=>({
            ...prevData,
            [name]:value
        }));
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();

        try{
            //paso 1: crea el cliente
            const customerResponse= await fetch('http://localhost:3000/customers/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(customerData)
            });

            const customer= await customerResponse.json();
        
        //verificamos si el cliente fue creado correctamente y contiene el "clienteId"
            if(!customer || !customer.clienteId){
                throw new Error('error al crear el cliente')
            }
        //paso 2: crear turno

        const appointmentData={
            fecha:selectedDate.toLocaleDateString('es-AR'),//para convertir la fecha al formato correcto
            hora:selectedHour,
            customer:customer.clienteId //enlazamos e truno con el ID del cliente
        };
        //aca hacemos llamada a la API para guardar el turno

        const appointmentresponse= await fetch('http://localhost:3000/appointment/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(appointmentData),
            });
          
            const result= await appointmentresponse.json();
            console.log('Turno guardado', result);
            //puedes mostrar un mensaje de exito al usuario aca
        }catch (error){
            console.error('Error al guardar turno:', error);
            //maneja el error aca, podes mostrar mensjae al usuario
        }
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                 {/* Formulario para los datos del cliente */}
                <div>
                    <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
                    <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required />
                    <input type="tel" name="contacto" placeholder="Teléfono" onChange={handleChange} required />
                    <button type="submit">Reservar Turno</button>
                </div>
                <div>
                    <h2>Selecciona un dia</h2>
                    <DatePicker
                    selected={selectedDate}
                    onChange={(date)=>setSelectedDate(date)}
                    filterDate={isDayDisabled}//filtra dias disponibles
                    placeholderText="Elige un dia"
                    dateFormat={'dd-MM-yyyy'}//formato fecha argentina
                    //dd(minuscula),MM(mayuscula),yyyy(minucula)
                    locale={'es'}//configuracion de localizacion español
                    />
                    {selectedDate && <p> Has seleccionado: {selectedDate.toDateString('es-AR')}</p>}

                    {/*integramos el selector de horas */}
                    <HourSelector 
                    selectedDate={selectedDate}
                    setSelectedHour={setSelectedHour}
                    availableHours={availableHours}
                    selectedHour={selectedHour}/>
                </div>
            </form>
        </>
    );
};

export default Turnero;