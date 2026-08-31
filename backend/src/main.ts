import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  configureApp(app);
  await app.listen(3000);
  console.log('Backend listening on port 3000');
}
bootstrap();
