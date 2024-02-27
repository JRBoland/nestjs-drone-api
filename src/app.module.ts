import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { UsersModule } from './users/users.module';
//import { PilotsModule } from './pilots/pilots.module';
//import { DronesModule } from './drones/drones.module';
//import { FlightsModule } from './flights/flights.module';
import { DronesController } from './drones/drones.controller';
import { FlightsController } from './flights/flights.controller';
import { UsersController } from './users/users.controller';
import { PilotsController } from './pilots/pilots.controller';
import { DronesService } from './drones/drones.service';
import { FlightsService } from './flights/flights.service';
import { PilotsService } from './pilots/pilots.service';
import { UsersService } from './users/users.service';
import { DronesModule } from './drones/drones.module';
import { FlightsModule } from './flights/flights.module';
import { PilotsModule } from './pilots/pilots.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DronesModule, FlightsModule, PilotsModule, UsersModule],
  controllers: [
    AppController,
    DronesController,
    FlightsController,
    PilotsController,
    UsersController,
  ],
  providers: [
    AppService,
    DronesService,
    FlightsService,
    PilotsService,
    UsersService,
  ],
})
export class AppModule {}
