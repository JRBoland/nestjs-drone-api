import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PilotsModule } from './pilots/pilots.module';
import { DronesModule } from './drones/drones.module';
import { FlightsModule } from './flights/flights.module';

@Module({
  imports: [UsersModule, PilotsModule, DronesModule, FlightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
