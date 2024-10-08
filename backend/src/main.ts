import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();//habilita CORS para aceptar solicitudes desde el frontend
  await app.listen(3000);
}
bootstrap();
