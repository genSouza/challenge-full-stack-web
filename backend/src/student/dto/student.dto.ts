import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StudentDto {
  uuid: string;

  @IsNotEmpty({ message: 'Ra cannot be empty' })
  @IsNumber()
  ra: number;

  @IsNotEmpty({ message: 'cpf cannot be empty' })
  @IsString()
  cpf: string;

  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsEmail()
  email: string;
}
