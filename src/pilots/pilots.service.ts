import { Injectable } from '@nestjs/common';
import { Pilot } from './interfaces/pilot.interface';

@Injectable()
export class PilotsService {
  private readonly pilots: Pilot[] = [];

  create(pilot: Pilot) {
    this.pilots.push(pilot);
  }

  findAll(): Pilot[] {
    return this.pilots;
  }
}
