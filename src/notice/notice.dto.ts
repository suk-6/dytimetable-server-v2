import { IsString } from 'class-validator';

export class SendNoticeDto {
    @IsString()
    sender: string;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    password: string;

    @IsString()
    receiver: string;
}
