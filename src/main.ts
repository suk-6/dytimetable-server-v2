import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.setGlobalPrefix('v2', { exclude: ['/', '/install'] });

    const config = new DocumentBuilder()
        .setTitle('Dukyoung Timetable Service API Docs')
        .setDescription(
            'The Dukyoung Timetable Service API Docs for developers.',
        )
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.setBaseViewsDir(join(__dirname, '..', 'static'));
    app.setViewEngine('hbs');

    await app.listen(3000);
}
bootstrap();
