import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('main')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Redirect('https://github.com/suk-6/dytimetable', 301)
    index() {}

    @Get('install')
    @Render('install')
    install() {}

    @Post('checkpassword')
    async checkpassword(@Body('password') password: string) {
        if (password === process.env.NOTICE_PASSWORD.toString()) {
            return 'true';
        } else {
            return 'false';
        }
    }
}
