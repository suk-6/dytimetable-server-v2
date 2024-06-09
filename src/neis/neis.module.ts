import { Module } from '@nestjs/common';
import { NeisService } from './neis.service';
import { NeisController } from './neis.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
    imports: [ScheduleModule.forRoot(), FirebaseModule],
    providers: [NeisService],
    controllers: [NeisController],
})
export class NeisModule {}
