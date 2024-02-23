import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { UsersModule } from './users/users.module';
//import { PilotsModule } from './pilots/pilots.module';
//import { DronesModule } from './drones/drones.module';
//import { FlightsModule } from './flights/flights.module';
import { DronesController } from './drones/drones.controller';
import { FlightsController } from './flights/flights.controller';

@Module({
  imports: [],
  controllers: [AppController, DronesController, FlightsController],
  providers: [AppService],
})
export class AppModule {}
