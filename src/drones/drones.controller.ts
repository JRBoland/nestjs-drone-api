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
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
//import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
//import { createDroneSchema } from './schema/create-drone.schema';
//import { CacheInterceptor } from 'src/common/interceptors/cache.interceptor';
//import { ErrorsInterceptor } from 'src/common/interceptors/errors.interceptor';
//import { TimeoutInterceptor } from 'src/common/interceptors/timeout.interceptor';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@UseGuards(RolesGuard)
@Controller('drones')
export class DronesController {
  constructor(private dronesService: DronesService) {}

  //@Post()
  //@UsePipes(new ZodValidationPipe(createDroneSchema))
  //async create(@Body() createDroneDto: CreateDroneDto) {
  //  this.dronesService.create(createDroneDto);
  //}

  @Post()
  @Roles(['admin'])
  //@UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createDroneDto: CreateDroneDto) {
    console.log('running drones create()');
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
  async findOne(@Param('id', new ParseIntPipe()) id: string) {
    console.log('running drones findOne()');
    return `This action returns a #${id} drone`;
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateDroneDto: UpdateDroneDto,
  ) {
    return `This action updates a #${id} drone`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} drone`;
  }
}
