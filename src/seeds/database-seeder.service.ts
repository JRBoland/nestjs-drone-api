import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Pilot } from '../pilots/pilot.entity';
import { Drone } from '../drones/drone.entity';
//import { Flight } from 'src/flights/flight.entity';

@Injectable()
export class DatabaseSeederService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Pilot) private pilotRepository: Repository<Pilot>,
    @InjectRepository(Drone) private droneRepository: Repository<Drone>,
    //@InjectRepository(Flight) private flightRepository: Repository<Flight>,
    // Inject other repositories
  ) {}

  async seed() {
    // TO CHECK IF ALREADY SEEDED:
    const userCount = await this.userRepository.count();
    if (userCount > 0) {
      console.log('Seeding already performed. Skipping...');
      return;
    }

    // TO SEED DB: SEED_DB=true npm run start:dev
    console.log('Starting DB seed');
    // Create and save your seed data
    const users = this.userRepository.create([
      {
        username: 'maria',
        password: 'password123',
        roles: ['user'],
      },
      {
        username: 'john',
        password: 'password123',
        roles: ['admin'],
      },
    ]);
    await this.userRepository.save(users);

    const pilots = this.pilotRepository.create([
      {
        name: 'Test Pilot Ronald',
        age: 28,
      },
      { name: 'Test Pilot Jenny', age: 35 },
    ]);
    await this.pilotRepository.save(pilots);

    const drones = this.droneRepository.create([
      {
        name: 'DJI Tester Uno',
        weight: 210,
      },
      { name: 'DJI Tester Deus', weight: 195 },
    ]);
    await this.droneRepository.save(drones);

    //const flights = this.flightRepository.create([
    //  {
    //    pilot_id: 1,
    //    drone_id: 1,
    //    flight_location: '',
    //    footage_recorded: '',
    //  },
    //  {
    //    pilot_id: 2,
    //    drone_id: 2,
    //    flight_location: '',
    //    footage_recorded: '',
    //  },
    //  {
    //    pilot_id: 1,
    //    drone_id: 2,
    //    flight_location: '',
    //    footage_recorded: '',
    //  },
    //]);
    //await this.flightRepository.save(flights);
  }
}
