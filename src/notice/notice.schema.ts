import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoticeDocument = Notice & Document;

@Schema()
export class Notice {
    @Prop({ required: true })
    sender: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    receiver: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
