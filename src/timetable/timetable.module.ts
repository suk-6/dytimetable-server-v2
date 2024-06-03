import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ParserModule } from '../parser/parser.module';

@Module({
    imports: [ScheduleModule.forRoot(), ParserModule],
    providers: [TimetableService],
})
export class TimetableModule {}
