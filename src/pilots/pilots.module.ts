import { Module } from '@nestjs/common';
import { PilotsService } from './pilots.service';
import { PilotsController } from './pilots.controller';

@Module({
  providers: [PilotsService],
  controllers: [PilotsController],
})
export class PilotsModule {}
