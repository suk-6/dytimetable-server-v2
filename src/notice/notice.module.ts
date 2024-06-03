import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from './notice.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Notice.name, schema: NoticeSchema },
        ]),
    ],
    providers: [NoticeService],
    controllers: [NoticeController],
})
export class NoticeModule {}
