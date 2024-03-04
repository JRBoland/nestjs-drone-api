import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Drone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weight: number;
}
