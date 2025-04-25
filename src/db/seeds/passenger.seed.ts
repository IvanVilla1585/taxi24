import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Passenger } from '../../entities/Passenger/passenger.entity';
import { DocumentType } from '../../types/enums/document-type.enum';

export async function seedPassengers(dataSource: DataSource) {
  const repo = dataSource.getRepository(Passenger);
  const drivers = repo.create([
    {
      name: 'John Doe',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.hash('password123', 10),
      document: '1234567890492',
      phoneNumber: '1234567890',
      documentType: DocumentType.CC,
    },
    {
      name: 'Jane Smith',
      lastName: 'Smith',
      email: 'janesmith@example.com',
      password: await bcrypt.hash('password123', 10),
      document: '9876543211987',
      phoneNumber: '0987654321',
      documentType: DocumentType.CC,
    },
    {
      name: 'Carlos González',
      lastName: 'González',
      email: 'carlosgonzalez@example.com',
      password: await bcrypt.hash('password123', 10),
      document: '1122334450365',
      phoneNumber: '5678901234',
      documentType: DocumentType.CC,
    },
    {
      name: 'Maria Fernández',
      lastName: 'Fernández',
      email: 'mariafernandez@example.com',
      password: await bcrypt.hash('password123', 10),
      document: '9988776652865',
      phoneNumber: '2345678901',
      documentType: DocumentType.CC,
    },
    {
      name: 'Pedro Martínez',
      lastName: 'Martínez',
      email: 'pedromartinez@example.com',
      password: await bcrypt.hash('password123', 10),
      document: '556677889045',
      phoneNumber: '3456789012',
      documentType: DocumentType.CC,
    },
    {
      name: 'Laura López',
      lastName: 'López',
      email: 'lauralopez@example.com',
      password: await bcrypt.hash('password123', 10),
      document: '667788990',
      phoneNumber: '4567890123376',
      documentType: DocumentType.CC,
    },
    {
      name: 'David Pérez',
      lastName: 'Pérez',
      email: 'davidperez@example.com',
      password: await bcrypt.hash('password123', 10),
      document: '334455667890',
      phoneNumber: '5678901234',
      documentType: DocumentType.CC,
    },
    {
      name: 'Ana Rodríguez',
      lastName: 'Rodríguez',
      email: 'anarodriguez@example.com',
      password: await bcrypt.hash('password123', 10),
      document: '223344556987',
      phoneNumber: '6789012345',
      documentType: DocumentType.CC,
    },
    {
      name: 'Miguel Sánchez',
      lastName: 'Sánchez',
      email: 'miguelsanchez@example.com',
      password: await bcrypt.hash('password123', 10),
      document: '889977665765',
      phoneNumber: '7890123456',
      documentType: DocumentType.CC,
    },
    {
      name: 'Isabel García',
      lastName: 'García',
      email: 'isabelgarcia@example.com',
      password: await bcrypt.hash('password123', 10),
      document: '556677224345',
      phoneNumber: '8901234567',
      documentType: DocumentType.CC,
    },
  ]);

  await repo.save(drivers);
  console.log('Passengers seeded');
}
