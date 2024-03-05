import { Module } from '@nestjs/common';
import { PilotsService } from './pilots.service';
import { PilotsController } from './pilots.controller';
import { Pilot } from './pilot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsModule } from 'src/flights/flights.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pilot]), FlightsModule],
  providers: [PilotsService],
  controllers: [PilotsController],
  exports: [PilotsModule, TypeOrmModule],
})
export class PilotsModule {}
