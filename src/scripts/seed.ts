import { AppDataSource } from '../db/data-source';
import { seedDrivers } from '../db/seeds/driver.seed';
import { seedPassengers } from '../db/seeds/passenger.seed';
import { seedTrips } from '../db/seeds/trip.seed';

AppDataSource.initialize()
  .then(async () => {
    console.log('📦 Running seeders...');
    await seedDrivers(AppDataSource);
    await seedPassengers(AppDataSource);
    await seedTrips(AppDataSource);
    await AppDataSource.destroy();
    console.log('🌱 Seeders finished!');
  })
  .catch((err) => {
    console.error('❌ Error running seeders', err);
  });
