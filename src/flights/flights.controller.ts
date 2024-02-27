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
} from '@nestjs/common';
import { CreateFlightDto, UpdateFlightDto } from './dto';
import { FlightsService } from './flights.service';
import { Flight } from './interfaces/flight.interface';

@Controller('flights')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  //@Get()
  //findAll(@Query() query: ListAllEntities) {
  //  return `This action returns all flights (limit: ${query.limit} items)`;
  //}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createFlightDto: CreateFlightDto) {
    this.flightsService.create(createFlightDto);
  }

  @Get()
  async findAll(): Promise<Flight[]> {
    return this.flightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} flight`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return `This action updates a #${id} flight`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} flight`;
  }
}
