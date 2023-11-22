import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
  create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.save(createCustomerDto);
    return customer;
  }

  async findAll() {
    const customers = await this.customerRepository.find();
    if (customers.length < 1) {
      return [];
    }
    return customers;
  }
}
