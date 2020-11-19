import { IsNotEmpty } from "class-validator/types/decorator/common/IsNotEmpty";

export class StudentDto {
  
  uuid: string;

  @IsNotEmpty()
  ra: number;

  @IsNotEmpty()
  cpf: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;
}
