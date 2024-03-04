import { Module } from '@nestjs/common';
import { DronesService } from './drones.service';
import { DronesController } from './drones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone } from './drone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drone])],
  providers: [DronesService],
  controllers: [DronesController],
  exports: [DronesService, TypeOrmModule],
})
export class DronesModule {}
