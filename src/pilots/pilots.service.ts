import { Injectable } from '@nestjs/common';
import { Pilot } from './pilot.entity';
import { CreatePilotDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from '../flights/flight.entity';

@Injectable()
export class PilotsService {
  constructor(
    @InjectRepository(Pilot)
    private pilotsRepository: Repository<Pilot>,
    @InjectRepository(Flight)
    private flightsRepository: Repository<Flight>,
  ) {}

  async create(createPilotDto: CreatePilotDto): Promise<Pilot> {
    const pilot = this.pilotsRepository.create(createPilotDto);
    await this.pilotsRepository.save(pilot);
    return pilot;
  }

  //async findAllPilotsWithFlightCount(): Promise<Pilot[]> {
  //  const pilots = await this.pilotsRepository.find();
  //  for (const pilot of pilots) {
  //    const flightCount = await this.getFlightsRecorded//(pilot.id); // Calculate flights recorded
  //    pilot.flights_recorded = flightCount; //  add flight //count to pilot entity
  //  }
  //  return pilots;
  //}

  async getFlightsRecorded(pilotId: number): Promise<number> {
    const count = await this.flightsRepository.count({
      where: { pilot: { id: pilotId } },
    });
    return count;
  }

  //async findAll(): Promise<Pilot[]> {
  //  return await this.pilotsRepository.find();
  //}

  async findAll(): Promise<any[]> {
    // Consider defining a specific type or interface for the return value
    const pilots = await this.pilotsRepository.find();
    const pilotsWithFlightCount = await Promise.all(
      pilots.map(async (pilot) => {
        const flightCount = await this.getFlightsRecorded(pilot.id);
        return {
          ...pilot, // Spread the existing pilot properties
          flights_recorded: flightCount, // Add the flights_recorded property
        };
      }),
    );
    return pilotsWithFlightCount;
  }
}
