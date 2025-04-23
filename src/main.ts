import * as morgan from 'morgan'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CLIENTS, description, PORT } from './app/configs/app';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const main = async () => {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Sistema de Facturación Interna - API')
  .setDescription(description)
  .setVersion('1.0.0')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  app.enableCors({
    origin : CLIENTS,
    credentials : true 
  })

  app.use(morgan('dev'));
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true
  }));

  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(PORT);
}

main();