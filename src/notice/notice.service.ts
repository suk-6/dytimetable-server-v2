import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notice, NoticeDocument } from './notice.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class NoticeService {
    constructor(
        @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
    ) {}

    #timeFormat(started: Date) {
        const today = new Date();
        const relativeFormatter = new Intl.RelativeTimeFormat('ko', {
            numeric: 'always',
        });
        const daysPassed = Math.ceil(
            (started.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        );
        return relativeFormatter.format(daysPassed, 'day');
    }

    async transformNoticeData(notice: NoticeDocument) {
        return {
            _id: notice._id,
            title: notice.title,
            content: notice.content,
            createdAt: this.#timeFormat(notice.createdAt),
        };
    }

    async findNoticeWithFilter(filter: FilterQuery<NoticeDocument>) {
        const notices = await this.noticeModel
            .find(filter)
            .sort({ createdAt: -1 });

        return notices.map((notice) => this.transformNoticeData(notice));
    }

    async getEveryoneNotice() {
        return await this.findNoticeWithFilter({ receiver: 'all' });
    }

    async getNoticeBySender(sender: string) {
        return await this.findNoticeWithFilter({ sender });
    }

    async getNoticeByReceiver(receiver: string) {
        return await this.findNoticeWithFilter({ receiver });
    }

    async getNoticeByClassroom(grade: string, classroom: string) {
        return await this.findNoticeWithFilter({
            receiver: `${grade}${classroom}`,
        });
    }

    async sendNotice(notice: Notice) {
        const newNotice = new this.noticeModel(notice);
        return newNotice.save();
    }
}
