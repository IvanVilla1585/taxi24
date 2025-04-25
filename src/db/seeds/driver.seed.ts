import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Driver } from '../../entities/Driver/driver.entity';
import { DocumentType } from '../../types/enums/document-type.enum';

export async function seedDrivers(dataSource: DataSource) {
  const repo = dataSource.getRepository(Driver);
  const drivers = repo.create([
    {
      name: 'Juan',
      lastName: 'Pérez',
      email: 'juan@example.com',
      password: await bcrypt.hash('123456', 10),
      document: '12345678',
      license: 'ABC123',
      phoneNumber: '111111111',
      documentType: DocumentType.CC,
      location: {
        type: 'Point',
        coordinates: [-74.0701, 4.71],
      },
    },
    {
      name: 'Ana',
      lastName: 'Pérez',
      email: 'ana@example.com',
      password: await bcrypt.hash('123456', 10),
      document: '123456789',
      license: 'ABC123',
      phoneNumber: '111111111',
      documentType: DocumentType.CC,
      location: {
        type: 'Point',
        coordinates: [-74.068, 4.712],
      },
    },
    {
      name: 'Camilo',
      lastName: 'Ruiz',
      email: 'camilo@example.com',
      password: await bcrypt.hash('123456', 10),
      document: '1234567890',
      license: 'ABC123',
      phoneNumber: '111111111',
      documentType: DocumentType.CC,
      isActive: false,
      location: {
        type: 'Point',
        coordinates: [-74.064, 4.712],
      },
    },
    {
      name: 'Juan',
      lastName: 'Ruiz',
      email: 'juan@example.com',
      password: await bcrypt.hash('123456', 10),
      document: '12345678901',
      license: 'ABC123',
      phoneNumber: '111111111',
      documentType: DocumentType.CC,
      isActive: false,
      location: {
        type: 'Point',
        coordinates: [-74.02, 4.75],
      },
    },
    {
      name: 'Sandra',
      lastName: 'Suarez',
      email: 'sandra@example.com',
      password: await bcrypt.hash('123456', 10),
      document: '123456789034',
      license: 'ABC123',
      phoneNumber: '111111111',
      documentType: DocumentType.CC,
      isActive: false,
      location: {
        type: 'Point',
        coordinates: [-74, 4.78],
      },
    },
  ]);

  await repo.save(drivers);
  console.log('Drivers seeded');
}
