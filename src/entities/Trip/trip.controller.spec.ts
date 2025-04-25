import { Test, TestingModule } from '@nestjs/testing';

import { TripController } from './trip.controller';
import { TripService } from './trip.service';

// mocks
import {
  trip2,
  trips,
  filters,
  createdTrip1,
  createdTrip2,
  tripToUpdate,
} from '../../../test/mocks/data/trip';

describe('TripController', () => {
  let controller: TripController;
  let service: TripService;

  const mockTripService = {
    findAndPaginate: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: TripService,
          useValue: mockTripService,
        },
      ],
    }).compile();

    controller = module.get<TripController>(TripController);
    service = module.get<TripService>(TripService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAndPaginate', () => {
    it('should return paginated trips', async () => {
      const result = { data: trips, total: 2 };
      mockTripService.findAndPaginate.mockResolvedValue(result);

      const response = await controller.findAndPaginate(filters);
      expect(response).toEqual(result);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAndPaginate).toHaveBeenCalledWith(filters);
    });
  });

  describe('findById', () => {
    it('should return a trip by id', async () => {
      mockTripService.findById.mockResolvedValue(createdTrip1);

      const response = await controller.findById({ id: 1 });
      expect(response).toEqual(createdTrip1);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a trip', async () => {
      mockTripService.create.mockResolvedValue(createdTrip2);

      const response = await controller.create(trip2);
      expect(response).toEqual(createdTrip2);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(trip2);
    });
  });

  describe('updateById', () => {
    it('should update and return the trip', async () => {
      mockTripService.updateById.mockResolvedValue({
        ...createdTrip1,
        ...tripToUpdate,
      });

      const response = await controller.updateById({ id: 1 }, tripToUpdate);
      expect(response.status).toEqual(tripToUpdate.status);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.updateById).toHaveBeenCalledWith(1, tripToUpdate);
    });
  });

  describe('deleteById', () => {
    it('should delete a trip', async () => {
      mockTripService.deleteById.mockResolvedValue(undefined);

      await expect(controller.deleteById({ id: 1 })).resolves.toBeUndefined();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.deleteById).toHaveBeenCalledWith(1);
    });
  });
});
