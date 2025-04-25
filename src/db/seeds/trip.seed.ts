import { DataSource } from 'typeorm';
import { Trip } from '../../entities/Trip/trip.entity';
import { Driver } from '../../entities/Driver/driver.entity';
import { Passenger } from '../../entities/Passenger/passenger.entity';
import { TripStatus } from '../../types/enums/status.enum';

export const seedTrips = async (dataSource: DataSource) => {
  const tripRepo = dataSource.getRepository(Trip);
  const driverRepo = dataSource.getRepository(Driver);
  const passengerRepo = dataSource.getRepository(Passenger);

  const driver1 = await driverRepo.findOneByOrFail({
    email: 'juan@example.com',
  });
  const passenger1 = await passengerRepo.findOneByOrFail({
    email: 'luis@example.com',
  });

  const driver2 = await driverRepo.findOneByOrFail({
    email: 'ana@example.com',
  });
  const passenger2 = await passengerRepo.findOneByOrFail({
    email: 'andres@example.com',
  });

  const trips = [
    {
      driver: driver1,
      passenger: passenger1,
      origin: 'Calle 10',
      destination: 'Calle 20',
      price: 4500,
      status: TripStatus.CREATED,
      startTime: '09:00:00',
    },
    {
      driver: driver2,
      passenger: passenger2,
      origin: 'Avenida Siempre Viva',
      destination: 'Calle Falsa 123',
      price: 7000,
      status: TripStatus.COMPLETED,
      startTime: '14:30:00',
      endTime: '15:00:00',
    },
    {
      driver: driver2,
      passenger: passenger2,
      origin: 'Avenida Siempre Viva',
      destination: 'Calle Falsa 123',
      price: 7000,
      status: TripStatus.CREATED,
      startTime: '20:30:00',
      endTime: '21:00:00',
    },
    {
      driver: driver2,
      passenger: passenger2,
      origin: 'Avenida Siempre Viva',
      destination: 'Calle Falsa 123',
      price: 7000,
      status: TripStatus.CANCELED,
      startTime: '14:30:00',
    },
  ];

  await tripRepo.save(trips);
  console.log('✅ Seeded trips');
};
