export const Grade = {
    Grade1: 1,
    Grade2: 2,
    Grade3: 3,
} as const;

export type GradeT = (typeof Grade)[keyof typeof Grade];

export const ClassroomNo = {
    Classroom1: 1,
    Classroom2: 2,
    Classroom3: 3,
    Classroom4: 4,
    Classroom5: 5,
    Classroom6: 6,
    Classroom7: 7,
    Classroom8: 8,
    Classroom9: 9,
    Classroom10: 10,
} as const;

export type ClassroomNoT = (typeof ClassroomNo)[keyof typeof ClassroomNo];

export const Weekday = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
} as const;

export type WeekdayT = (typeof Weekday)[keyof typeof Weekday];

export const WeekdayString = {
    Sunday: '일',
    Monday: '월',
    Tuesday: '화',
    Wednesday: '수',
    Thursday: '목',
    Friday: '금',
    Saturday: '토',
} as const;

export type WeekdayStringT = (typeof WeekdayString)[keyof typeof WeekdayString];

export interface ClassPeriod {
    grade: GradeT;
    class: ClassroomNoT;
    weekday: WeekdayT;
    weekdayString: WeekdayStringT;
    classTime: number;
    subject: string;
    teacher: string;
}

export type weekdayTimeTable = {
    [weekday in WeekdayT]: ClassPeriod[];
};

export interface StudentTimeTableModel {
    student: {
        [grade in GradeT]: {
            [classroomNo in ClassroomNoT]: {
                [weekday in WeekdayT]: ClassPeriod[];
            };
        };
    };
}

export interface TeacherTimeTableModel {
    teacher: {
        [teacherNo: number]: weekdayTimeTable & {
            name: string;
        };
    };
}

export interface TimeTableModel {
    student: StudentTimeTableModel['student'];
    teacher: TeacherTimeTableModel['teacher'];
}
