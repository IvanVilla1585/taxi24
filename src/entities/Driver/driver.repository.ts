import { DataSource, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Driver } from './driver.entity';

// types
import {
  CreateDriverDto,
  FiltersDriverDto,
  UpdateDriverDto,
} from '../../types/dtos/driver.dto';
import { SortDirection } from '../../types/enums/sort.enum';

interface Property {
  [key: string]: string | number | boolean;
}

interface Query {
  where?: Property;
  take?: number;
  skip?: number;
  order?: Property;
}

@Injectable()
export class DriverRepository extends Repository<Driver> {
  constructor(private dataSource: DataSource) {
    super(Driver, dataSource.createEntityManager());
  }
  findAndPaginate({
    limit,
    offset,
    sortBy,
    direction,
    ...filters
  }: FiltersDriverDto) {
    const query: Query = {};

    if (limit) {
      query.take = limit;
    }

    if (offset) {
      query.skip = offset;
    }

    if (sortBy) {
      query.order = { [sortBy]: direction || SortDirection.ASC };
    }

    Object.entries(filters).forEach(([key, value]) => {
      query.where = {
        ...(query.where || {}),
        [key]: value,
      };
    });

    return super.findAndCount(query);
  }

  findNearbyDrivers(
    latitude: number,
    longitude: number,
    radiusMeters: number = 3000,
  ): Promise<Driver[]> {
    return super
      .createQueryBuilder('driver')
      .addSelect(
        `
          ST_Distance(
            driver.location,
            ST_MakePoint(:lng, :lat)::geography
          )
        `,
        'distance',
      )
      .where(
        `
          ST_DWithin(
            driver.location,
            ST_MakePoint(:lng, :lat)::geography,
            :radius
          )
        `,
      )
      .andWhere('"isActive" = :isActive', { isActive: true })
      .orderBy('distance', 'ASC')
      .setParameters({ lng: longitude, lat: latitude, radius: radiusMeters })
      .getMany();
  }

  async createWithLocation(data: CreateDriverDto): Promise<Driver> {
    const { latitude, longitude, ...dataToSave } = data;

    const result: InsertResult = await super
      .createQueryBuilder()
      .insert()
      .into(Driver)
      .values({
        ...dataToSave,
        location: () =>
          `ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)`,
      })
      .returning('*')
      .execute();

    const [createdDriver] = result.raw as Driver[];

    return new Driver(createdDriver);
  }

  async updateData(
    id: number,
    data: Partial<UpdateDriverDto>,
  ): Promise<Driver> {
    const { latitude, longitude, ...dataToUpdate } = data;

    const result: UpdateResult = await super
      .createQueryBuilder()
      .update(Driver)
      .set({
        ...dataToUpdate,
        ...(latitude !== undefined && longitude !== undefined
          ? {
              location: () =>
                `ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)`,
            }
          : {}),
      })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const [updatedDriver] = result.raw as Driver[];

    return new Driver(updatedDriver);
  }
}
