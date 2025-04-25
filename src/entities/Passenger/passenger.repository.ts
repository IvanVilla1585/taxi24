import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Passenger } from './passenger.entity';
import { FiltersDriverDto } from '../../types/dtos/driver.dto';
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
export class PassengerRepository extends Repository<Passenger> {
  constructor(private dataSource: DataSource) {
    super(Passenger, dataSource.createEntityManager());
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

    return this.findAndCount(query);
  }
}
