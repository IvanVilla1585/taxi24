import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { Trip } from '../Trip/trip.entity';

// types
import { DocumentType } from '../../types/enums/document-type.enum';

@Entity()
export class Passenger {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column({ nullable: true })
  lastName: string;

  @Expose()
  @Column({ type: 'enum', enum: DocumentType })
  documentType: DocumentType;

  @Expose()
  @Column({ unique: true })
  document: string;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Expose()
  @Column()
  phoneNumber: string;

  @Expose()
  @OneToMany(() => Trip, (trip) => trip.passenger)
  trips: Trip[];

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;
}
