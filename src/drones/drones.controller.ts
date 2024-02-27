import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseFilters,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { CreateDroneDto, UpdateDroneDto } from './dto';
import { DronesService } from './drones.service';
import { Drone } from './interfaces/drone.interface';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { createDroneSchema } from './schema/create-drone.schema';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@Controller('drones')
export class DronesController {
  constructor(private dronesService: DronesService) {}

  //@Post()
  //@UsePipes(new ZodValidationPipe(createDroneSchema))
  //async create(@Body() createDroneDto: CreateDroneDto) {
  //  this.dronesService.create(createDroneDto);
  //}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createDroneDto: CreateDroneDto) {
    this.dronesService.create(createDroneDto);
  }

  //@Get()
  //findAll(@Query() query: ListAllEntities) {
  //  return `This action returns all drones (limit: ${query.limit} items)`;
  //}

  @Get()
  async findAll(): Promise<Drone[]> {
    return this.dronesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `This action returns a #${id} drone`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDroneDto: UpdateDroneDto) {
    return `This action updates a #${id} drone`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} drone`;
  }
}
