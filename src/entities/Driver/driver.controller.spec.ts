import { Test, TestingModule } from '@nestjs/testing';
import * as Boom from '@hapi/boom';

import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

// types
import { FiltersNearbyDriverDto } from '../../types/dtos/driver.dto';

// mocks
import {
  driver1,
  drivers,
  createdDriver1,
  createdDriver2,
  driverToUpdate,
  filters,
  driver2,
} from '../../../test/mocks/data/driver';

describe('DriverController', () => {
  let controller: DriverController;
  let service: DriverService;

  const mockService = {
    findAndPaginate: jest.fn().mockResolvedValue({ data: drivers, total: 2 }),
    findNearbyDrivers: jest.fn().mockResolvedValue(drivers),
    findById: jest.fn().mockResolvedValue(createdDriver1),
    create: jest.fn().mockResolvedValue(createdDriver2),
    updateById: jest.fn().mockResolvedValue({ ...driver1, ...driverToUpdate }),
    deleteById: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        {
          provide: DriverService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DriverController>(DriverController);
    service = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAndPaginate', () => {
    it('should return paginated drivers', async () => {
      const result = await controller.findAndPaginate(filters);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAndPaginate).toHaveBeenCalled();
      expect(result).toEqual({ data: drivers, total: 2 });
    });
  });

  describe('findNearbyDrivers', () => {
    it('should return nearby drivers', async () => {
      const filters: FiltersNearbyDriverDto = {
        latitude: 19.4,
        longitude: -99.1,
        radius: 3000,
      };

      const result = await controller.findNearbyDrivers(filters);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findNearbyDrivers).toHaveBeenCalledWith(19.4, -99.1, 3000);
      expect(result).toEqual(drivers);
    });
  });

  describe('findById', () => {
    it('should return a driver', async () => {
      const result = await controller.findById({ id: 1 });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(createdDriver1);
    });

    it('should throw not found if driver does not exist', async () => {
      mockService.findById.mockRejectedValueOnce(
        Boom.notFound('The driver does not exist'),
      );
      await expect(controller.findById({ id: 999 })).rejects.toThrow(
        'The driver does not exist',
      );
    });
  });

  describe('create', () => {
    it('should create a driver', async () => {
      const result = await controller.create(driver2);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(driver2);
      expect(result).toEqual(createdDriver2);
    });

    it('should throw error if driver already exists', async () => {
      mockService.create.mockRejectedValueOnce(
        Boom.badData('A driver with the provided details already exists'),
      );
      await expect(controller.create(driver2)).rejects.toThrow(
        'A driver with the provided details already exists',
      );
    });
  });

  describe('updateById', () => {
    it('should update a driver', async () => {
      const result = await controller.updateById({ id: 1 }, driverToUpdate);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.updateById).toHaveBeenCalledWith(1, driverToUpdate);
      expect(result.name).toBe(driverToUpdate.name);
    });

    it('should throw error if driver not found', async () => {
      mockService.updateById.mockRejectedValueOnce(
        Boom.notFound('The driver does not exist'),
      );

      await expect(
        controller.updateById({ id: 999 }, driverToUpdate),
      ).rejects.toThrow('The driver does not exist');
    });
  });

  describe('deleteById', () => {
    it('should delete a driver', async () => {
      const result = await controller.deleteById({ id: 1 });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.deleteById).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw error if driver not found', async () => {
      mockService.deleteById.mockRejectedValueOnce(
        Boom.notFound('The driver does not exist'),
      );
      await expect(controller.deleteById({ id: 999 })).rejects.toThrow(
        'The driver does not exist',
      );
    });
  });
});
