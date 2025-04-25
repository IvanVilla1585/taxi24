import * as Boom from '@hapi/boom';
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

import { PassengerRepository } from './passenger.repository';
import { Passenger } from '../../entities/Passenger/passenger.entity';

// types
import { IBaseService } from '../../types/interfaces/base-service.interface';
import {
  CreatePassengerDto,
  UpdatePassengerDto,
  FiltersPassengerDto,
  PaginationPassengerResponse,
} from '../../types/dtos/passenger.dto';

@Injectable()
export class PassengerService
  implements
    IBaseService<
      Passenger,
      FiltersPassengerDto,
      CreatePassengerDto,
      UpdatePassengerDto,
      PaginationPassengerResponse
    >
{
  constructor(private readonly repository: PassengerRepository) {}

  async find(filters: FiltersPassengerDto): Promise<Passenger[]> {
    Object.entries(filters).forEach(([key, value]) => {
      // user[key] = value;
      console.log(key, value);
    });
    return Promise.resolve([]);
  }

  async findAndPaginate(
    filters: FiltersPassengerDto,
  ): Promise<PaginationPassengerResponse> {
    const [passengers, total] = await this.repository.findAndPaginate(filters);

    return {
      data: passengers,
      total: total,
    };
  }

  async findById(id: number): Promise<Passenger> {
    const passenger = await this.repository.findOneBy({ id });

    if (!passenger) {
      throw Boom.notFound('The passenger does not exist');
    }

    return passenger;
  }

  async create(data: CreatePassengerDto): Promise<Passenger> {
    const result = await this.repository.findOneBy([
      { email: data.email },
      { document: data.document },
    ]);

    if (result) {
      throw Boom.badData(
        'A passenger with the provided details already exists',
      );
    }

    data.password = await bcrypt.hash(data.password, 10);

    const passenger = this.repository.create(data);

    return this.repository.save(passenger);
  }

  async updateById(id: number, data: UpdatePassengerDto): Promise<Passenger> {
    const passenger = await this.repository.findOneBy({ id });

    if (!passenger) {
      throw Boom.notFound('The passenger does not exist');
    }

    Object.assign(passenger, data);

    return this.repository.save(passenger);
  }

  async deleteById(id: number): Promise<Passenger> {
    const passenger = await this.repository.findOneBy({ id });

    if (!passenger) {
      throw Boom.notFound('The passenger does not exist');
    }

    await this.repository.delete(id);

    return passenger;
  }
}
