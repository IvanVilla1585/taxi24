import { Test, TestingModule } from '@nestjs/testing';
import * as Boom from '@hapi/boom';

import { TripService } from './trip.service';
import { TripRepository } from './trip.repository';
import { DriverRepository } from '../Driver/driver.repository';
import { PassengerRepository } from '../Passenger/passenger.repository';

// mocks
import {
  trips,
  trip2,
  filters,
  createdTrip1,
  createdTrip2,
  tripToUpdate,
} from '../../../test/mocks/data/trip';
import { createdPassenger1 } from '../../../test/mocks/data/passenger';
import { createdDriver1 } from '../../../test/mocks/data/driver';

describe('TripService', () => {
  let service: TripService;

  const mockTripRepository = {
    findAndPaginate: jest.fn().mockResolvedValue([trips, 2]),
    findOneBy: jest.fn().mockResolvedValue(createdTrip1),
    findActive: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockReturnValue(trip2),
    save: jest.fn().mockImplementation((trip) =>
      Promise.resolve({
        ...createdTrip2,
        ...trip,
      }),
    ),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  const mockDriverRepository = {
    save: jest.fn().mockResolvedValue(createdDriver1),
    findOneBy: jest.fn().mockResolvedValue(createdDriver1),
  };

  const mockPassengerRepository = {
    findOneBy: jest.fn().mockResolvedValue(createdPassenger1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripService,
        { provide: TripRepository, useValue: mockTripRepository },
        { provide: DriverRepository, useValue: mockDriverRepository },
        { provide: PassengerRepository, useValue: mockPassengerRepository },
      ],
    }).compile();

    service = module.get<TripService>(TripService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAndPaginate', () => {
    it('should return paginated trips', async () => {
      const result = await service.findAndPaginate(filters);
      expect(mockTripRepository.findAndPaginate).toHaveBeenCalled();
      expect(result).toEqual({ data: trips, total: 2 });
    });
  });

  describe('findById', () => {
    it('should return a trip by ID', async () => {
      const result = await service.findById(1);
      expect(mockTripRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(createdTrip1);
    });

    it('should throw if trip not found', async () => {
      mockTripRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.findById(1)).rejects.toThrow(
        Boom.notFound('The trip does not exist'),
      );
    });
  });

  describe('create', () => {
    it('should create and return a new trip', async () => {
      const result = await service.create(trip2);
      expect(mockDriverRepository.findOneBy).toHaveBeenCalledWith({ id: 2 });
      expect(mockPassengerRepository.findOneBy).toHaveBeenCalledWith({
        id: 2,
      });
      expect(mockTripRepository.findActive).toHaveBeenCalledWith(2, 2);
      expect(mockTripRepository.save).toHaveBeenCalled();
      expect(result).toEqual(createdTrip2);
    });

    it('should throw if driver or passenger not found', async () => {
      mockDriverRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.create(trip2)).rejects.toThrow(
        Boom.notFound('Driver or passenger not found'),
      );
    });

    it('should throw if active trip exists', async () => {
      mockTripRepository.findActive.mockResolvedValueOnce(createdTrip2);
      await expect(service.create(trip2)).rejects.toThrow(
        Boom.badData(
          'Driver or passenger has a trip in created or in service status',
        ),
      );
    });
  });

  describe('updateById', () => {
    it('should update and return a trip', async () => {
      const result = await service.updateById(1, tripToUpdate);
      expect(result.status).toBe(tripToUpdate.status);
      expect(mockTripRepository.save).toHaveBeenCalled();
    });

    it('should throw if trip not found', async () => {
      mockTripRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.updateById(1, tripToUpdate)).rejects.toThrow(
        Boom.notFound('The trip does not exist'),
      );
    });
  });

  describe('deleteById', () => {
    it('should delete and return the trip', async () => {
      const result = await service.deleteById(1);
      expect(mockTripRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(createdTrip1);
    });

    it('should throw if trip not found', async () => {
      mockTripRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.deleteById(1)).rejects.toThrow(
        Boom.notFound('The trip does not exist'),
      );
    });
  });
});
