import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Category } from '../schemas/restaurant.schema';

export class updateRestaurantDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;
  
  @IsEmail({}, { message: 'Please Enter correct email' })
  @IsOptional()
  readonly email: string;

  @IsPhoneNumber()
  @IsOptional()
  readonly phoneNo: string;
  
  @IsString()
  @IsOptional()
  readonly address: string;

  @IsOptional()
  @IsEnum(Category, { message: 'Please Enter correct category' })
  readonly category: Category;
}