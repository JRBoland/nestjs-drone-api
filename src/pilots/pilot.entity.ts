import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Flight } from '../flights/flight.entity';

@Entity('pilots')
export class Pilot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  flights_recorded?: number;

  @OneToMany(() => Flight, (flight) => flight.pilot)
  flights: Flight[];
}
