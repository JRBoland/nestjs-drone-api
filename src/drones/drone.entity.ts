import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Flight } from 'src/flights/flight.entity';

@Entity('drones')
export class Drone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weight: number;

  @OneToMany(() => Flight, (flight) => flight.drone)
  flights: Flight[];
}
