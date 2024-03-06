import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDroneDto } from './dto';
import { UpdateDroneDto } from './dto';
import { Drone } from './drone.entity';

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

  async update(id: number, updateDroneDto: UpdateDroneDto): Promise<Drone> {
    const drone = await this.dronesRepository.preload({
      id: id,
      ...updateDroneDto,
    });

    if (!drone) {
      throw new NotFoundException(`Drone #${id} not found`);
    }

    await this.dronesRepository.save(drone);
    return drone;
  }

  async remove(id: number): Promise<void> {
    const result = await this.dronesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Drone #${id} not found`);
    }
  }
}
