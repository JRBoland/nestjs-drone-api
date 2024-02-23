import { Injectable } from '@nestjs/common';
import { Drone } from './interfaces/drone.interface';

@Injectable()
export class DronesService {
  private readonly drones: Drone[] = [];

  create(drone: Drone) {
    this.drones.push(drone);
  }

  findAll(): Drone[] {
    return this.drones;
  }
}
