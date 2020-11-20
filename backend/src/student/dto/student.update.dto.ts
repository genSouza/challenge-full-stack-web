import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class StudentUpdateDto {
  
  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsEmail()
  email: string;
}
