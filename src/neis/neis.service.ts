import { Injectable } from '@nestjs/common';
import { NeisMealModel } from 'src/models/neis';
import { FirebaseService } from '../firebase/firebase.service';
import { Cron } from '@nestjs/schedule';
import { ClassroomNo, Grade } from '../models/timetable';

@Injectable()
export class NeisService {
    constructor(private readonly firebase: FirebaseService) {}

    // Monday to Friday at 12:50 PM
    @Cron('50 12 * * 1-5')
    async _sendTodayDiet() {
        const today = new Date();
        const diet = await this.getDiet(today);
        const mealData = diet[2]
            .split('\n\n')[0]
            .split(',')
            .map((item) => {
                item = item.trim();
                const nutritionStartIndex = item.indexOf('(');
                item = item.slice(0, nutritionStartIndex);
                item = item.trim();
                return item;
            })
            .join(', ');
        const kcal = diet[2].split('\n\n')[1];
        const body = `${mealData}\n${kcal}`;

        if (diet[0]) {
            Object.keys(Grade).forEach((grade) => {
                Object.keys(ClassroomNo).forEach((classroom) => {
                    this.firebase.sendNotificationByTopic(
                        `meal`,
                        `${Grade[grade]}-${ClassroomNo[classroom]}`,
                        diet[1],
                        body,
                        {
                            title: diet[1],
                            body: body,
                            type: 'meal',
                            click_action: 'meal',
                        },
                    );
                });
            });
        }
    }

    async getDietInfo(dayString: string) {
        const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.NEIS_API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531328&MLSV_YMD=${dayString}`;
        const response = await fetch(url, { cache: 'force-cache' });

        return (await response.json()) satisfies NeisMealModel;
    }

    async getDiet(date: Date): Promise<[boolean, string, string?]> {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dayString = `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`;

        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[date.getDay()];

        try {
            const dietInfo = (await this.getDietInfo(dayString))
                .mealServiceDietInfo[1].row[0];

            const diet: string = dietInfo.DDISH_NM.split('<br/>').map(
                (item: string) => item.trim(),
            );
            const kcal: string = dietInfo.CAL_INFO;

            const result = [
                true,
                `${month}월 ${day}일 (${dayOfWeek}) 급식`,
                `${diet}\n\n${kcal}`,
            ];

            return result as [boolean, string, string];
        } catch (error) {
            return [false, `${month}월 ${day}일 (${dayOfWeek}) 급식`];
        }
    }
}
