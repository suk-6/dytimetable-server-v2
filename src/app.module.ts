import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimetableModule } from './timetable/timetable.module';
import { ParserModule } from './parser/parser.module';
import { ConfigModule } from '@nestjs/config';
import { NeisModule } from './neis/neis.module';
import { NoticeModule } from './notice/notice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env`,
        }),
        MongooseModule.forRoot(
            `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/admin`,
            {
                dbName: 'dytimetable',
                user: process.env.MONGO_ID,
                pass: process.env.MONGO_PASSWORD,
            },
        ),
        ParserModule,
        TimetableModule,
        NeisModule,
        NoticeModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
