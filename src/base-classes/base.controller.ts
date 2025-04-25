import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Query,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import Boom from '@hapi/boom';

// types
import { IBaseService } from '../types/interfaces/base-service.interface';

export abstract class BaseController<
  Model,
  Filters,
  CreateBody,
  UpdateBody,
  FiltersResponse,
  Service extends IBaseService<
    Model,
    Filters,
    CreateBody,
    UpdateBody,
    FiltersResponse
  >,
> {
  protected readonly service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  @Get()
  async findAndPaginate(
    @Query() filters: Filters,
  ): Promise<FiltersResponse | Boom.Boom> {
    const response = await this.service.findAndPaginate(filters);

    return response;
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Model> {
    const response = await this.service.findById(id);

    return response;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() data: CreateBody): Promise<Model> {
    const response = await this.service.create(data);

    return response;
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    data: UpdateBody,
  ): Promise<Model> {
    const response = await this.service.updateById(id, data);

    return response;
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<Model> {
    const response = await this.service.deleteById(id);

    return response;
  }
}
