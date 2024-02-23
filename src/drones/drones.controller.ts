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
import { ListAllEntities, CreateDroneDto, UpdateDroneDto } from './dto';

@Controller('drones')
export class DronesController {
  @Post()
  create(@Body() createDroneDto: CreateDroneDto) {
    return 'This action adds a new drone';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all drones (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
