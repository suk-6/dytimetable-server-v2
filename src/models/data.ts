export interface RawDataModel {
    교사수: number;
    자료446: string[];
    학급수: number[];
    요일별시수: number[][];
    자료492: (number | string)[];
    자료481: (((number[] | number)[] | number)[] | number)[];
    전일제: number[];
    버젼: string;
    동시수업수: number;
    담임: number[][];
    가상학급수: number[];
    특별실수: number;
    열람제한일: string;
    자료244: string;
    학기시작일자: string;
    학교명: string;
    지역명: string;
    학년도: number;
    분리: number;
    강의실: number;
    시작일: string;
    일과시간: string[];
    일자자료: (number | string)[][];
    오늘r: number;
    자료147: (((number[] | number)[] | number)[] | number)[];
    자료542: ((number[] | number)[] | number)[];
    자료245: (
        | (
              | (number[] | number)[]
              | ((number | string)[] | number[] | number)[]
              | ((number | string)[] | number)[]
              | number
          )[]
        | (
              | (number[] | number)[]
              | ((number | string)[] | number[] | number)[]
              | number
          )[]
        | number
    )[];
    동시그룹: number[][];
}

export interface DataModel {
    schoolName: RawDataModel['학교명'];
    regionName: RawDataModel['지역명'];
    schoolYear: RawDataModel['학년도'];
    semesterStartDate: RawDataModel['학기시작일자'];
    timetableStartDate: RawDataModel['시작일'];
    timetableEndDate: RawDataModel['열람제한일'];
    teacherCount: RawDataModel['교사수'];
    classCount: RawDataModel['학급수'];
    virtualClassCount: RawDataModel['가상학급수'];
    specialRoomCount: RawDataModel['특별실수'];
    simultaneousClassCount: RawDataModel['동시수업수'];
    simultaneousGroup: RawDataModel['동시그룹'];
    yesterday: RawDataModel['전일제'];
    version: RawDataModel['버젼'];
    restrictedDate: RawDataModel['열람제한일'];
    separator: RawDataModel['분리'];
    isLectureRoom: RawDataModel['강의실'];
    isTodayR: RawDataModel['오늘r'];
    homeroomTeacher: RawDataModel['담임'];
    classTimes: RawDataModel['일과시간'];
    dayData: RawDataModel['일자자료'];
    serverTime: RawDataModel['자료244'];
    classroom: RawDataModel['자료245'];
    teachers: RawDataModel['자료446'];
    originalTimeTable: RawDataModel['자료481'];
    subjects: RawDataModel['자료492'];
    nowTimeTable: RawDataModel['자료147'];
    teacherTimeTable: RawDataModel['자료542'];
    weekdayTime: RawDataModel['요일별시수'];
}
