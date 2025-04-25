import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Query,
  Delete,
  HttpCode,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { DriverService } from './driver.service';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import {
  filters,
  create,
  update,
  params,
  nearbyFilters,
} from '../../schemas/driver.schema';

// types
import {
  ParamsDto,
  CreateDriverDto,
  UpdateDriverDto,
  FiltersDriverDto,
  FiltersNearbyDriverDto,
  PaginationDriverResponse,
} from '../../types/dtos/driver.dto';
import { Driver } from './driver.entity';
import { IBaseController } from '../../types/interfaces/base-controller.interface';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('drivers')
export class DriverController
  implements
    IBaseController<
      Driver,
      ParamsDto,
      FiltersDriverDto,
      CreateDriverDto,
      UpdateDriverDto,
      PaginationDriverResponse
    >
{
  constructor(private readonly service: DriverService) {}

  @Get()
  async findAndPaginate(
    @Query(new JoiValidationPipe(filters)) filters: FiltersDriverDto,
  ): Promise<PaginationDriverResponse> {
    const response = await this.service.findAndPaginate(filters);

    return response;
  }

  @Get('/nearby')
  async findNearbyDrivers(
    @Query(new JoiValidationPipe(nearbyFilters))
    { longitude, latitude, radius }: FiltersNearbyDriverDto,
  ): Promise<Driver[]> {
    const response = await this.service.findNearbyDrivers(
      latitude,
      longitude,
      radius,
    );

    return response;
  }

  @Get(':id')
  async findById(
    @Param(new JoiValidationPipe(params)) params: ParamsDto,
  ): Promise<Driver> {
    const response = await this.service.findById(params.id);

    return response;
  }

  @Post()
  async create(
    @Body(new JoiValidationPipe(create)) data: CreateDriverDto,
  ): Promise<Driver> {
    const response = await this.service.create(data);

    return response;
  }

  @Patch(':id')
  async updateById(
    @Param(new JoiValidationPipe(params)) params: ParamsDto,
    @Body(new JoiValidationPipe(update))
    data: UpdateDriverDto,
  ): Promise<Driver> {
    const response = await this.service.updateById(params.id, data);

    return response;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteById(
    @Param(new JoiValidationPipe(params)) params: ParamsDto,
  ): Promise<void> {
    await this.service.deleteById(params.id);
  }
}
