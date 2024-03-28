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

  async findOne(id: number): Promise<Drone> {
    const drone = await this.dronesRepository.findOne({ where: { id } });
    if (!drone) {
      throw new NotFoundException(`Drone #${id} not found`);
    }
    return drone;
  }

  async search(query: any): Promise<Drone[]> {
    const qb = this.dronesRepository.createQueryBuilder('drone');

    // Process each query parameter individually
    Object.keys(query).forEach((key) => {
      const value = query[key];
      // Check if the field is numeric and not empty
      if ((key === 'weight' || key === 'id') && !isNaN(value) && value !== '') {
        //  comparison for numeric fields
        qb.andWhere(`drone.${key} = :${key}`, { [key]: Number(value) });
      } else if (value !== '') {
        // Only to fields that are expected to be text, ILIKE for case insensitive search
        qb.andWhere(`drone.${key} ILIKE :${key}`, { [key]: `%${value}%` });
      }
    });

    const drones = await qb.getMany();
    return drones;
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
