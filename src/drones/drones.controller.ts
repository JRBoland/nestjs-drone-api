import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  UseInterceptors,
  UseFilters,
  UseGuards,
  Res,
} from '@nestjs/common';
import { CreateDroneDto, UpdateDroneDto } from './dto';
import { DronesService } from './drones.service';
import { Drone, DroneResponse } from './interfaces/drone.interface';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ValidationPipe } from '../common/pipes/validation.pipe';
//import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
//import { createDroneSchema } from './schema/create-drone.schema';
//import { CacheInterceptor } from 'src/common/interceptors/cache.interceptor';
//import { ErrorsInterceptor } from 'src/common/interceptors/errors.interceptor';
//import { TimeoutInterceptor } from 'src/common/interceptors/timeout.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller('drones')
export class DronesController {
  constructor(private dronesService: DronesService) {}

  //@Post()
  //@UsePipes(new ZodValidationPipe(createDroneSchema))
  //async create(@Body() createDroneDto: CreateDroneDto) {
  //  this.dronesService.create(createDroneDto);
  //}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(ValidationPipe)
  async create(@Body() createDroneDto: CreateDroneDto): Promise<DroneResponse> {
    console.log('Running drones create');
    const drone = await this.dronesService.create(createDroneDto);
    return { message: 'Drone created', drone };
  }

  //@Get()
  //findAll(@Query() query: ListAllEntities) {
  //  return `This action returns all drones (limit: ${query.limit} items)`;
  //}

  @Get()
  async findAll(): Promise<Drone[]> {
    console.log('Running drones findAll');
    return this.dronesService.findAll();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(`Running drones findOne(#${id})`);
    const drone = await this.dronesService.findOne(id);
    return { message: drone };
  }

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDroneDto: UpdateDroneDto,
  ): Promise<DroneResponse> {
    console.log(`Running update drone #${id}`);
    const drone = await this.dronesService.update(id, updateDroneDto);
    return { message: `Drone #${id} updated: `, drone };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: number) {
    console.log(`Running remove drone #${id} and all associated flights`);
    await this.dronesService.remove(id);
    return {
      message: `Drone #${id} and all associated flights deleted`,
    };
  }
}
