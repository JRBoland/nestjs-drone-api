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
  Query,
} from '@nestjs/common';
import { CreateFlightDto, UpdateFlightDto } from './dto';
import { FlightsService } from './flights.service';
import { Flight, FlightResponse } from './interfaces/flight.interface';
import { ParseIntPipe } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller('flights')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  //regular user can post a flight
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user')
  @UsePipes(ValidationPipe)
  async create(
    @Body() createFlightDto: CreateFlightDto,
  ): Promise<FlightResponse> {
    console.log('running flights create()');
    console.log(createFlightDto);
    const flight = await this.flightsService.create(createFlightDto);
    console.log(createFlightDto);
    return { message: 'Flight created', flight };
  }

  @Get()
  async findAll(): Promise<Flight[]> {
    console.log('Running flights findAll');
    return this.flightsService.findAll();
  }

  @Get('/search')
  async search(@Query() query): Promise<Flight[]> {
    console.log('Running drones search with query:', query);
    return this.flightsService.search(query);
  }

  @UsePipes(ValidationPipe)
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    console.log('running flights findOne()');
    const flight = await this.flightsService.findOne(id);
    return { message: flight };
  }

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<FlightResponse> {
    console.log(`Running update flight #${id}`);
    const flight = await this.flightsService.update(id, updateFlightDto);
    return { message: `Flight #${id} updated: `, flight };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(ValidationPipe)
  async remove(@Param('id') id: number) {
    console.log(`Running remove flight #${id}`);
    await this.flightsService.remove(id);
    return {
      message: `Flight #${id} deleted`,
    };
  }
}
