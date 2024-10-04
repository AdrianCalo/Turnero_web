import { Appointment } from "src/appointment/entities/appointment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    clienteId:number;

    @Column()
    nombre:string;

    @Column()
    apellido:string;

    @Column()
    contacto:string;

    @OneToMany(()=>Appointment,appointment=>appointment.customer)
    appointment:Appointment[];
}
