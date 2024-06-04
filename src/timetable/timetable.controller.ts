import { Controller, Get, Param } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('timetable')
@Controller('timetable')
export class TimetableController {
    constructor(private readonly timetableService: TimetableService) {}

    @Get('teachers')
    async getTeachers() {
        return this.timetableService.getTeachers();
    }

    @Get(':grade/:classroom')
    async getTimetable(
        @Param('grade') grade: string,
        @Param('classroom') classroom: string,
    ) {
        return this.timetableService.getTimetable(grade, classroom);
    }
}
