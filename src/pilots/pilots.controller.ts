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
import { CreatePilotDto, UpdatePilotDto } from './dto';
import { PilotsService } from './pilots.service';
import { Pilot } from './interfaces/pilot.interface';
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
@Controller('pilots')
export class PilotsController {
  constructor(private pilotsService: PilotsService) {}

  @Post()
  @Roles(['admin'])
  @UsePipes(ValidationPipe)
  async create(@Body() createPilotDto: CreatePilotDto) {
    console.log('running pilots create()');
    this.pilotsService.create(createPilotDto);
  }

  @Get()
  async findAll(): Promise<Pilot[]> {
    return this.pilotsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: string) {
    console.log('running pilots findOne()');
    return `This action returns a #${id} pilot`;
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updatePilotDto: UpdatePilotDto,
  ) {
    return `This action updates a #${id} pilot`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} pilot`;
  }
}
