import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DatabaseSeederService } from './database-seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const seeder = appContext.get(DatabaseSeederService);
  await seeder.seed();
  console.log('Seeding complete');
  await appContext.close();
}

bootstrap();
