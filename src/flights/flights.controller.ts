import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ListAllEntities, CreateFlightDto, UpdateFlightDto } from './dto';

@Controller('flights')
export class FlightsController {
  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return 'This action adds a new flight';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all flights (limit: ${query.limit} items)`;
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
