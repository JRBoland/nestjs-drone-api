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
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller('pilots')
export class PilotsController {
  constructor(private pilotsService: PilotsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(ValidationPipe)
  async create(@Body() createPilotDto: CreatePilotDto): Promise<Pilot> {
    console.log('running pilots create()');
    return await this.pilotsService.create(createPilotDto);
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
