import { Customer } from "src/customers/entities/customer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    turnoId:number;

    @Column()
    fecha:string;

    @Column()
    hora:string;

    @ManyToOne(()=>Customer, customer=>customer.appointment)
    customer:Customer
}
