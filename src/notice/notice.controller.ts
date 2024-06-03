import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SendNoticeDto } from './notice.dto';
import { ApiTags } from '@nestjs/swagger';
import { NoticeService } from './notice.service';

@ApiTags('notice')
@Controller('notice')
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) {}

    @Get(':grade/:classroom')
    async getNotice(
        @Param('grade') grade: string,
        @Param('classroom') classroom: string,
    ) {
        return await this.noticeService.getNoticeByClassroom(grade, classroom);
    }

    @Post()
    async sendNotice(@Body() sendNoticeData: SendNoticeDto) {
        if (
            sendNoticeData.password !== process.env.NOTICE_PASSWORD.toString()
        ) {
            return '비밀번호 오류입니다.';
        }

        await this.noticeService.sendNotice({
            title: sendNoticeData.title,
            content: sendNoticeData.content,
            sender: sendNoticeData.sender,
            receiver: sendNoticeData.receiver,
            createdAt: new Date(),
        });
    }
}
