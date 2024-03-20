import {
  Module,
  NestModule,
  MiddlewareConsumer,
  OnModuleInit,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesController } from './drones/drones.controller';
import { FlightsController } from './flights/flights.controller';
import { PilotsController } from './pilots/pilots.controller';
import { DronesService } from './drones/drones.service';
import { FlightsService } from './flights/flights.service';
import { PilotsService } from './pilots/pilots.service';
import { DronesModule } from './drones/drones.module';
import { FlightsModule } from './flights/flights.module';
import { PilotsModule } from './pilots/pilots.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Drone } from './drones/drone.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseSeederService } from './seeds/database-seeder.service';

@Module({
  imports: [
    DronesModule,
    FlightsModule,
    PilotsModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities: [User, Drone],
    }),
  ],
  controllers: [
    AppController,
    DronesController,
    FlightsController,
    PilotsController,
  ],
  providers: [
    AppService,
    DronesService,
    FlightsService,
    PilotsService,
    DatabaseSeederService,
    //UsersService,
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(DronesController, FlightsController, PilotsController);
  }

  constructor(private readonly databaseSeederService: DatabaseSeederService) {}

  async onModuleInit() {
    const timestamp = new Date().toISOString();
    // Check if we are in a development environment
    console.log(`${timestamp} Current NODE_ENV:`, process.env.NODE_ENV);
    // to seed DB
    if (process.env.SEED_DB === 'true') {
      console.log(`${timestamp} Database seeding`);
      await this.databaseSeederService.seed();
    }
  }
}
