import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); // Make Sure You're Using It Before app.listen()
 // Make Sure You're Using It Before app.listen()
  await app.listen(process.env.PORT ?? 3000);
  const port = process.env.PORT || 3000;
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  console.log(`Server running in on port ${port}`);
}
bootstrap();
