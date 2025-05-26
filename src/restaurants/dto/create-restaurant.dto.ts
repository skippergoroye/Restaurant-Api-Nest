import { IsEmail,  IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Category } from '../schemas/restaurant.schema';

export class createRestaurantDto {
  
  @IsNotEmpty()
  @IsString()
  readonly name: string;


  @IsNotEmpty()
  @IsString()
  readonly description: string;
 
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address' })
  readonly email: string;
 
  @IsNotEmpty()
  @IsPhoneNumber('US')
  readonly phoneNo: string;
  
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;



  @IsOptional()
  readonly images: string[];
  
}
