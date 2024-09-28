import { Controller } from '@nestjs/common';
import { RegisterDTO } from './dtos/register-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UseGuards, Request } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    create(@Body() registerData: RegisterDTO) {
        this.authService.register(registerData);
    } 

    @UseGuards(LocalAuthGuard)
    @Post('login')
        async login(@Request() req) {
        return req.user;
    }

}
