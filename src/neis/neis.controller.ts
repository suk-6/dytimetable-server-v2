import { Controller, Get } from '@nestjs/common';
import { NeisService } from './neis.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('neis')
@Controller('neis')
export class NeisController {
    constructor(private readonly neisService: NeisService) {}
    @Get('meal')
    async getMeal() {
        const data = [];

        const day = new Date();
        for (let i = 0; i < 5; i++) {
            if (day.getDay() === 6) day.setDate(day.getDate() + 1);
            if (day.getDay() === 0) day.setDate(day.getDate() + 1);
            await this.neisService.getDiet(day).then((result) => {
                data[i] = result;
            });

            day.setDate(day.getDate() + 1);
        }

        return data;
    }
}
