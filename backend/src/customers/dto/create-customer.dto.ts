import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    nombre:string;

    @IsNotEmpty()
    @IsString()
    apellido:string;

    @IsNotEmpty()
    @IsString()
    contacto:string;
}
