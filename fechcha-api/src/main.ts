import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //strip uncessary fields that aren't in the dto
    whitelist: true,
  }))
  await app.listen(6969);
}
bootstrap();
