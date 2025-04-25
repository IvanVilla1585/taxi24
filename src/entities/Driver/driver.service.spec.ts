import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';

import { DriverService } from './driver.service';
import { DriverRepository } from './driver.repository';
import { Driver } from './driver.entity';

// mock data
import {
  driver1,
  driver2,
  filters,
  drivers,
  createdDriver1,
  createdDriver2,
  driverToUpdate,
} from '../../../test/mocks/data/driver';

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('DriverService', () => {
  let service: DriverService;
  let repository: jest.Mocked<DriverRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: DriverRepository,
          useValue: {
            findOneBy: jest.fn(),
            createWithLocation: jest.fn(),
            updateData: jest.fn(),
            delete: jest.fn(),
            findAndPaginate: jest.fn(),
            findNearbyDrivers: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DriverService>(DriverService);
    repository = module.get(DriverRepository);
  });

  describe('findAndPaginate', () => {
    it('should return paginated drivers', async () => {
      repository.findAndPaginate.mockResolvedValue([drivers as Driver[], 2]);

      const result = await service.findAndPaginate(filters);

      expect(result).toEqual({
        data: [createdDriver1, createdDriver2],
        total: 2,
      });
    });
  });

  describe('findNearbyDrivers', () => {
    it('should return drivers near a location', async () => {
      const mockDrivers = [createdDriver2] as Driver[];
      repository.findNearbyDrivers.mockResolvedValue(mockDrivers);

      const result = await service.findNearbyDrivers(1.23, 4.56, 3000);

      expect(result).toEqual(mockDrivers);
    });
  });

  describe('findById', () => {
    it('should return driver by ID', async () => {
      repository.findOneBy.mockResolvedValueOnce(createdDriver1 as Driver);

      const driver = await service.findById(1);

      expect(driver).toEqual(createdDriver1);
    });

    it('should throw if driver does not exist', async () => {
      repository.findOneBy.mockResolvedValueOnce(null);

      await expect(service.findById(1)).rejects.toThrow(
        'The driver does not exist',
      );
    });
  });

  describe('create', () => {
    it('should throw if driver already exists', async () => {
      repository.findOneBy.mockResolvedValueOnce(createdDriver1 as Driver);

      await expect(service.create(driver1)).rejects.toThrow(
        'A driver with the provided details already exists',
      );
    });

    it('should hash the password and create the driver', async () => {
      repository.findOneBy.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      repository.createWithLocation.mockResolvedValue(createdDriver2 as Driver);

      const result = await service.create(driver2);

      expect(bcrypt.hash).toHaveBeenCalledWith('CarlosPass789', 10);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.createWithLocation).toHaveBeenCalledWith({
        ...driver2,
        password: 'hashed_password',
      });
      expect(result).toEqual(createdDriver2);
    });
  });

  describe('updateById', () => {
    it('should throw if driver does not exist', async () => {
      repository.findOneBy.mockResolvedValueOnce(null);

      await expect(service.updateById(3, driverToUpdate)).rejects.toThrow(
        'The driver does not exist',
      );
    });

    it('should update the driver', async () => {
      const driverUpdated = { ...createdDriver1, ...driverToUpdate };
      repository.findOneBy.mockResolvedValueOnce(createdDriver1 as Driver);
      repository.updateData.mockResolvedValueOnce(driverUpdated as Driver);

      const result = await service.updateById(1, driverToUpdate);

      expect(result).toEqual(driverUpdated);
    });
  });

  describe('deleteById', () => {
    it('should throw if driver does not exist', async () => {
      repository.findOneBy.mockResolvedValueOnce(null);

      await expect(service.deleteById(1)).rejects.toThrow(
        'The driver does not exist',
      );
    });

    it('should delete and return the driver', async () => {
      repository.findOneBy.mockResolvedValueOnce(createdDriver2 as Driver);

      const result = await service.deleteById(2);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.delete).toHaveBeenCalledWith(2);
      expect(result).toEqual(createdDriver2);
    });
  });
});
