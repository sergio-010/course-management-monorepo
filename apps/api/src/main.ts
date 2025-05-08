import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const PORT = configService.get('PORT') || 3000;

  app.enableCors({
    origin: ['http://localhost:5173'], // el frontend de Vite
    credentials: true, // si usas cookies, autoriza también
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(PORT);
  logger.log(`App running on port ${PORT}`);
}
bootstrap();
