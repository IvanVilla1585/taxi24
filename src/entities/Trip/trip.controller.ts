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

import { TripService } from './trip.service';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { Trip } from './trip.entity';
import { filters, create, update, params } from '../../schemas/trip.schema';
import { IBaseController } from '../../types/interfaces/base-controller.interface';

// types
import {
  ParamsDto,
  CreateTripDto,
  UpdateTripDto,
  FiltersTripDto,
  PaginationTripResponse,
} from '../../types/dtos/trip.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('trips')
export class TripController
  implements
    IBaseController<
      Trip,
      ParamsDto,
      FiltersTripDto,
      CreateTripDto,
      UpdateTripDto,
      PaginationTripResponse
    >
{
  constructor(private readonly service: TripService) {}

  @Get()
  async findAndPaginate(
    @Query(new JoiValidationPipe(filters)) filters: FiltersTripDto,
  ): Promise<PaginationTripResponse> {
    const response = await this.service.findAndPaginate(filters);

    return response;
  }

  @Get(':id')
  async findById(
    @Param(new JoiValidationPipe(params)) params: ParamsDto,
  ): Promise<Trip> {
    const response = await this.service.findById(params.id);

    return response;
  }

  @Post()
  async create(
    @Body(new JoiValidationPipe(create)) data: CreateTripDto,
  ): Promise<Trip> {
    const response = await this.service.create(data);

    return response;
  }

  @Patch(':id')
  async updateById(
    @Param(new JoiValidationPipe(params)) params: ParamsDto,
    @Body(new JoiValidationPipe(update))
    data: UpdateTripDto,
  ): Promise<Trip> {
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
