import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose, Type } from 'class-transformer';

import { Driver } from '../Driver/driver.entity';
import { Passenger } from '../Passenger/passenger.entity';
import { TripStatus } from '../../types/enums/status.enum';

@Entity()
export class Trip {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  origin: string;

  @Expose()
  @Column()
  destination: string;

  @Expose()
  @Column('float')
  price: number;

  @Expose()
  @Column({ type: 'time', nullable: true })
  startTime?: string;

  @Expose()
  @Column({ type: 'time', nullable: true })
  endTime?: string;

  @Expose()
  @Column({ type: 'enum', enum: TripStatus, default: TripStatus.CREATED })
  status: TripStatus;

  @Expose()
  @Column()
  driverId: number;

  @Expose()
  @Column()
  passengerId: number;

  @Expose()
  @Type(() => Driver)
  @ManyToOne(() => Driver, (driver) => driver.trips)
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @Expose()
  @Type(() => Passenger)
  @ManyToOne(() => Passenger, (passenger) => passenger.trips)
  @JoinColumn({ name: 'passengerId' })
  passenger: Passenger;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;
}
