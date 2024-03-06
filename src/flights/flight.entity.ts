import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pilot } from '../pilots/pilot.entity';
import { Drone } from '../drones/drone.entity';

@Entity('flights')
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  flight_date: Date;

  @Column()
  pilot_id: number;

  @Column()
  drone_id: number;

  @Column({ default: 'No location specified' })
  flight_location: string;

  @Column({ default: false })
  footage_recorded: boolean;

  @ManyToOne(() => Pilot)
  @JoinColumn({ name: 'pilot_id' })
  pilot: Pilot;

  @ManyToOne(() => Drone, (drone) => drone.flights, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'drone_id' })
  drone: Drone;
}
