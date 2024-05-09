import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Article API')
  .setDescription('Backend for a simple article api')
  .setVersion('0.1')
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);
  
  await app.listen(3000);
}
bootstrap();
