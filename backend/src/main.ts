import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from './app.module';
import { configureApp } from './bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  configureApp(app);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cocktails API')
    .setDescription('API for browsing and creating cocktail recipes')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  const swaggerTheme = new SwaggerTheme();

  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    customCss: swaggerTheme.getBuffer(SwaggerThemeNameEnum.DARK),
  });

  await app.listen(3000);
  console.log('Backend listening on port 3000');
}
bootstrap();
