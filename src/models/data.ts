import { RawDataModel } from '~/src/models/rawData';

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
