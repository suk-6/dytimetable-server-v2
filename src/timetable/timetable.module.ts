import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ParserModule } from '../parser/parser.module';
import { TimetableController } from './timetable.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
    imports: [ScheduleModule.forRoot(), ParserModule, FirebaseModule],
    providers: [TimetableService],
    controllers: [TimetableController],
})
export class TimetableModule {}
