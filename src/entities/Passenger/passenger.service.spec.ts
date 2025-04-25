import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';

import { PassengerService } from './passenger.service';
import { PassengerRepository } from './passenger.repository';

// mocks
import {
  filters,
  passengers,
  passenger1,
  passenger2,
  createdPassenger1,
  createdPassenger2,
  passengerToUpdate,
} from '../../../test/mocks/data/passenger';
import { Passenger } from './passenger.entity';

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('PassengerService', () => {
  let service: PassengerService;
  let repository: jest.Mocked<PassengerRepository>;

  const mockRepository = {
    findAndPaginate: jest.fn().mockResolvedValue([passengers, 2]),
    findOneBy: jest.fn(),
    create: jest.fn().mockReturnValue(passenger2),
    save: jest.fn().mockResolvedValue(createdPassenger2),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassengerService,
        {
          provide: PassengerRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PassengerService>(PassengerService);
    repository = module.get(PassengerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAndPaginate', () => {
    it('should return paginated passengers', async () => {
      const result = await service.findAndPaginate(filters);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.findAndPaginate).toHaveBeenCalled();
      expect(result).toEqual({ data: passengers, total: 2 });
    });
  });

  describe('findById', () => {
    it('should return a passenger by ID', async () => {
      repository.findOneBy.mockResolvedValueOnce(
        createdPassenger2 as Passenger,
      );
      const result = await service.findById(2);
      expect(result).toEqual(createdPassenger2);
    });

    it('should throw Boom.notFound if passenger not found', async () => {
      repository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.findById(999)).rejects.toThrow(
        'The passenger does not exist',
      );
    });
  });

  describe('create', () => {
    it('should throw if driver already exists', async () => {
      repository.findOneBy.mockResolvedValueOnce(
        createdPassenger2 as Passenger,
      );

      await expect(service.create(passenger2)).rejects.toThrow(
        'A passenger with the provided details already exists',
      );
    });

    it('should hash the password and create the passenger', async () => {
      repository.findOneBy.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      repository.save.mockResolvedValue(createdPassenger2 as Passenger);

      const result = await service.create(passenger2);

      expect(bcrypt.hash).toHaveBeenCalledWith('CarlosPass789', 10);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.save).toHaveBeenCalledWith({
        ...passenger2,
        password: 'hashed_password',
      });
      expect(result).toEqual(createdPassenger2);
    });
  });

  describe('updateById', () => {
    it('should update and return passenger', async () => {
      const updatedPassenger = { ...passenger1, ...passengerToUpdate };
      repository.findOneBy.mockResolvedValueOnce(
        createdPassenger1 as Passenger,
      );
      repository.save.mockResolvedValue(updatedPassenger as Passenger);

      const result = await service.updateById(1, passengerToUpdate);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result.name).toBe(updatedPassenger.name);
    });

    it('should throw Boom.notFound if passenger not found', async () => {
      repository.findOneBy.mockResolvedValue(null);
      await expect(service.updateById(999, { name: 'X' })).rejects.toThrow(
        'The passenger does not exist',
      );
    });
  });

  describe('deleteById', () => {
    it('should delete and return passenger', async () => {
      repository.findOneBy.mockResolvedValueOnce(
        createdPassenger1 as Passenger,
      );

      const result = await service.deleteById(1);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(createdPassenger1);
    });

    it('should throw Boom.notFound if passenger not found', async () => {
      repository.findOneBy.mockResolvedValue(null);
      await expect(service.deleteById(999)).rejects.toThrow(
        'The passenger does not exist',
      );
    });
  });
});
