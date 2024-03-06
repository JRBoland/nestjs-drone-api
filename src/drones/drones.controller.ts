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
} from '@nestjs/common';
import { CreateDroneDto, UpdateDroneDto } from './dto';
import { DronesService } from './drones.service';
import { Drone } from './interfaces/drone.interface';
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
  async create(@Body() createDroneDto: CreateDroneDto): Promise<Drone> {
    console.log('running drones create()');
    return await this.dronesService.create(createDroneDto);
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
  @UsePipes(ValidationPipe)
  async findOne(@Param('id', new ParseIntPipe()) id: string) {
    console.log('running drones findOne()');
    return `This action returns a #${id} drone`;
  }

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDroneDto: UpdateDroneDto,
  ): Promise<Drone> {
    console.log(`This action updates drone #${id}`);
    return await this.dronesService.update(id, updateDroneDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(ValidationPipe)
  remove(@Param('id') id: number) {
    console.log(`This action removes drone #${id} and all associated flights`);
    return this.dronesService.remove(id);
  }
}
