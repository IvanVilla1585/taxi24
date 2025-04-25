import { Test, TestingModule } from '@nestjs/testing';
import * as Boom from '@hapi/boom';

import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';

// mocks
import {
  filters,
  passenger1,
  passenger2,
  passengers,
  createdPassenger1,
  createdPassenger2,
  passengerToUpdate,
} from '../../../test/mocks/data/passenger';

describe('PassengerController', () => {
  let controller: PassengerController;
  let service: PassengerService;

  const mockService = {
    findAndPaginate: jest.fn().mockResolvedValue({
      data: passengers,
      total: 2,
    }),
    findById: jest.fn().mockResolvedValue(createdPassenger1),
    create: jest.fn().mockResolvedValue(createdPassenger2),
    updateById: jest
      .fn()
      .mockResolvedValue({ ...passenger1, ...passengerToUpdate }),
    deleteById: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassengerController],
      providers: [
        {
          provide: PassengerService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PassengerController>(PassengerController);
    service = module.get<PassengerService>(PassengerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAndPaginate', () => {
    it('should return paginated passengers', async () => {
      const result = await controller.findAndPaginate(filters);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAndPaginate).toHaveBeenCalledWith(filters);
      expect(result).toEqual({ data: passengers, total: 2 });
    });
  });

  describe('findById', () => {
    it('should return a passenger by id', async () => {
      const result = await controller.findById({ id: 1 });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(createdPassenger1);
    });

    it('should throw not found if passenger does not exist', async () => {
      mockService.findById.mockRejectedValueOnce(
        Boom.notFound('The passenger does not exist'),
      );
      await expect(controller.findById({ id: 999 })).rejects.toThrow(
        'The passenger does not exist',
      );
    });
  });

  describe('create', () => {
    it('should create a new passenger', async () => {
      const result = await controller.create(passenger2);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(passenger2);
      expect(result).toEqual(createdPassenger2);
    });

    it('should throw error if passenger already exists', async () => {
      mockService.create.mockRejectedValueOnce(
        Boom.badData('A passenger with the provided details already exists'),
      );
      await expect(controller.create(passenger1)).rejects.toThrow(
        'A passenger with the provided details already exists',
      );
    });
  });

  describe('updateById', () => {
    it('should update and return a passenger', async () => {
      const result = await controller.updateById({ id: 1 }, passengerToUpdate);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.updateById).toHaveBeenCalledWith(1, passengerToUpdate);
      expect(result.name).toBe(passengerToUpdate.name);
    });

    it('should throw error if passenger not found', async () => {
      mockService.updateById.mockRejectedValueOnce(
        Boom.notFound('The passenger does not exist'),
      );

      await expect(
        controller.updateById({ id: 999 }, passengerToUpdate),
      ).rejects.toThrow('The passenger does not exist');
    });
  });

  describe('deleteById', () => {
    it('should delete a passenger', async () => {
      await controller.deleteById({ id: 1 });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.deleteById).toHaveBeenCalledWith(1);
    });

    it('should throw error if passenger not found', async () => {
      mockService.deleteById.mockRejectedValueOnce(
        Boom.notFound('The passenger does not exist'),
      );
      await expect(controller.deleteById({ id: 999 })).rejects.toThrow(
        'The passenger does not exist',
      );
    });
  });
});
