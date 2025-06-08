import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
  readonly name: string;


   @IsNotEmpty()
    @IsEmail({}, { message: 'Please Enter correct email address' })
  readonly  email: string;


   @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
  readonly password: string;
}