import { Module } from '@nestjs/common';
import { NeisService } from './neis.service';
import { NeisController } from './neis.controller';

@Module({
    providers: [NeisService],
    controllers: [NeisController],
})
export class NeisModule {}
