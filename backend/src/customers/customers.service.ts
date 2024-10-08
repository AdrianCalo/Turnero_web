
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private customerRepository:Repository<Customer>){}

  async create(createCustomerDto: CreateCustomerDto):Promise<Customer>{
    const customer= this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);//devolvera un objeto customer
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
