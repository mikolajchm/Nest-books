import { Controller } from '@nestjs/common';
import { RegisterDTO } from './dtos/register-user.dto';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    create(@Body() registerData: RegisterDTO) {
        this.authService.register(registerData);
    } 

}
