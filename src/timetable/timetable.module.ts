import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';

@Module({
    providers: [TimetableService],
})
export class TimetableModule {}
