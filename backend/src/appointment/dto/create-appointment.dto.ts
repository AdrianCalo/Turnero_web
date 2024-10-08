import { IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsString()
    fecha:string;
    
    @IsNotEmpty()
    @IsString()
    hora:string;
}
