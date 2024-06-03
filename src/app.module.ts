import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimetableModule } from './timetable/timetable.module';
import { ParserModule } from './parser/parser.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env`,
        }),
        ParserModule,
        TimetableModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
