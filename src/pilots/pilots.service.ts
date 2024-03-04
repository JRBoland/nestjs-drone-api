import { Injectable } from '@nestjs/common';
import { Pilot } from './pilot.entity';
import { CreatePilotDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PilotsService {
  constructor(
    @InjectRepository(Pilot)
    private pilotsRepository: Repository<Pilot>,
  ) {}

  async create(createPilotDto: CreatePilotDto): Promise<Pilot> {
    const pilot = this.pilotsRepository.create(createPilotDto);
    await this.pilotsRepository.save(pilot);
    return pilot;
  }

  async findAll(): Promise<Pilot[]> {
    return await this.pilotsRepository.find();
  }
}
