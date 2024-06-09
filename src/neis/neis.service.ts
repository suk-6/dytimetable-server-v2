import { Injectable } from '@nestjs/common';
import { NeisMealModel } from 'src/models/neis';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class NeisService {
    constructor(private readonly firebase: FirebaseService) {}

    async getDietInfo(dayString: string) {
        const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.NEIS_API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7531328&MLSV_YMD=${dayString}`;
        const response = await fetch(url, { cache: 'force-cache' });

        return (await response.json()) satisfies NeisMealModel;
    }

    async getDiet(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dayString = `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`;

        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[date.getDay()];

        try {
            const dietInfo = (await this.getDietInfo(dayString))
                .mealServiceDietInfo[1].row[0];

            const diet = dietInfo.DDISH_NM.split('<br/>').map((item: string) =>
                item.trim(),
            );
            const kcal = dietInfo.CAL_INFO;

            const result = [
                true,
                `${month}월 ${day}일 (${dayOfWeek}) 급식`,
                `${diet}\n\n${kcal}`,
            ];

            return result;
        } catch (error) {
            return [false, `${month}월 ${day}일 (${dayOfWeek}) 급식`];
        }
    }
}
