import { INestApplication } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

export function configureApp(app: INestApplication) {
  app.setGlobalPrefix('api');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
}
