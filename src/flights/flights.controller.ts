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
import { CreateFlightDto, UpdateFlightDto } from './dto';
import { FlightsService } from './flights.service';
import { Flight } from './interfaces/flight.interface';
import { ParseIntPipe } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@UseGuards(RolesGuard)
@Controller('flights')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  //@Get()
  //findAll(@Query() query: ListAllEntities) {
  //  return `This action returns all flights (limit: ${query.limit} items)`;
  //}

  @Post()
  @Roles(['admin'])
  @UsePipes(ValidationPipe)
  async create(@Body() createFlightDto: CreateFlightDto) {
    console.log('running flights create()');
    this.flightsService.create(createFlightDto);
  }

  @Get()
  async findAll(): Promise<Flight[]> {
    return this.flightsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: string) {
    console.log('running flights findOne()');
    return `This action returns a #${id} flight`;
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    return `This action updates a #${id} flight`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} flight`;
  }
}
