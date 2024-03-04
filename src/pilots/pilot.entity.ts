import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pilots')
export class Pilot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
