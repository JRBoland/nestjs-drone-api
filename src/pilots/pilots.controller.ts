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
import { ListAllEntities, CreatePilotDto, UpdatePilotDto } from './dto';

@Controller('pilots')
export class PilotsController {
  @Post()
  create(@Body() createPilotDto: CreatePilotDto) {
    return 'This action adds a new pilot';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all pilots (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
