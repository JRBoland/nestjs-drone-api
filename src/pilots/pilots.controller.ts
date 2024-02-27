import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePilotDto, UpdatePilotDto } from './dto';
import { PilotsService } from './pilots.service';
import { Pilot } from './interfaces/pilot.interface';

@Controller('pilots')
export class PilotsController {
  constructor(private pilotsService: PilotsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createPilotDto: CreatePilotDto) {
    this.pilotsService.create(createPilotDto);
  }

  @Get()
  async findAll(): Promise<Pilot[]> {
    return this.pilotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return `This action returns a #${id} pilot`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePilotDto: UpdatePilotDto) {
    return `This action updates a #${id} pilot`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} pilot`;
  }
}
