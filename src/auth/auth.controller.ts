import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schema/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService:AuthService) {}


    // Register User
    @Post('signup')
    async signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto): Promise<User> {
        return this.authService.signUp(signUpDto);
    }


    // Login User
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<User> {
        return this.authService.login(loginDto);
    }
}
