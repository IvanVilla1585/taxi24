import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Point,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { Trip } from '../Trip/trip.entity';

// types
import { DocumentType } from '../../types/enums/document-type.enum';

@Entity()
export class Driver {
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
  @Column({ nullable: true })
  license: string;

  @Expose()
  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: false,
  })
  location: Point;

  @Expose()
  @OneToMany(() => Trip, (trip) => trip.passenger)
  trips: Trip[];

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Driver>) {
    Object.assign(this, partial);
  }
}
