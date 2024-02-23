import { Module } from '@nestjs/common';
import { DronesService } from './drones.service';
import { DronesController } from './drones.controller';

@Module({
  providers: [DronesService],
  controllers: [DronesController],
})
export class DronesModule {}
