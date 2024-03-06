import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './flight.entity';
import { CreateFlightDto, UpdateFlightDto } from './dto';
import { Pilot } from '../pilots/pilot.entity';
import { Drone } from '../drones/drone.entity';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private flightsRepository: Repository<Flight>,
    @InjectRepository(Pilot) // Inject the Pilot repository
    private pilotRepository: Repository<Pilot>,
    @InjectRepository(Drone) // Inject the Drone repository
    private droneRepository: Repository<Drone>,
  ) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    // Set flight_date to today's date if undefined
    if (!createFlightDto.flight_date) {
      createFlightDto.flight_date = new Date();
    }

    // handling flight_location and setting default value
    if (createFlightDto.flight_location === undefined) {
      createFlightDto.flight_location = 'No location specified';
    }

    // handling footage_recorded and setting default value
    if (createFlightDto.footage_recorded === undefined) {
      createFlightDto.footage_recorded = false;
    }

    const flight = this.flightsRepository.create(createFlightDto);

    // locate pilot id
    if (createFlightDto.pilot_id) {
      const pilot = await this.pilotRepository.findOneBy({
        id: createFlightDto.pilot_id,
      });
      if (!pilot) {
        throw new Error('Pilot not found');
      }
      flight.pilot = pilot;
    }

    // locate drone id
    if (createFlightDto.drone_id) {
      const drone = await this.droneRepository.findOneBy({
        id: createFlightDto.drone_id,
      });
      if (!drone) {
        throw new Error('Drone not found');
      }
      flight.drone = drone;
    }

    await this.flightsRepository.save(flight);
    return flight;
  }

  async findAll(): Promise<Flight[]> {
    return await this.flightsRepository.find({ relations: ['pilot', 'drone'] });
  }

  async findOne(id: number): Promise<Flight> {
    const flight = await this.flightsRepository.findOne({ where: { id } });
    if (!flight) {
      throw new NotFoundException(`Flight #${id} not found`);
    }
    return flight;
  }

  async update(id: number, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const flight = await this.flightsRepository.preload({
      id: id,
      ...updateFlightDto,
    });

    if (!flight) {
      throw new NotFoundException(`Flight #${id} not found`);
    }

    await this.flightsRepository.save(flight);
    return flight;
  }

  async remove(id: number): Promise<void> {
    const result = await this.flightsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Flight #${id} not found`);
    }
  }
}
