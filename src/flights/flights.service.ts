import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './flight.entity';
import { CreateFlightDto } from './dto';
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
    // First, create a new Flight instance without setting relationships
    const flight = this.flightsRepository.create({
      flight_date: createFlightDto.flight_date,
    });

    // If pilot_id is provided, fetch the Pilot entity and associate it
    if (createFlightDto.pilot_id) {
      const pilot = await this.pilotRepository.findOneBy({
        id: createFlightDto.pilot_id,
      });
      if (!pilot) {
        throw new Error('Pilot not found'); // Or handle this more gracefully
      }
      flight.pilot = pilot;
    }

    // Similarly, handle the Drone relationship
    if (createFlightDto.drone_id) {
      const drone = await this.droneRepository.findOneBy({
        id: createFlightDto.drone_id,
      });
      if (!drone) {
        throw new Error('Drone not found'); // Or handle this more gracefully
      }
      flight.drone = drone;
    }

    // Now that relationships are set up, save the Flight entity
    await this.flightsRepository.save(flight);

    return flight;
  }

  async findAll(): Promise<Flight[]> {
    return await this.flightsRepository.find({ relations: ['pilot', 'drone'] });
  }
}
