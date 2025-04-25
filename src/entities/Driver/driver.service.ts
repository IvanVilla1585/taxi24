import * as Boom from '@hapi/boom';
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

import { DriverRepository } from './driver.repository';
import { Driver } from '../../entities/Driver/driver.entity';

// types
import { IBaseService } from '../../types/interfaces/base-service.interface';
import {
  CreateDriverDto,
  UpdateDriverDto,
  FiltersDriverDto,
  PaginationDriverResponse,
} from '../../types/dtos/driver.dto';

@Injectable()
export class DriverService
  implements
    IBaseService<
      Driver,
      FiltersDriverDto,
      CreateDriverDto,
      UpdateDriverDto,
      PaginationDriverResponse
    >
{
  constructor(private readonly repository: DriverRepository) {}

  async find(filters: FiltersDriverDto): Promise<Driver[]> {
    Object.entries(filters).forEach(([key, value]) => {
      // user[key] = value;
      console.log(key, value);
    });
    return Promise.resolve([]);
  }

  async findAndPaginate(
    filters: FiltersDriverDto,
  ): Promise<PaginationDriverResponse> {
    const [drivers, total] = await this.repository.findAndPaginate(filters);

    return {
      data: drivers,
      total: total,
    };
  }

  findNearbyDrivers(
    latitude: number,
    longitude: number,
    radius = 3000,
  ): Promise<Driver[]> {
    return this.repository.findNearbyDrivers(latitude, longitude, radius);
  }

  async findById(id: number): Promise<Driver> {
    const driver = await this.repository.findOneBy({ id });

    if (!driver) {
      throw Boom.notFound('The driver does not exist');
    }

    return driver;
  }

  async create(data: CreateDriverDto): Promise<Driver> {
    const result = await this.repository.findOneBy([
      { email: data.email },
      { document: data.document },
    ]);

    if (result) {
      throw Boom.badData('A driver with the provided details already exists');
    }

    data.password = await bcrypt.hash(data.password, 10);

    return this.repository.createWithLocation(data);
  }

  async updateById(id: number, data: UpdateDriverDto): Promise<Driver> {
    const driver = await this.repository.findOneBy({ id });

    if (!driver) {
      throw Boom.notFound('The driver does not exist');
    }

    return this.repository.updateData(id, data);
  }

  async deleteById(id: number): Promise<Driver> {
    const driver = await this.repository.findOneBy({ id });

    if (!driver) {
      throw Boom.notFound('The driver does not exist');
    }

    await this.repository.delete(id);

    return driver;
  }
}
