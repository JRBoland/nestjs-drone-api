import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { Pilot } from 'src/pilots/pilot.entity';
import { Drone } from 'src/drones/drone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flight, Pilot, Drone])],
  providers: [FlightsService],
  controllers: [FlightsController],
  exports: [FlightsService, TypeOrmModule],
})
export class FlightsModule {}
