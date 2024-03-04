import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pilot } from 'src/pilots/pilot.entity';
import { Drone } from 'src/drones/drone.entity';

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

  @ManyToOne(() => Pilot)
  @JoinColumn({ name: 'pilot_id' })
  pilot: Pilot;

  @ManyToOne(() => Drone)
  @JoinColumn({ name: 'drone_id' })
  drone: Drone;
}
