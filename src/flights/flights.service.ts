import { Injectable } from '@nestjs/common';
import { Flight } from './interfaces/flight.interface';

@Injectable()
export class FlightsService {
  private readonly flights: Flight[] = [];

  create(flight: Flight) {
    this.flights.push(flight);
  }

  findAll(): Flight[] {
    return this.flights;
  }
}
