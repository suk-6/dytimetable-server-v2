import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from './notice.schema';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Notice.name, schema: NoticeSchema },
        ]),
        FirebaseModule,
    ],
    providers: [NoticeService],
    controllers: [NoticeController],
})
export class NoticeModule {}
