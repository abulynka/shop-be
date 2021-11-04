import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AppConfig} from "./app.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = app.get(AppConfig).getPort();
  console.log('Port: ', port);
  await app.listen(port);
}
bootstrap().then();
