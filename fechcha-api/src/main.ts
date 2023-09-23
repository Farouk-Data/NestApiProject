//this class is entry point to create NestJS applications
import { NestFactory } from '@nestjs/core';

//root module of the application, which orchestrates the initialization and configuration of other modules in the NestJS application
import { AppModule } from './app.module';

//ValidationPipe is used for data validation and transformation
import { ValidationPipe } from '@nestjs/common';

//add swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//asynchronous function named bootstrap(), which is used to start the NestJS application
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //strip uncessary fields that aren't in the dto
    whitelist: true,
  }))

  const config = new DocumentBuilder()
  .setTitle('Elo Ranking System')
  .setDescription('Elo Ranking API')
  .setVersion('1.0')
  .addTag('ELO')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('ELO', app, document);

  await app.listen(6969);
}
bootstrap();
