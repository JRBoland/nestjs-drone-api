import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Flight } from 'src/flights/flight.entity';

@Entity('pilots')
export class Pilot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @OneToMany(() => Flight, (flight) => flight.pilot)
  flights: Flight[];
}
