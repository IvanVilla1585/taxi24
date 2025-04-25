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

import { PassengerService } from './passenger.service';
import { Passenger } from './passenger.entity';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import {
  filters,
  create,
  update,
  params,
} from '../../schemas/passenger.schema';

// types
import {
  ParamsDto,
  CreatePassengerDto,
  UpdatePassengerDto,
  FiltersPassengerDto,
  PaginationPassengerResponse,
} from '../../types/dtos/passenger.dto';
import { IBaseController } from '../../types/interfaces/base-controller.interface';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('passengers')
export class PassengerController
  implements
    IBaseController<
      Passenger,
      ParamsDto,
      FiltersPassengerDto,
      CreatePassengerDto,
      UpdatePassengerDto,
      PaginationPassengerResponse
    >
{
  constructor(private readonly service: PassengerService) {}

  @Get()
  async findAndPaginate(
    @Query(new JoiValidationPipe(filters)) filters: FiltersPassengerDto,
  ): Promise<PaginationPassengerResponse> {
    const response = await this.service.findAndPaginate(filters);

    return response;
  }

  @Get(':id')
  async findById(
    @Param(new JoiValidationPipe(params)) params: ParamsDto,
  ): Promise<Passenger> {
    const response = await this.service.findById(params.id);

    return response;
  }

  @Post()
  async create(
    @Body(new JoiValidationPipe(create)) data: CreatePassengerDto,
  ): Promise<Passenger> {
    const response = await this.service.create(data);

    return response;
  }

  @Patch(':id')
  async updateById(
    @Param(new JoiValidationPipe(params)) params: ParamsDto,
    @Body(new JoiValidationPipe(update))
    data: UpdatePassengerDto,
  ): Promise<Passenger> {
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
