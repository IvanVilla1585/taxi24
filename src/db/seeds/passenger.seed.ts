import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Passenger } from '../../entities/Passenger/passenger.entity';
import { DocumentType } from '../../types/enums/document-type.enum';

export async function seedPassengers(dataSource: DataSource) {
  const repo = dataSource.getRepository(Passenger);
  const drivers = repo.create([
    {
      name: 'Luis',
      lastName: 'Pérez',
      email: 'luis@example.com',
      password: await bcrypt.hash('123456', 10),
      document: '12345678',
      phoneNumber: '111111111',
      documentType: DocumentType.CC,
    },
    {
      name: 'Andrea',
      lastName: 'Ruiz',
      email: 'andrea@example.com',
      password: await bcrypt.hash('123456', 10),
      document: '123456789',
      phoneNumber: '111111111',
      documentType: DocumentType.CC,
    },
  ]);

  await repo.save(drivers);
  console.log('Passengers seeded');
}
