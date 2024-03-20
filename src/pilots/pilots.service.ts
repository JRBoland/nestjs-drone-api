import { Injectable, NotFoundException } from '@nestjs/common';
import { Pilot } from './pilot.entity';
import { CreatePilotDto, UpdatePilotDto } from './dto';
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

  async getFlightsRecorded(pilotId: number): Promise<number> {
    const count = await this.flightsRepository.count({
      where: { pilot: { id: pilotId } },
    });
    return count;
  }

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

  async findOne(id: number): Promise<Pilot> {
    const pilot = await this.pilotsRepository.findOne({ where: { id } });

    if (!pilot) {
      throw new NotFoundException(`Pilot #${id} not found`);
    }

    const flightCount = await this.getFlightsRecorded(pilot.id);

    return {
      ...pilot,
      flights_recorded: flightCount,
    };
  }

  async update(id: number, updatePilotDto: UpdatePilotDto): Promise<Pilot> {
    const pilot = await this.pilotsRepository.preload({
      id: id,
      ...updatePilotDto,
    });

    if (!pilot) {
      throw new NotFoundException(`Pilot #${id} not found`);
    }

    await this.pilotsRepository.save(pilot);
    return pilot;
  }

  async remove(id: number): Promise<void> {
    const result = await this.pilotsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pilot #${id} not found`);
    }
  }
}
