import { Module } from '@nestjs/common';
//importaciones necesarias
 
import { CustomersModule } from './customers/customers.module';
import { AppointmentModule } from './appointment/appointment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/entities/customer.entity';
import { Appointment } from './appointment/entities/appointment.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'Turnero_db',
      entities:[Customer,Appointment],
      synchronize:false,//esta en false para que no joda que las tablas ya esta creadas
      //revisar como poder solucionar de una mejor manera
    }),
    CustomersModule,
    AppointmentModule,
  ],
})
export class AppModule {}
