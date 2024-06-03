import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ParserService } from '../parser/parser.service';
import { isHoliday } from '@hyunbinseo/holidays-kr';
import { ClassPeriod } from '../models/timetable';

@Injectable()
export class TimetableService {
    constructor(private readonly parserService: ParserService) {
        this.parserService.init();
    }

    #schedule: NodeJS.Timeout[] = [];
    #alertDisableDay = [
        '2024-4-22', // 1학기 1차 지필고사
        '2024-4-23', // 1학기 1차 지필고사
        '2024-4-24', // 1학기 1차 지필고사
    ];

    async clearSchedule() {
        for (const fId of this.#schedule) {
            clearTimeout(fId);
        }
        this.#schedule = [];
    }

    // Monday to Friday at 8 AM
    @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_8AM)
    async _scheduleTimetable() {
        await this.clearSchedule();

        const now = new Date();
        if (isHoliday(now)) return;
        if (this.isAlertDisableDay(now)) return;

        const todayBreakTimes = await this.parserService.getTodayBreakTimes();

        for (const breakTime of todayBreakTimes) {
            const delay = breakTime.getTime() - now.getTime();
            if (delay > 0) {
                const fId = setTimeout(() => {
                    this.parserService.renewData(true).then(() => {
                        this._sendTimeTable(
                            todayBreakTimes.indexOf(breakTime) + 1,
                        );
                    });
                }, delay);
                this.#schedule.push(fId);
            }
        }
    }

    isAlertDisableDay(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const dayString = `${year}-${month}-${day}`;

        return this.#alertDisableDay.includes(dayString);
    }

    // Monday to Friday at 7 AM
    @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_7AM)
    async _sendTodaySportsAlert() {
        const studentTimetable = (await this.parserService.getTimetable())
            .student;
        const now = new Date();
        const weekday = now.getDay();

        Object.keys(studentTimetable).forEach((grade) => {
            Object.keys(studentTimetable[grade]).forEach((classroomNo) => {
                studentTimetable[grade][classroomNo][weekday].forEach(
                    (classPeriod: ClassPeriod | null) => {
                        if (!classPeriod) return;
                        if (
                            ['체육A', '체육B', '스포츠'].includes(
                                classPeriod.subject,
                            )
                        ) {
                            console.log(
                                'period',
                                `${grade}-${classroomNo}`,
                                `체육복 알림`,
                                `오늘 ${classPeriod.classTime}교시에 체육이 있습니다. 체육복을 챙겨주세요.`,
                            );
                        }
                    },
                );
            });
        });
    }

    async _sendTimeTable(classTime: number) {
        const now = new Date();
        const weekday = now.getDay();
        const timetable = await this.parserService.getTimetable();

        // Student timetable
        Object.keys(timetable.student).forEach((grade) => {
            Object.keys(timetable.student[grade]).forEach((classroomNo) => {
                const classPeriod: ClassPeriod =
                    timetable.student[grade][classroomNo][weekday][
                        classTime - 1
                    ];
                if (classPeriod) {
                    console.log(
                        'period',
                        `${classPeriod.grade}-${classPeriod.class}`,
                        `다음 시간 알림`,
                        `${classPeriod.classTime}교시 [${classPeriod.subject}] 입니다.`,
                    );
                }
            });
        });

        // Teacher timetable
        Object.keys(timetable.teacher).forEach((teacherNo) => {
            const teacher = timetable.teacher[teacherNo];
            const classPeriod: ClassPeriod = teacher[weekday][classTime - 1];
            if (classPeriod) {
                console.log(
                    'period',
                    `teacher-${teacherNo}`,
                    `다음 수업 알림`,
                    `${classPeriod.classTime}교시 [${classPeriod.grade}-${classPeriod.class} ${classPeriod.subject}] 입니다.`,
                );
            }
        });
    }
}
