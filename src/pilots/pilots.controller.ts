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
import { Pilot, PilotResponse } from './interfaces/pilot.interface';
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
  async create(@Body() createPilotDto: CreatePilotDto): Promise<PilotResponse> {
    console.log('running pilots create()');
    const pilot = await this.pilotsService.create(createPilotDto);
    return { message: 'Pilot created', pilot };
  }

  @Get()
  async findAll(): Promise<Pilot[]> {
    console.log('Running pilots findAll');
    return this.pilotsService.findAll();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(`Running pilots findOne(#${id})`);
    const pilot = await this.pilotsService.findOne(id);
    return { message: pilot };
  }

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePilotDto: UpdatePilotDto,
  ): Promise<PilotResponse> {
    console.log(`Running update pilot #${id}`);
    const pilot = await this.pilotsService.update(id, updatePilotDto);
    return { message: `Pilot #${id} updated: `, pilot };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: number) {
    console.log(`Running remove pilot #${id} and all associated flights`);
    await this.pilotsService.remove(id);
    return {
      message: `Pilot #${id} and all associated flights deleted`,
    };
  }
}
