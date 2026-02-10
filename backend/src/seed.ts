// seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';
import { SeedModule } from './seed/seed.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const seed = app.get(SeedService);
  await seed.run();
  await app.close();
}

bootstrap();