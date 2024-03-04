import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDroneDto } from './dto';
import { Drone } from './drones.entity'; // Assuming this is the path to your Drone entity

@Injectable()
export class DronesService {
  constructor(
    @InjectRepository(Drone)
    private dronesRepository: Repository<Drone>,
  ) {}

  async create(createDroneDto: CreateDroneDto): Promise<Drone> {
    const drone = this.dronesRepository.create(createDroneDto);
    await this.dronesRepository.save(drone);
    return drone;
  }

  async findAll(): Promise<Drone[]> {
    return await this.dronesRepository.find();
  }
}
